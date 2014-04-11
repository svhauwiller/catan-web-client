/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.persist.db;

import java.io.InputStream;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

import server.command.CommandTemplate;
import server.command.*;
import server.persist.CommandListAO;

/**
 *
 * @author Bill
 */
public class CommandListDAO implements CommandListAO {

    private DatabaseConnection dbconn;

    public CommandListDAO(DatabaseConnection dbconn) {
        this.dbconn = dbconn;
    }

    @Override
    public void add(int gameID, CommandTemplate cmd, String type) {
        

        PreparedStatement stmt = null;
		XStream xstream = new XStream(new DomDriver());
        try {
            String sql = "INSERT INTO commandlist(gameId, command) values (?, ?, ?)";
            stmt = dbconn.getConnection().prepareStatement(sql);

		    String stringObject = xstream.toXML(cmd);
		    byte[] byteArray = stringObject.getBytes();
		    Blob theBlob = null;
		    theBlob.setBytes(1, byteArray);

            stmt.setInt(1, gameID);
            stmt.setBlob(2, theBlob);
			stmt.setString(3, type);


            if (stmt.executeUpdate() == 1) {
                // OK
            } else {
                throw new SQLException();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                }
            }
        }

        
    }

    /**
     * gets the list of commands from the position (pos) to the end of the list
     */
    @Override
    public ArrayList<CommandTemplate> getFromIndex(int gameID, int pos) {
		Connection conn = dbconn.getConnection();
		Blob theBlob = null;
		Statement stmt = null;
		ResultSet results = null;
		ArrayList<CommandTemplate> toReturn = new ArrayList<CommandTemplate>();
		XStream xstream = new XStream(new DomDriver());
		try{
			stmt = conn.createStatement();
			results = stmt.executeQuery("SELECT * from commandlist WHERE commandid > '"+pos+"'"+ "AND gameid='"+gameID+"'");
			while(results.next()){
				theBlob = results.getBlob(3);
				InputStream blobStream = theBlob.getBinaryStream();
				toReturn.add((CommandTemplate)xstream.fromXML(blobStream));
//				toReturn.add(templateChooser(blobStream, type));				
			}
		}catch(SQLException e){e.printStackTrace();}
		finally{
			try{
				if(stmt !=null)
				{stmt.close();}
				if(results !=null)
				{results.close();}
			}
			catch(SQLException e){e.printStackTrace();}
		}
		return toReturn;
    }

    @Override
    public void reset(int gameID) {

		Connection conn = dbconn.getConnection();
		Statement stmt = null;
		try{
			stmt = conn.createStatement();
			stmt.executeUpdate("DELETE FROM gameinfo WHERE gameid='"+gameID+"'");
			
		}catch(SQLException e)
		{e.printStackTrace();}
		finally{
			try{
				if(stmt !=null)
				{stmt.close();}
			}
			catch(SQLException e){}
		}
    }
    
    
    /**
     * 
     * @param blobStream
     * @param type
     * @return
     */
    /*
    private CommandTemplate templateChooser(InputStream blobStream, String type){
    	XStream xstream = new XStream(new DomDriver());
    	switch(type){
    	case "sendChat":
    		return(UpdateChatLog)xstream.fromXML(blobStream);
    		
		case "rollNumber":
			return(RollNumber)xstream.fromXML(blobStream);		
		   
		case "robPlayer":
			return(RobPlayer)xstream.fromXML(blobStream);
			
		case "finishTurn":
			return(FinishTurn)xstream.fromXML(blobStream);
			
		case "buyDevCard":
			return(BuyDevCard)xstream.fromXML(blobStream);
			
		case "Year_of_Plenty":
			return(YearOfPlenty)xstream.fromXML(blobStream);
			
		case "Road_Building":
			return(RoadBuilding)xstream.fromXML(blobStream);
			
		case "Soldier":
			return(Soldier)xstream.fromXML(blobStream);
			
		case "Monopoly":
			return(Monopoly)xstream.fromXML(blobStream);
			
		case "Monument":
			return(Monument)xstream.fromXML(blobStream);
			
		case "buildRoad":
			return(BuildRoad)xstream.fromXML(blobStream);
			
		case "buildSettlement":
			return(BuildSettlement)xstream.fromXML(blobStream);
			
		case "buildCity":
			return(BuildCity)xstream.fromXML(blobStream);
			
		case "offerTrade":
			return(SendTradeOffer)xstream.fromXML(blobStream);
			
		case "acceptTrade":
			return(SendTradeResponse)xstream.fromXML(blobStream);
			
		case "maritimeTrade":
			return(MaritimeTrade)xstream.fromXML(blobStream);
			
		case "discardCards":
			return(DiscardCards)xstream.fromXML(blobStream);
		default:
			return null;
    		
    	}
    	
    }
    */
}