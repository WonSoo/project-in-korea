package kr.pik.core;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;
import kr.pik.auth.Account;
import kr.pik.utils.database.Database;

public abstract class WebVerticle extends AbstractVerticle {
	public static final String LOGIN_COOKIE = "LOGIN_SESSION";
	public static final String ERROR_KEY = "err";
	
    protected static Vertx vertx;
    protected static Router router;
    protected static Database database;
    
    public WebVerticle() {
    	vertx = RestAPIService.getVertx();
    	router = RestAPIService.getRouter();
    	database = Database.getInstance();
    }

	public Account getAccount(RoutingContext context) {
		Account account = null;
		if(context.getCookie(LOGIN_COOKIE) != null)
		{
			account = (Account)context.session().get(context.getCookie(LOGIN_COOKIE).getValue());
		}
		return account;
	}
}
