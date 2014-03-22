/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server;

import org.junit.After;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;

/**
 *
 * @author Wesley
 */
public class SampleTests {
	private String testString;
    
    @Before
    public void setup() throws ServerException{
		testString = "Setup Complete";
    }
    
    @After
    public void teardown() throws ServerException{
		testString = null;
    }
    
    @Test
    public void validateSetupTest(){
        assertEquals(testString, "Setup Complete");
    }
}
