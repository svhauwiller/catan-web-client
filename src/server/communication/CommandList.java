/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.communication;

import java.util.ArrayList;
import server.command.CommandTemplate;

/**
 *
 * @author Wesley
 */
public class CommandList {
	private static CommandList instance;
	
	private static CommandList instance(){
		if(instance == null){
			instance = new CommandList();
		}
		return instance;
	}
	
	private ArrayList<CommandTemplate> executedCommands; 
	
	private CommandList(){
		executedCommands = new ArrayList<>();
	}
	
	private void _recordCommand(CommandTemplate command){
		executedCommands.add(command);
	}
	
	private void _undoAll(){
		for(CommandTemplate command : executedCommands){
			command.undo();
		}
		executedCommands.clear();
	}
	
	
	public static void recordCommand(CommandTemplate command) {instance()._recordCommand(command);}
	
	public static void undoAll() {instance()._undoAll();}
	
}
