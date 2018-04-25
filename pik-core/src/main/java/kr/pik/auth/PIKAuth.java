package kr.pik.auth;

import org.bson.Document;
import kr.pik.content.Status;
import kr.pik.utils.database.Database;

public class PIKAuth implements AuthManager {
	Database database;

	String name;
	String email;
	String password;
	String repassword;
	
	public PIKAuth(String email, String password) {
		this.email = email;
		this.password = password;

		this.database = Database.getInstance();
	}

	public PIKAuth(String email, String password, String repassword, String name) {
		this.email = email;
		this.password = password;
		this.repassword = repassword;
		this.name = name;

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
		
		Account account = null;
		if (result.get("password").equals(password)) {
			account = new Account(AccountType.PIK, result.getString("name"), result.getString("email"));
			return account;
		} else {
			account = new Account(Status.LOGIN_FAIL_INVALID_PASSWORD);
		}
		return null;
	}

	public Status register() {	
		Document result = findUserByEmail();
		if(result != null) {
			return Status.REGISTER_FAIL_EXIST_USER;
		}
		
		if(!password.equals(repassword)) {
			return Status.REGISTER_FAIL_INVALID_REPASSWORD;
		}
		Document inputQuery = new Document();
		inputQuery.put("accountType", "pik");
		inputQuery.put("name", name);
		inputQuery.put("email", email);
		inputQuery.put("password", password);
		database.getCollection("users").insertOne(inputQuery);

		return Status.REGISTER_SUCCESS;
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
