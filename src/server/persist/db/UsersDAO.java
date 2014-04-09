/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.persist.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import server.persist.UsersAO;

/**
 *
 * @author Wesley
 */
public class UsersDAO implements UsersAO {

    private DatabaseConnection dbconn;

    public UsersDAO(DatabaseConnection dbconn) {
        this.dbconn = dbconn;
    }

    @Override
    public void add(String username, String password) {


        PreparedStatement stmt = null;

        try {
            String sql = "INSERT INTO users(username, password) values (?, ?)";

            stmt = dbconn.getConnection().prepareStatement(sql);

            stmt.setString(1, username);
            stmt.setString(2, password);

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

        //	throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public boolean validate(String username, String password) {

        boolean result = false;

        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            String sql = String
                    .format("SELECT * FROM users WHERE username = '%s' AND password = '%s'",
                    username, password);
            stmt = dbconn.getConnection().prepareStatement(sql);

            rs = stmt.executeQuery();
            if (rs.next()) {
                result = true;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }

                if (stmt != null) {
                    stmt.close();
                }

            } catch (SQLException ex) {
                ex.printStackTrace();
            }

        }


        return result;
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int getID(String username) {

        int result = -1;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            String sql = String
                    .format("SELECT * FROM users WHERE username = '%s'",
                    username);
            stmt = dbconn.getConnection().prepareStatement(sql);

            rs = stmt.executeQuery();
            if (rs.next()) {
                result = rs.getInt(1);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }

                if (stmt != null) {
                    stmt.close();
                }

            } catch (SQLException ex) {
                ex.printStackTrace();
            }

        }

        return result;
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
