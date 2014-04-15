/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server;

/**
 *  General Exception denoting a server-side error
 */
public class ServerException extends Exception {

    /**
     * Throw a server exception with no additional information
     */
    public ServerException() {
        return;
    }

    /**
     * Throw a server exception with a human readable message
     * 
     * @param message Human readable message explaining the error
     */
    public ServerException(String message) {
        super(message);
    }

    /**
     * Throw a server exception with a more specific exception
     * detailing the error
     * 
     * @param throwable Specific exception thrown by the code
     */
    public ServerException(Throwable throwable) {
        super(throwable);
    }

    /**
     * Throw a server exception with a human readable message
     * and a more specific exception detailing the error
     * 
     * @param message Human readable message detailing the error
     * @param throwable Specific exception detailing the error
     */
    public ServerException(String message, Throwable throwable) {
        super(message, throwable);
    }
}
