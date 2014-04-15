/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml.model;

import server.command.CommandTemplate;
import java.util.ArrayList;

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
		System.out.println("CommandListXMLmodel - addCommand : gameID=" + gameID);
		commands.get(gameID).add(cmd);
	}
	
	public void resetList(int gameID){
		if(commands.size() >= gameID){
			commands.set(gameID, new ArrayList<CommandTemplate>());
		}
	}
	
	public int size(){
		return commands.size();
	}
	
	public ArrayList<CommandTemplate> getList(int gameID){
		return commands.get(gameID);
	}
}
