/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package server.handler;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;
import com.thoughtworks.xstream.io.json.JsonHierarchicalStreamDriver;
import com.thoughtworks.xstream.io.json.JsonWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.Charset;

/**
 *
 * @author Wesley
 */
public class UtilitiesHandler implements HttpHandler{

    @Override
    public void handle(HttpExchange ex) throws IOException {
        XStream xStream = new XStream(new JsonHierarchicalStreamDriver() {
			@Override
			public HierarchicalStreamWriter createWriter(Writer writer) {
				return new JsonWriter(writer, JsonWriter.DROP_ROOT_MODE);
			}
		});
		
		String methodName = ex.getRequestURI().getPath().substring(6);
		switch(methodName){
			case "changeLogLevel":
				changeLogLevel(ex, xStream);
				break;
			default:
				throw new UnsupportedOperationException("\"" + methodName + "\" is not supported in this context.");
		}
    }

	private void changeLogLevel(HttpExchange ex, XStream xStream) throws IOException {
		OutputStream responseStream = ex.getResponseBody();
		String response = "Success";
		byte[] responseData = response.getBytes(Charset.forName("utf-8"));
		ex.sendResponseHeaders(200, response.length());
		responseStream.write(responseData);
		responseStream.close();
	}
    
}
