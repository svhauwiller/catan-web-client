/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.models;

import server.command.CommandTemplate;
import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class CommandListPM {
	private ArrayList<CommandTemplate> executedCommands;
	private int gameID;
	
	public CommandListPM(ArrayList<CommandTemplate> cmds, int gameID){
		this.executedCommands = cmds;
		this.gameID = gameID;
	}
}
