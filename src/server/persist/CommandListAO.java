/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist;

import server.command.CommandTemplate;

/**
 *
 * @author Wesley
 */
public interface CommandListAO {
	public void add(int gameID, CommandTemplate cmd);
	public CommandTemplate getFromIndex(int gameID, int pos);
}
