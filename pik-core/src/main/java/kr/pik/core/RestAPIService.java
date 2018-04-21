package kr.pik.core;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;

public class RestAPIService {
	private static Router router = null;
	private static Vertx vertx = null;
	
	private RestAPIService() {
		
	}
	
	private static class RestAPIWrapper {
		private static RestAPIService INSTANCE = new RestAPIService();
	}
	
	public void start() {
		vertx = Vertx.vertx();
		router = Router.router(vertx);

        try {
        	enableCorsSupport();
        	
	        addBodyHnadler();
	        addCookieHandler();
	        addSessionHandler();
	        
	        WebVerticle postVerticle = new PostVerticle();
	        vertx.deployVerticle(postVerticle);
	        
	        WebVerticle loginVerticle = new LoginVerticle();
	        vertx.deployVerticle(loginVerticle);
	        
	        WebVerticle fileVerticle = new FileVerticle();
	        vertx.deployVerticle(fileVerticle);
	        
	        addStaticHandler();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
    public void enableCorsSupport() {
    	router.route().handler(CorsHandler.create("http://localhost:3000")
        		.allowedMethod(io.vertx.core.http.HttpMethod.GET)
        		.allowedMethod(io.vertx.core.http.HttpMethod.POST)
        		.allowedMethod(io.vertx.core.http.HttpMethod.OPTIONS)
        		.allowCredentials(true)
        		.allowedHeader("Access-Control-Allow-Method")
        		.allowedHeader("Access-Control-Allow-Origin")
        		.allowedHeader("Access-Control-Allow-Credentials")
        		.allowedHeader("Content-Type"));
    }
    
    public static RestAPIService getInstance() {
    	return RestAPIWrapper.INSTANCE;
    }
    
    public void addStaticHandler() {
    	router.route().handler(StaticHandler.create("build"));
    }
    
	public void addBodyHnadler() {
        router.route().handler(BodyHandler.create());
	}
	
	public void addCookieHandler() {
        router.route().handler(CookieHandler.create());	
	}
	
	public void addSessionHandler() {
        router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));
	}

	public static Router getRouter() {
		return router;
	}

	public static Vertx getVertx() {
		return vertx;
	}
}
