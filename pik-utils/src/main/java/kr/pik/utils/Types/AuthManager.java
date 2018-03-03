package kr.pik.utils.Types;

import org.bson.Document;

public interface AuthManager {
	public Document login();
	public boolean register();
	public boolean isUserExist();
}
