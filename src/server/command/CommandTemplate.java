/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.command;

import server.communication.GameModel;

/**
 *
 * @author jtsai
 */
public interface CommandTemplate {
    public GameModel execute(String[] args);
    public void undo();
}
