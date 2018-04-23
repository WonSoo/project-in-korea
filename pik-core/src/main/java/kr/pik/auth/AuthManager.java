package kr.pik.auth;

import io.vertx.ext.web.RoutingContext;

public interface AuthManager {
	public Account login();
	public boolean register();
	public boolean isUserExist();
}
