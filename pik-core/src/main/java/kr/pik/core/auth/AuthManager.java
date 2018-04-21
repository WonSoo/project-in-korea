package kr.pik.core.auth;

public interface AuthManager {
	public Account login();
	public boolean register();
	public boolean isUserExist();
}
