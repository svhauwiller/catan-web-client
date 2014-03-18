/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.command;

/**
 *
 * @author jtsai
 */
public interface CommandTemplate {
    public void execute(String args);
    public void undo();
}
