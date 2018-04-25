package kr.pik.auth;

import kr.pik.content.Status;

public interface AuthManager {
	public Account login();
	public Status register();
	public boolean isUserExist();
}
