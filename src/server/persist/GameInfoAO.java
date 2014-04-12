/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist;

import server.communication.GameModel;

/**
 *
 * @author Wesley
 */
public interface GameInfoAO {
	public void add(String gameTitle, GameModel initModel);
	public int getID(String gameTitle);
	public GameModel getInit(int gameID);
	public GameModel getCurr(int gameID);
	public void update(String type, GameModel model, int gameID);
	public void reset(int gameID);
        public int getLastCommand(int gameID);
        public String getName(int gameID);
}
