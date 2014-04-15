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

        dbconn.startTransaction();
        boolean commit = true;



        System.out.println("adding a user to the database");
        PreparedStatement stmt = null;

        try {
            System.out.println("Monkey butts ar go");

            String sql = "INSERT INTO users(username, password) values (?, ?)";

            System.out.println(sql);

            stmt = dbconn.getConnection().prepareStatement(sql);


            System.out.println("Monkey butts to the limit");


            stmt.setString(1, username);
            stmt.setString(2, password);



            System.out.println("Monkey butts");


            if (stmt.executeUpdate() == 1) {
                // OK

                System.out.println("Added that sucker to the database");

            } else {
                System.out.println("FAIOL to the database");

                throw new SQLException();


            }
        } catch (SQLException ex) {
            ex.printStackTrace();
            commit = false;

        } finally {
            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException ex) {
                    ex.printStackTrace();
                    commit = false;
                }
            }
        }

        dbconn.endTransaction(commit);
    }

    @Override
    public boolean validate(String username, String password) {

        dbconn.startTransaction();


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

        dbconn.endTransaction(false);



        return result;
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public int getID(String username) {

        dbconn.startTransaction();


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
				result--;
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


        dbconn.endTransaction(false);

        return result;
        //throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}