/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.persist.db;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

import server.communication.GameModel;
import server.persist.GameInfoAO;

/**
 *
 * @author Wesley
 */
public class GameInfoDAO implements GameInfoAO {

    private DatabaseConnection dbconn;

    public GameInfoDAO(DatabaseConnection dbconn) {
        this.dbconn = dbconn;
    }

    //TODO
    @Override
    public int getID(String gameTitle) {

        dbconn.startTransaction();



        Connection conn = dbconn.getConnection();
        XStream xstream = new XStream(new DomDriver());

        Statement stmt = null;
        ResultSet results = null;
        int toReturn = -1;

        try {
            stmt = conn.createStatement();
            results = stmt.executeQuery("SELECT * from gameinfo WHERE gametitle='" + gameTitle + "'");
            if ( results.next() ) {
                toReturn = results.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (results != null) {
                    results.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        dbconn.endTransaction(false);

        return toReturn;
    }

    /**
     * @param gameID
     * @return the GameModel
     */
    @Override
    public GameModel getInit(int gameID) {

        dbconn.startTransaction();


        return blobGrabber(gameID, "initial");
    }

    @Override
    public GameModel getCurr(int gameID) {

        dbconn.startTransaction();



        return blobGrabber(gameID, "current");
    }
//	@Override
//	public Blob getInit(int gameID) {
//		return blobGrabber(gameID, "initial");
//	}
//
//	@Override
//	public Blob getCurr(int gameID) {
//		return blobGrabber(gameID, "current");
//	}

    /**
     * @param type whether the initial gameModel or the current gameModel
     * @param model
     * @param gameID
     */
    @Override
    public void update(String type, GameModel model, int gameID, int lastCmdNum) {
		gameID++;

        dbconn.startTransaction();

        boolean commit = true;

        Connection conn = dbconn.getConnection();
        PreparedStatement stmt = null;
        Statement stmt2 = null;
        ResultSet results = null;
        int commandNumber = -1;
        XStream xstream = new XStream(new DomDriver());
        try {
            String stringObject = xstream.toXML(model);
            byte[] byteArray = stringObject.getBytes();
			
            stmt = conn.prepareStatement("update gameinfo SET " + type + "model=? WHERE gameid=?");
			stmt.setBytes(1, byteArray);  
			stmt.setInt(2, gameID); 
            stmt.executeUpdate();
			
			stmt2 = conn.createStatement();
			stmt2.executeUpdate("Update gameinfo SET lastcommand='" + lastCmdNum + "' WHERE gameid='" + gameID + "'");
        } catch (SQLException e) {
            e.printStackTrace();

            commit = false;
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException e) {
                commit = false;
            }
        }

        dbconn.endTransaction(commit);

    }

    /**
     * add
     *
     * @param gameTitle
     * @param initModel
     */
    @Override
    public void add(String gameTitle, GameModel initModel) {

        dbconn.startTransaction();

        boolean commit = true;


        Connection conn = dbconn.getConnection();
        PreparedStatement pstmt = null;
        XStream xstream = new XStream(new DomDriver());

        try {
//			ByteArrayOutputStream baos = new ByteArrayOutputStream();
//		    ObjectOutputStream oos = new ObjectOutputStream(baos);
//		    oos.writeObject(initModel);
//		    oos.flush();
//		    oos.close();
//		    InputStream modelAsInput = new ByteArrayInputStream(baos.toByteArray());

            String stringObject = xstream.toXML(initModel);
            byte[] byteArray = stringObject.getBytes();

            String addsql = "Insert INTO gameinfo(gametitle, initialmodel, currentmodel, lastcommand) VALUES(?,?,?,?)";
            pstmt = conn.prepareStatement(addsql);
            pstmt.setString(1, gameTitle);
            pstmt.setBytes(2, byteArray);
//			pstmt.setBinaryStream(2, modelAsInput);
            pstmt.setBytes(3, byteArray);
//			pstmt.setBinaryStream(3, modelAsInput);
            pstmt.setInt(4, 0);
			
			if (pstmt.executeUpdate() == 1) {
                System.out.println("Added that sucker to the database");
            } else {
                System.out.println("FAIOL to the database");
                throw new SQLException();
            }

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();

            commit = false;
        } finally {
            try {
                if (pstmt != null) {
                    pstmt.close();
                }
            } catch (SQLException e) {
                commit = false;
            }
        }

        dbconn.endTransaction(commit);

    }

    /**
     * @param gameID
     */
    @Override
    public void reset(int gameID) {
		gameID++;

        dbconn.startTransaction();

        boolean commit = true;


//		Blob resetBlob = getInit(gameID);
        GameModel theBlob = getInit(gameID);
        XStream xstream = new XStream(new DomDriver());
        Connection conn = dbconn.getConnection();
        Statement stmt = null;
        try {

            String stringObject = xstream.toXML(theBlob);
            byte[] byteArray = stringObject.getBytes();

            stmt = conn.createStatement();
            stmt.executeUpdate("Update gameinfo SET currentmodel='" + byteArray + "' WHERE gameid='" + gameID + "'");
            stmt.executeUpdate("Update gameinfo SET lastcommand='" + 0 + "' WHERE gameid='" + gameID + "'");

        } catch (SQLException e) {
            e.printStackTrace();
            commit = false;
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException e) {
                commit = false;
            }
        }
        dbconn.endTransaction(commit);

    }

    /**
     *
     * @param gameID
     * @param type either 'current' or 'initial' depending on the blob we want
     * @return
     */
    private GameModel blobGrabber(int gameID, String type) {
		gameID++;
		
        boolean commit = true;
        Connection conn = dbconn.getConnection();
        XStream xstream = new XStream(new DomDriver());

        byte[] theBlob = null;
        Statement stmt = null;
        ResultSet results = null;
        GameModel toReturn = null;

        try {
            stmt = conn.createStatement();
            results = stmt.executeQuery("SELECT * from gameinfo WHERE gameid='" + gameID + "'");
            if ( results.next() ) {
                if (type.equals("current")) {
					System.out.println("CURRENT!");
                    theBlob = results.getBytes("currentmodel");
                } else if (type.equals("initial")) {
                    theBlob = results.getBytes("initialmodel");
                }
                String xmlStr = new String(theBlob);
                toReturn = (GameModel) xstream.fromXML(xmlStr);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            commit = false;
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (results != null) {
                    results.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
                commit = false;
            }
        }


        dbconn.endTransaction(commit);

        return toReturn;

    }
    
    
     /**
     * @param gameID
     * @return the lastCommand
     */
    @Override
    public int getLastCommand(int gameID) {
		gameID++;

       dbconn.startTransaction();

        Connection conn = dbconn.getConnection();
        XStream xstream = new XStream(new DomDriver());

        Statement stmt = null;
        ResultSet results = null;
        int toReturn = -1;

        try {
            stmt = conn.createStatement();
            results = stmt.executeQuery("SELECT lastcommand from gameinfo WHERE gameid='" + gameID + "'");
            if ( results.next() ) {
                toReturn = results.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (results != null) {
                    results.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        dbconn.endTransaction(false);

        return toReturn;
    }
    
         /**
     * @param gameID
     * @return the GameName
     */
    @Override
    public String getName(int gameID) {
		gameID++;

       dbconn.startTransaction();

        Connection conn = dbconn.getConnection();
        XStream xstream = new XStream(new DomDriver());

        Statement stmt = null;
        ResultSet results = null;
        String toReturn = "Unfound";

        try {
            stmt = conn.createStatement();
            results = stmt.executeQuery("SELECT gametitle from gameinfo WHERE gameid='" + gameID + "'");
            if ( results.next() ) {
                toReturn = results.getString(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) {
                    stmt.close();
                }
                if (results != null) {
                    results.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        dbconn.endTransaction(false);

        return toReturn;
    }
    
}
