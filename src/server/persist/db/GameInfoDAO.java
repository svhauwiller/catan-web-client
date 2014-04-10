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

import server.api.player.Player;
import server.communication.GameModel;
import server.communication.GameModelList;
import server.persist.GameInfoAO;

/**
 *
 * @author Wesley
 */
public class GameInfoDAO implements GameInfoAO {
	private DatabaseConnection dbconn ;

	GameInfoDAO(DatabaseConnection dbconn) {
		this.dbconn = dbconn;
	}
	
	//TODO
	@Override
	public int getID(String gameTitle) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	/**
	 * @param gameID
	 * @return the GameModel
	 */
	@Override
	public GameModel getInit(int gameID) {
		return blobGrabber(gameID, "initial");
	}

	/**
	 * @param gameID
	 * @return the GameModel
	 */
	@Override
	public GameModel getCurr(int gameID) {
		return blobGrabber(gameID, "current");
	}

	/**
	 * @param type whether the initial gameModel or the current gameModel
	 * @param model
	 * @param gameID
	 */
	@Override
	public void update(String type, GameModel model, int gameID, int commandNumber) {
		Connection conn = dbconn.getConnection();
		Statement stmt = null;
		XStream xstream = new XStream(new DomDriver());
		try
		{
		    String stringObject = xstream.toXML(model);
		    byte[] byteArray = stringObject.getBytes();
		    Blob theBlob = null;
		    theBlob.setBytes(1, byteArray);
			
			stmt = conn.createStatement();
			{stmt.executeUpdate("Update gameinfo SET"+type+"='"+theBlob+"' WHERE gameid='"+gameID+"'");
			stmt.executeUpdate("Update gameinfo SET lastcommand='"+theBlob+"' WHERE gameid='"+gameID+"'");
			}
		}catch(SQLException e)
		{e.printStackTrace();}
		finally
		{
			try
			{
				if(stmt !=null)
				{stmt.close();}
			}
			catch(SQLException e){}
		}	
	}

	
	/**add
	 * 
	 * @param gameTitle
	 * @param initModel
	 */
	@Override
	public void add(String gameTitle, GameModel initModel) {
		Connection conn = dbconn.getConnection();
		PreparedStatement pstmt = null;
		XStream xstream = new XStream(new DomDriver());

		try
		{
//			ByteArrayOutputStream baos = new ByteArrayOutputStream();
//		    ObjectOutputStream oos = new ObjectOutputStream(baos);
//		    oos.writeObject(initModel);
//		    oos.flush();
//		    oos.close();
//		    InputStream modelAsInput = new ByteArrayInputStream(baos.toByteArray());
		    
		    String stringObject = xstream.toXML(initModel);
		    byte[] byteArray = stringObject.getBytes();
		    Blob theBlob = null;
		    theBlob.setBytes(1, byteArray);
		    
			String addsql = "Insert INTO gameinfo VALUES(?,?,?,?)";
			pstmt = conn.prepareStatement(addsql);
			pstmt.setString(1, gameTitle);
			pstmt.setBlob(2, theBlob); 
//			pstmt.setBinaryStream(2, modelAsInput);
			pstmt.setBlob(3, theBlob); 
//			pstmt.setBinaryStream(3, modelAsInput);
			pstmt.setInt(4, 0);
			
		}catch(Exception e){
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally
		{
			try
			{
				if(pstmt !=null)
				{pstmt.close();}
			}
			catch(SQLException e){}
		}
	}

	/**
	 * @param gameID
	 */
	@Override
	public void reset(int gameID) {
		GameModel resetBlob = getInit(gameID);
		GameModelList.set(gameID, resetBlob);
	}
	
	/**
	 * 
	 * @param gameID
	 * @param type either 'current' or 'initial' depending on the blob we want
	 * @return
	 */
	private GameModel blobGrabber(int gameID, String type) {
		Connection conn = dbconn.getConnection();
		XStream xstream = new XStream(new DomDriver());

		Blob theBlob = null;
		Statement stmt = null;
		ResultSet results = null;
		GameModel toReturn = null;

		try
		{
			stmt = conn.createStatement();
			results = stmt.executeQuery("SELECT * from gameinfo WHERE gameid='"+gameID+"'");
			if(results!=null)
			{
				if(type.equals("current")){
					theBlob=results.getBlob(4);
				}
				else if(type.equals("initial")){
					theBlob=results.getBlob(3);
				}
				InputStream blobStream = theBlob.getBinaryStream();
				toReturn = (GameModel)xstream.fromXML(blobStream);
				
			}
		}catch(SQLException e){e.printStackTrace();}
		finally
		{
			try
			{
				if(stmt !=null)
				{stmt.close();}
				if(results !=null)
				{results.close();}
			}
			catch(SQLException e){e.printStackTrace();}
		}
		return toReturn;
		
	}
	
}
