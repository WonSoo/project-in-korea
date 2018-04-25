package kr.pik.core;

import java.util.Iterator;
import org.bson.Document;
import io.vertx.ext.web.RoutingContext;
import kr.pik.auth.Account;
import kr.pik.content.Status;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;

public class ProxyVerticle extends WebVerticle{

	private SQLDialect recruitDialect;
	
    public void start() {
    	recruitDialect = FactorySQLDialect.createSQLDialect(Dialect.Recruit);
    	
    	// We Have to implement it by annotation using reflection.

    	//File Proxy
		router.get("/api/file/:file_name").handler(this::checkPermissionAccess);
		router.post("/api/file").handler(this::checkPermissionAccess);
    	
		//Recruit Proxy
        router.post("/api/recruit").handler(this::checkPermissionAccess);
        router.put("/api/recruit/:recruit_id").handler(this::checkPermissionAccess);
        router.delete("/api/recruit/:recruit_id").handler(this::checkPermissionAccess);
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
        	context.response().end(Status.PERMISSION_DENIED_AUTH_NEED.getJsonMessage());
        	return;
    	}
    	
    	if(context.currentRoute().getPath().startsWith("/api/recruit/")) {
    		Document searchKey = new Document();
    		
    		int recruitId = Integer.parseInt(context.pathParam("recruit_id"));
    		searchKey.put("_id", recruitId);
			searchKey.put("writer", account.getEmail());
			
    		Iterator<Document> iterator = recruitDialect.find(searchKey);
    		
    		if(!iterator.hasNext()) {
            	context.response().end(Status.PERMISSION_DENIED.getJsonMessage());
            	return;
    		}
    	}
    	// something check permission (like Recruit or AboutMe permission check)
    }
}
