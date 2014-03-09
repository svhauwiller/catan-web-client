/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 *
 * @author Wesley
 */
public class BaseHandler implements HttpHandler {
	
	private String serverRoot;
	
	public BaseHandler(String serverRoot){
		this.serverRoot = serverRoot;
	}

	@Override
	public void handle(HttpExchange ex) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		File htmlDoc = new File (serverRoot + ex.getRequestURI().getPath());
		byte [] bytearray  = new byte [(int)htmlDoc.length()];
		FileInputStream fis = new FileInputStream(htmlDoc);
		BufferedInputStream bis = new BufferedInputStream(fis);
		bis.read(bytearray, 0, bytearray.length);
		
		ex.sendResponseHeaders(200, htmlDoc.length());
		responseStream.write(bytearray,0,bytearray.length);
		responseStream.close();
	}
	
}
