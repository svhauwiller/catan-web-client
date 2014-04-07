/**
 * 
 */
package server.persist.db;

import server.command.*;
import java.io.*;
import java.sql.*;

/**
 * @author zapdash
 * 
 *         This reads in the Data from the XML file to create the Database
 */
public class DatabaseRefresher {

	private static String parent;

	public static void main(String args[]) {
		String fileName = args[0];

		boolean finished = true;

		DatabaseConnection dbconn = new DatabaseConnection();

		try {
			DatabaseConnection.initialize();

			dbconn.startTransaction();

			dropTables(fileName, dbconn);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			System.out.println("Failed to Refresh");
			finished = false;
		}

		dbconn.endTransaction(finished);
	}

	private static void dropTables(String fileName, DatabaseConnection dbconn)
			throws Exception {

		Statement stmt = dbconn.getConnection().createStatement();

		stmt.execute("drop table if exists users;");
		stmt.execute("drop table if exists commandlist;");
		stmt.execute("drop table if exists gameanduserjoin;");
		stmt.execute("drop table if exists gameinfo;");

		stmt.execute("create table users( "
				+ "playerid integer not null primary key autoincrement, "
				+ "username text not null, " 
				+ "password text not null);");
		stmt.execute("create table commandlist( "
				+ "commandid integer not null primary key autoincrement, "
				+ "gameid text not null, "
				+ "command blob);");
		stmt.execute("create table gameanduserjoin( "
				+ "playerid integer not null, "
				+ "gameid interger not null, "
				+ "playercolor text );");
		stmt.execute("create table gameinfo( "
				+ "gameid integer not null primary key autoincrement, "
				+ "gametitle test not null, "
				+ "intialmodel blob, "
				+ "currentmodel integer not null, "
				+ "lastcommand integer);");

		stmt.close();

	}
}