/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist.xml;

import java.util.ArrayList;

import server.command.CommandTemplate;
import server.persist.CommandListAO;

/**
 *
 * @author Wesley
 */
public class CommandListXMLAO implements CommandListAO{

	@Override
	public void add(int gameID, CommandTemplate cmd) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	@Override
	public ArrayList<CommandTemplate> getFromIndex(int gameID, int pos) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

	
	
}
