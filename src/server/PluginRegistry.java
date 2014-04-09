/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server;

import java.util.ArrayList;

/**
 *
 * @author Wesley
 */
public class PluginRegistry {
	private static PluginRegistry instance;
	private static PluginRegistry instance(){
		if(instance == null){
			instance = new PluginRegistry();
		}
		return instance;
	}
	
	public ArrayList<Object> availablePlugins;
	
	private PluginRegistry(){
		availablePlugins = new ArrayList<>();
	}
	
	private void _registerPlugin(Object plugin){
		availablePlugins.add(plugin);
	}
	
	private ArrayList<Object> _getAvailablePlugins(){
		return availablePlugins;
	}

}
