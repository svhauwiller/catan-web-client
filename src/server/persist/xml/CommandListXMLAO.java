/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml;

import java.util.ArrayList;

import server.command.CommandTemplate;
import server.persist.CommandListAO;
import server.persist.xml.model.CommandListXMLmodel;

/**
 *
 * @author Wesley
 */
public class CommandListXMLAO implements CommandListAO{
	
	private FileIO fileio;
	
	public CommandListXMLAO(){
		fileio = new FileIO();
	}

	@Override
	public void add(int gameID, CommandTemplate cmd, String type) {
		Object xmlData = fileio.loadModel(FileIO.CMD_LIST_FILENAME);
		CommandListXMLmodel cmdListModel = null;
		
		if(xmlData == null){
			cmdListModel = new CommandListXMLmodel();
		} else {
			cmdListModel = (CommandListXMLmodel) xmlData;
		}
		
		while(cmdListModel.size() <= gameID){
			cmdListModel.addNewList(new ArrayList<CommandTemplate>());
		}
		
		cmdListModel.addCommand(gameID, cmd);
		
		fileio.saveModel(FileIO.CMD_LIST_FILENAME, cmdListModel);
	}

	@Override
	public ArrayList<CommandTemplate> getFromIndex(int gameID, int pos) {
		Object xmlData = fileio.loadModel(FileIO.CMD_LIST_FILENAME);
		
		if(xmlData == null){
			return null;
		}
		
		CommandListXMLmodel cmdListModel = (CommandListXMLmodel) xmlData;
		
		if(cmdListModel.size() < gameID){
			return null;
		}
		
		ArrayList<CommandTemplate> cmdList = cmdListModel.getList(gameID);
		
		return (ArrayList<CommandTemplate>) cmdList.subList(pos, cmdList.size());
	}

	@Override
	public void reset(int gameID) {
		Object xmlData = fileio.loadModel(FileIO.CMD_LIST_FILENAME);
		
		if(xmlData == null){
			return;
		}
		CommandListXMLmodel cmdListModel = (CommandListXMLmodel) xmlData;
		
		cmdListModel.resetList(gameID);
		
		fileio.saveModel(FileIO.CMD_LIST_FILENAME, cmdListModel);
	}

	
	
}
