//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import io.vertx.core.MultiMap;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import kr.pik.utils.database.Database;
import org.bson.Document;

public class TestHandler extends WebVerticle {

	public void start() {
		this.router.get("/test/addCookie").handler(this::addCookie);
		this.router.get("/test/addSession").handler(this::addSession);
		this.router.get("/test/getSession").handler(this::getSession);
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
