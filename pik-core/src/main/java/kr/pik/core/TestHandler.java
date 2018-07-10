package kr.pik.core;

import org.bson.Document;

import io.vertx.core.Future;
import io.vertx.ext.web.*;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;

public class TestHandler extends WebVerticle {

	@Override
	public void start() throws Exception {
    	System.out.println(this.getClass().getName() + "'s start() called.");
		router.get("/test/addCookie").handler(this::addCookie);
		router.get("/test/addSession").handler(this::addSession);
		router.get("/test/getSession").handler(this::getSession);
		router.get("/test/dbTest").handler(this::testDB);
	}
	
	private void testDB(RoutingContext routingContext) {
		System.out.println("testDB called");
		SQLDialect dialect = FactorySQLDialect.createSQLDialect(Dialect.Auth);
		Document src = dialect.findOne();
		
		Document res = dialect.findOne(src);
		
		routingContext.response().end("TEST");
	}

	private void addCookie(RoutingContext routingContext) {
        Cookie cookie = Cookie.cookie("test_cookie", "this is test value");
		routingContext.addCookie(cookie);
		routingContext.response().setStatusCode(200);
		routingContext.response().end("cookie saving was tried");
	}

	private void addSession(RoutingContext routingContext) {
        Cookie cookie = Cookie.cookie("test_cookie", "this is test value");
		routingContext.addCookie(cookie);
		routingContext.response().setStatusCode(200);
		routingContext.response().end("cookie saving was tried");
	}
	
	private void getSession(RoutingContext routingContext) {
		Session session = routingContext.session().get("test_session");
		System.out.println("getSession: " + session);
	}
}
