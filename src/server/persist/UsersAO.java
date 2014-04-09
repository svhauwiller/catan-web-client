/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.persist;

/**
 *
 * @author Wesley
 */
public interface UsersAO {
	public void add(String username, String password);
	public boolean validate(String username, String password);
	public int getID(String username);
}
