package kr.pik.auth;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;

import org.bson.Document;
import org.bson.conversions.Bson;

import com.google.gson.Gson;

import io.vertx.ext.web.Cookie;
import io.vertx.ext.web.Session;
import kr.pik.utils.database.Database;

public class PIKAuth implements AuthManager {
	Database database;

	String name;
	String email;
	String password;
	String repassword;

	public PIKAuth(String name, String email, String password, String repassword) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.repassword = repassword;

		this.database = Database.getInstance();
	}

	private Document findUserByEmail() {
		Document searchQuery = new Document();
		searchQuery.put("accountType", "pik");
		searchQuery.put("email", email);
		Document result = database.getCollection("users").find(searchQuery).first();

		return result;
	}

	public Account login() {
		Document result = findUserByEmail();
		if (result.get("password").equals(password)) {
			Account account = new Account(AccountType.PIK, result.getString("name"), null, result.getString("email"));
			return account;
		}
		return null;
	}

	public boolean register() {	
		Document result = findUserByEmail();
		if(result != null) {
			return false;
		}
		
		Document inputQuery = new Document();
		inputQuery.put("accountType", "pik");
		inputQuery.put("name", name);
		inputQuery.put("email", email);
		inputQuery.put("password", password);
		database.getCollection("users").insertOne(inputQuery);

		return true;
	}

	public boolean isUserExist() {
		if (findUserByEmail() != null)
			return true;

		return false;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public String getRepassword() {
		return repassword;
	}
	
	
}
