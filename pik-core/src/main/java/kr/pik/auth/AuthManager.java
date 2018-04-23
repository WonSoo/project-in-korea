package kr.pik.auth;

public interface AuthManager {
	public Account login();
	public boolean register();
	public boolean isUserExist();
}
