/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.persist.db;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import server.command.CommandTemplate;
import server.persist.CommandListAO;

/**
 *
 * @author Wesley
 */
public class CommandListDAO implements CommandListAO {

    private DatabaseConnection dbconn;

    public CommandListDAO(DatabaseConnection dbconn) {
        this.dbconn = dbconn;
    }

    @Override
    public void add(int gameID, CommandTemplate cmd) {
        
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.

        PreparedStatement stmt = null;

        try {
            String sql = "INSERT INTO commandlist(gameId, command) values (?, ?)";

            stmt = dbconn.getConnection().prepareStatement(sql);


            ObjectInputStream in = new ObjectInputStream();
            in.readObject();

            stmt.setInt(1, gameID);
            stmt.setBlob(2, in, in.available());


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
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void reset(int gameID) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
