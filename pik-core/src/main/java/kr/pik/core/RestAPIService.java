package kr.pik.core;

import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import io.vertx.core.http.HttpServerOptions;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.CookieHandler;
import io.vertx.ext.web.handler.CorsHandler;
import io.vertx.ext.web.handler.SessionHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.ext.web.sstore.LocalSessionStore;

public class RestAPIService {
	private static Vertx vertx = null;
	private static Router router = null;

	private RestAPIService() {

	}

	private static class RestAPIWrapper {
		static RestAPIService INSTANCE = new RestAPIService();
	}

	public void start() {
		vertx = Vertx.vertx();
		router = Router.router(vertx);

		enableCorsSupport();
		addBodyHandler();
		addCookieHandler();
		addSessionHandler();

		try {
			 WebVerticle testHandler = new TestHandler();
			 vertx.deployVerticle(testHandler);
			
			WebVerticle proxyVerticle = new ProxyVerticle();
			proxyVerticle.start();

			WebVerticle recruitVerticle = new RecruitVerticle();
			recruitVerticle.start();
			
			WebVerticle profileVerticle = new ProfileVerticle();
			profileVerticle.start();

			WebVerticle authVerticle = new AuthVerticle();
			authVerticle.start();

			WebVerticle fileVerticle = new FileVerticle();
			fileVerticle.start();

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		addStaticHandler();
		
		
		vertx.createHttpServer().requestHandler(router::accept).listen(3333);

	}

	public void enableCorsSupport() {
		router.route()
				.handler(CorsHandler.create("*").allowedMethod(io.vertx.core.http.HttpMethod.GET)
						.allowedMethod(io.vertx.core.http.HttpMethod.POST)
						.allowedMethod(io.vertx.core.http.HttpMethod.OPTIONS).allowedMethod(io.vertx.core.http.HttpMethod.PUT).allowCredentials(true)
						.allowedHeader("Access-Control-Allow-Method").allowedHeader("Access-Control-Allow-Origin")
						.allowedHeader("Access-Control-Allow-Credentials").allowedHeader("Content-Type"));
	}

	public void addStaticHandler() {
		router.route().handler(StaticHandler.create("build"));
	}

	public void addBodyHandler() {
		router.route().handler(BodyHandler.create());
	}

	public void addCookieHandler() {
		router.route().handler(CookieHandler.create());
	}

	public void addSessionHandler() {
		router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));
	}

	public static Vertx getVertx() {
		return vertx;
	}

	public static RestAPIService getInstance() {
		return RestAPIWrapper.INSTANCE;
	}

	public static Router getRouter() {
		return router;
	}
}
