package kr.pik.auth;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;

import org.bson.Document;

import com.google.gson.Gson;

import kr.pik.content.Status;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.SQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.utils.database.Database;

public class FacebookAuth implements AuthManager{
	SQLDialect authDialect = FactorySQLDialect.createSQLDialect(Dialect.Auth);
	String accessToken = null;
	Account account = null;

	public FacebookAuth(String accessToken) {
		this.accessToken = accessToken;
	}
	
	private Account findUserByAccessToken()
	{
        try {
            InputStream input = (new URL("https://graph.facebook.com/me?access_token=" + accessToken)).openStream();
            Reader reader = new InputStreamReader(input, "UTF-8");
            account = (Account)(new Gson()).fromJson(reader, Account.class);
    		if(account == null)
    			return null;
    		
    		account.setAccountType(AccountType.Facebook);
//    		Document result = database.getCollection("users").find(searchQuery).first();
    		return account;
        } catch (IOException e) {
            e.printStackTrace();
        }
		return null;
	}
	
	public Account login()
	{
		Account account = findUserByAccessToken();
		if(account == null) {
			if(register() == Status.REGISTER_SUCCESS) {
				account = findUserByAccessToken();
				if(account != null) {
					account.setStatus(Status.LOGIN_SUCCESS);
				} else {
					account = new Account(Status.LOGIN_FAIL_UNKNOWN_USER);
				}
				
				return account;
			}
		}
		account.setStatus(Status.LOGIN_SUCCESS);
		return account;
	}
	
	public Status register()
	{
		if(isUserExist() == false) {
			Document inputQuery = new Document();
			inputQuery.put("accountType", "facebook");
			inputQuery.put("id", account.getId());
			return Status.REGISTER_FAIL_EXIST_USER;
		}
		return Status.REGISTER_SUCCESS;
	}
	
	public boolean isUserExist()
	{
		if(findUserByAccessToken() != null)
			return true;
		return false;
	}
}
