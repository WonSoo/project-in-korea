package kr.pik.utils.Types;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;

import org.bson.Document;

import com.google.gson.Gson;

import kr.pik.utils.database.Database;

public class FacebookAuth implements AuthManager{
	Database database = null;
	String accessToken = null;
	Account account = null;

	public FacebookAuth(String accessToken) {
		this.accessToken = accessToken;
		
		this.database = Database.getInstance();
	}
	
	private Document findUserByAccessToken()
	{
        try {
            InputStream input = (new URL("https://graph.facebook.com/me?access_token=" + accessToken)).openStream();
            Reader reader = new InputStreamReader(input, "UTF-8");
            account = (Account)(new Gson()).fromJson(reader, Account.class);
    		if(account == null)
    			return null;
    		Document searchQuery = new Document();
    		searchQuery.put("accountType", "facebook");
    		searchQuery.put("id", account.getId());
    		Document result = database.getCollection("users").find(searchQuery).first();
    		
    		return result;
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;
	}
	
	public Document login()
	{
		Document result = findUserByAccessToken();
		if(result != null) {
			return result;
		} else if(account != null){
			if(register()) {
				return findUserByAccessToken();
			}
		}
		return null;
	}
	
	public boolean register()
	{
		if(isUserExist() == false) {
			Document inputQuery = new Document();
			inputQuery.put("accountType", "facebook");
			inputQuery.put("id", account.getId());
			return true;
		}
		return false;
	}
	
	public boolean isUserExist()
	{
		if(findUserByAccessToken() != null)
			return true;
		return false;
	}
}
