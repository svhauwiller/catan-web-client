/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml.model;

import java.util.ArrayList;
import server.command.CommandTemplate;

/**
 *
 * @author Wesley
 */
public class CommandListXMLmodel {
	ArrayList< ArrayList<CommandTemplate> > commands;
	
	public CommandListXMLmodel() {
		commands = new ArrayList<>();
	}
	
	public void addNewList(ArrayList<CommandTemplate> newList){
		commands.add(newList);
	}
	
	public void addCommand(int gameID, CommandTemplate cmd){
		commands.get(gameID).add(cmd);
	}
	
	public int size(){
		return commands.size();
	}
	
	public ArrayList<CommandTemplate> getList(int gameID){
		return commands.get(gameID);
	}
}
