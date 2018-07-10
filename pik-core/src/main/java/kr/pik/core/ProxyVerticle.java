package kr.pik.core;

import java.util.Iterator;

import javax.swing.plaf.synth.SynthSplitPaneUI;

import org.bson.Document;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message;
import com.google.protobuf.util.JsonFormat;

import io.vertx.core.Future;
import io.vertx.core.buffer.Buffer;
import io.vertx.ext.web.RoutingContext;
import kr.pik.auth.Account;
import kr.pik.content.Status;
import kr.pik.message.Auth.LoginMessage;
import kr.pik.message.Auth.RegisterVerifyMessage;
import kr.pik.message.Auth.LoginMessage.EmailLoginMessage;
import kr.pik.message.Recruit.RecruitPost;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;

public class ProxyVerticle extends WebVerticle{

	private SQLDialect recruitDialect;

	@Override
	public void start() {
    	System.out.println(this.getClass().getName() + "'s start() called.");
    	recruitDialect = FactorySQLDialect.createSQLDialect(Dialect.Recruit);
    	
    	// We Have to implement it by annotation using reflection.\
//    	router.post("/api/register").handler(this::print);
//    	router.post("/api/login").handler(this::print);

        router.get("/api/recruitTest2").handler(this::test);
    	//File Proxy
		router.post("/api/file").handler(this::checkPermissionAccess);
    	
		//Recruit Proxy
        router.post("/api/recruit").handler(this::checkPermissionAccess);
        router.put("/api/recruit/:recruit_id").handler(this::checkPermissionAccess);
        router.delete("/api/recruit/:recruit_id").handler(this::checkPermissionAccess);
    }
    
    private void print(RoutingContext routingContext) {
    	System.out.println("print() called");
    	System.out.println("current routes: " + routingContext.currentRoute().getPath());
    	
    	byte[] bytes = routingContext.getBody().getBytes();
    	System.out.println(bytes);

    	if(routingContext.currentRoute().getPath().equals("/api/login")) {
    		LoginMessage.Builder builder = null;
    		try {
    			builder = LoginMessage.newBuilder().mergeFrom(bytes);
    			LoginMessage message = builder.build();
    			System.out.println("message: " +  message);
    			System.out.println("EmailLogin: " +  message.getEmailLogin());
    			System.out.println("message, email: " + message.getEmailLogin().getEmail() + "password: "+ message.getEmailLogin().getPassword());
    			System.out.println(JsonFormat.printer().print(builder));
    			System.out.println(JsonFormat.printer().print(builder.getEmailLoginBuilder()));
    			
    			routingContext.response().setChunked(true).end();
    		} catch (InvalidProtocolBufferException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    	else if(routingContext.currentRoute().getPath().equals("/api/register")) {
    		RegisterVerifyMessage.Builder builder = null;
    		try {
    			builder = RegisterVerifyMessage.newBuilder().mergeFrom(bytes);
    			RegisterVerifyMessage message = builder.build();
    			System.out.println("message, email: " + message.getEmail());
    			System.out.println(JsonFormat.printer().print(builder));
    		} catch (InvalidProtocolBufferException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
    	}
    	return;
    }
    
    private void test(RoutingContext routingContext) {
    	System.out.println("test called!");
    	routingContext.response().end("test() called!");
    }
    
    public Account checkUnauthAccess(RoutingContext context) {
    	if(context.getCookie(LOGIN_COOKIE) != null) {
    		Account account = context.session().get(context.getCookie(LOGIN_COOKIE).getValue());
    		return account;
    	}
    	return null;
    }
    
    public void checkPermissionAccess(RoutingContext context) {
    	Account account = checkUnauthAccess(context);
    	
    	if(account == null) {
        	context.response().end(Status.PERMISSION_DENIED_AUTH_NEED.toBuffer());
        	return;
    	}
    	
    	if(context.currentRoute().getPath().startsWith("/api/recruit/")) {
    		Document searchKey = new Document();
    		
    		int recruitId = Integer.parseInt(context.pathParam("recruit_id"));
    		searchKey.put("id", recruitId);
			searchKey.put("writer", account.getEmail());
			
    		if(recruitDialect.count(searchKey) != 0) {
            	context.response().end(Status.PERMISSION_DENIED.toBuffer());
            	return;
    		}
    	}
    	context.next();
    }
}
