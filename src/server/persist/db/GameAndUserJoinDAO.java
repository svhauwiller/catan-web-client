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
import java.sql.Statement;

import server.api.player.Player;
import server.persist.GameAndUserJoinAO;

/**
 *
 * @author Bill
 */
public class GameAndUserJoinDAO implements GameAndUserJoinAO {

    private DatabaseConnection dbconn;

    public GameAndUserJoinDAO(DatabaseConnection dbconn) {
        this.dbconn = dbconn;
    }

    /**
     * getColor
     *
     * @param playerID
     * @param GameID
     * @return the player's color
     */
    @Override
    public Player.PlayerColor getColor(int playerID, int GameID) {

        dbconn.startTransaction();
        boolean commit = true;

        Connection conn = dbconn.getConnection();
        Statement stmt = null;
        ResultSet results = null;
        String color = null;
        try {
            stmt = conn.createStatement();
            results = stmt.executeQuery("SELECT * from gameanduserjoin WHERE playerid='" + playerID + "'" + "AND gameid='" + GameID + "'");
            if (results != null) {
                color = results.getString(3);
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

        dbconn.endTransaction(false);

        return Player.PlayerColor.valueOf(color);
    }

    /**
     * update
     *
     * @param playerID
     * @param GameID
     * @param color
     */
    @Override
    public void update(int playerID, int gameID, Player.PlayerColor color) {

        dbconn.startTransaction();
        boolean commit = true;


        Connection conn = dbconn.getConnection();
        Statement stmt = null;
        try {
            stmt = conn.createStatement();
            {
                stmt.executeUpdate("Update gameanduserjoin SET playercolor='" + color.toString() + "' WHERE playerid='" + playerID + "'"
                        + "AND gameid='" + gameID + "'");
            }
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
     * @param playerID
     * @param GameID
     * @param color
     */
    @Override
    public void add(int playerID, int gameID, Player.PlayerColor color) {

        dbconn.startTransaction();
        boolean commit = true;

        Connection conn = dbconn.getConnection();
        PreparedStatement pstmt = null;

        try {
            String addsql = "Insert INTO gameanduserjoin VALUES(?,?,?)";
            pstmt = conn.prepareStatement(addsql);
            pstmt.setInt(1, playerID);
            pstmt.setInt(2, gameID);
            pstmt.setString(3, color.toString());

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (pstmt != null) {
                    pstmt.close();
                }
            } catch (SQLException e) {
            }
        }

        dbconn.endTransaction(commit);

    }
}
