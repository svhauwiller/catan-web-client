/**
 * 
 */
package server.persist.db;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import server.ServerException;

/**
 * @author zapdash
 * 
 */
public class DatabaseConnection {
	private Connection connection;

	/**
	 * Starts the Database's processes to connect to the SQL database
	 * 
	 * @throws ServerException
	 */
	public static void initialize() throws ServerException {

		// TODO: Load the SQLite database driver

		try {
			final String driver = "org.sqlite.JDBC";
			Class.forName(driver);
		} catch (ClassNotFoundException e) {
			// ERROR! Could not load database driver
		}
	}


	public DatabaseConnection() {

		connection = null;
	}

	public Connection getConnection() {
            
            if (connection == null){
              System.out.println("the connection is null - was a transaction started?");

            }else
            {
             System.out.println("connection is go mofo");

            }
		return connection;
	}

	/**
	 * @param user_name
	 * @param password
	 * @return The User object containing null or a valid user
	 */

//	public User Verify(String username, String password) {
//
//		User userVerify = new User(username, password);
//
//		User userOut = null;
//		try {
//			userOut = userAccess.GetUser(userVerify);
//		} catch (SQLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//
//		return userOut;
//	}

	/**
	 * creates a new connection to the SQL database
	 * 
	 * @throws ServerException
	 */
	public void startTransaction() {
            
                System.out.println("Is this getting called? yes apparantly");


		// TODO: Open a connection to the database and start a transaction

		String dbName = "catan.sqlite";
		String connectionURL = "jdbc:sqlite:" + dbName;
                
                System.out.println("  Connected to database at " + connectionURL);

		connection = null;

		try {
			// Open a database connection
			connection = DriverManager.getConnection(connectionURL);

			// Start a transaction
			connection.setAutoCommit(false);
		} catch (SQLException e) {
			// ERROR
		}

	}

	/**
	 * Decides whether or not to keep the changes after the database class has
	 * accessed the SQL database
	 * 
	 * @param commit
	 */
	public void endTransaction(boolean commit) {

		// TODO: Commit or rollback the transaction and close the connection

		try {
			if (commit) { // ALL DATABASE OPERATIONS SUCCEEDED
				connection.commit();
			} else {
				connection.rollback();
			}
		} catch (SQLException e) {
			// ERROR
		} finally {
			try { // whats up with this try catch, it made me add it - MITCH
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		connection = null;

	}

}