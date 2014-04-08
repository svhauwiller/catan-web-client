/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package server.persist.xml;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;
import java.io.*;
import javax.swing.*;

/**
 *
 * @author Hauwiller
 */
public class FileIO {
    
    /**
     * Directory where user state files are stored on the server
     */
    public static final String XML_DIR = "data" + File.separator + "xml" + File.separator;
    public static final String USERS_FILENAME = "users.xml";
    public static final String GAME_INFO_FILENAME = "game-info.xml";
    public static final String GAME_USER_FILENAME = "game-user.xml";
	public static final String CMD_LIST_FILENAME = "cmd-list.xml";
	
	private XStream xStream;
	
    
    /**
     * Manager for loading and saving the user state
     */
    public FileIO(){
        xStream = new XStream(new DomDriver());
    }
    
    public void saveModel(String fileName, Object model){
		File destDir = new File(XML_DIR);
		makeDirs(destDir);
		
        File destFile = new File(XML_DIR + fileName);
        makeFile(destFile);
        
        writeToFile(destFile, model);
    }
	
	private void makeDirs(File destDir){
		if(!destDir.exists()){
            destDir.mkdirs();
        }
	}
    
	private void makeFile(File destFile){
		if(!destFile.exists()){
            try {
                destFile.createNewFile();
            } catch (IOException ex) {
                String errorMsg = "Unable to persist game data: " + ex.getMessage();
				System.out.println(errorMsg);
            }
        }
	}
	
	private void writeToFile(File destFile, Object model){
		BufferedOutputStream destFileStrm = null;
        try {
            destFileStrm = new BufferedOutputStream(new FileOutputStream(destFile));
            xStream.toXML(model, destFileStrm);
            destFileStrm.flush();
        }
        catch (IOException ex) {
            String errorMsg = "Unable to persist game data: " + ex.getMessage();
			System.out.println(errorMsg);
        }
	}
    
    public Object loadModel(String filename){
		
        File importedFile = new File(XML_DIR + filename);
        InputStream importedFileStrm = null;
        if(importedFile.exists()){
            try {
                importedFileStrm = new FileInputStream(importedFile);
            }
            catch (IOException ex) {
                String errorMsg = "Unable to load game data: " + ex.getMessage();
				System.out.println(errorMsg);
            }

            if (importedFileStrm != null) {
                String fileContents = null;
                try{
                    InputStreamReader fileReader = new InputStreamReader(importedFileStrm, "utf-8");
                    BufferedReader bufferedFileReader = new BufferedReader(fileReader);

                    int bytes;
                    StringBuilder fileData = new StringBuilder(1024);
                    while ((bytes = bufferedFileReader.read()) != -1) {
                        fileData.append((char) bytes);
                    }

                    fileContents = fileData.toString();
                    bufferedFileReader.close();
                    fileReader.close();
                } catch(Exception ex){
                    String errorMsg = "Unable to load game data: " + ex.getMessage();
					System.out.println(errorMsg);
                }

                if(fileContents != null){
                    return xStream.fromXML(fileContents);
                } else {
                    return null;
                }

            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
