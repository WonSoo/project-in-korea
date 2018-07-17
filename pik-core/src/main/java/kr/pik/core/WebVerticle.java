package kr.pik.core;

import java.util.Map;

import org.bson.Document;

import com.google.protobuf.GeneratedMessageV3;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Descriptors.FieldDescriptor;
import com.google.protobuf.util.JsonFormat;

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
	
    protected static Router router;
    protected static Database database;
    
    public WebVerticle() {
    	router = RestAPIService.getRouter();
    	database = Database.getInstance();
    }
    
    public Document messageToDoc(GeneratedMessageV3 message) {
    	Document doc = new Document();
    	try {
			doc = Document.parse(JsonFormat.printer().includingDefaultValueFields().print(message));
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	return doc;
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
