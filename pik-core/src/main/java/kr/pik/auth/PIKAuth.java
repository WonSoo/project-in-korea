package kr.pik.auth;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.google.protobuf.ByteString;

import kr.pik.content.Status;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;
import kr.pik.utils.database.Database;

public class PIKAuth implements AuthManager {
	SQLDialect authDialect = FactorySQLDialect.createSQLDialect(Dialect.Auth);
	String name;
	String email;
	String password;
	
	public PIKAuth(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public PIKAuth(String email, String password, String name) {
		this.email = email;
		this.password = password;
		this.name = name;
	}

	private Document findUserByEmail() {
		Document searchQuery = new Document();
		searchQuery.put("accountType", "pik");
		searchQuery.put("email", email);
		Document result = authDialect.findOne(searchQuery);

		return result;
	}
	
	public ByteString toByteString(ObjectId id) {
		return ByteString.copyFrom(id.toByteArray());
	}

	public Account login() {
		Document result = findUserByEmail();
		
		Account account = null;
		if (result != null && result.get("password").equals(password)) {
			account = new Account(Status.LOGIN_SUCCESS, result.getString("id"), AccountType.PIK, result.getString("name"), result.getString("email"));
			return account;
		} else {
			account = new Account(Status.LOGIN_FAIL_INVALID_PASSWORD);
		}
		return account;
	}

	public Status register() {	
		Document result = findUserByEmail();
		if(result != null) {
			return Status.REGISTER_FAIL_EXIST_USER;
		}
		
		Document inputQuery = new Document();
		inputQuery.put("accountType", "pik");
		inputQuery.put("name", name);
		inputQuery.put("email", email);
		inputQuery.put("password", password);
		authDialect.insert(inputQuery);

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

	
}
