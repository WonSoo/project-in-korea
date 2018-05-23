//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import kr.pik.auth.Account;
import kr.pik.content.Status;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;
import org.bson.Document;

public class RecruitVerticle extends WebVerticle {
	private SQLDialect recruitDialect;
	private SQLDialect applyDialect;
	private SQLDialect authDIalect;

	@Override
	public void start() throws Exception {
    	System.out.println(this.getClass().getName() + "'s start() called.");
    	recruitDialect = FactorySQLDialect.createSQLDialect(Dialect.Recruit);
    	applyDialect = FactorySQLDialect.createSQLDialect(Dialect.Apply);
    	authDIalect = FactorySQLDialect.createSQLDialect(Dialect.Auth);
    	
        router.get("/api/recruit/getCategoies").handler(this::getCategories);
        router.get("/api/recruit/getKeyword").handler(this::getKeyword);
        router.get("/api/recruit").handler(this::getAmount);
        router.post("/api/recruit").handler(this::addRecruit);
        router.get("/api/recruitTest").handler(this::test);
        
        router.get("/api/recruit/:id").handler(this::getRecruit);
        router.put("/api/recruit/:recruit_id").handler(this::updateRecruit);
        router.delete("/api/recruit/:recruit_id").handler(this::deleteRecruit);
        
        router.post("/api/recruit/apply").handler(this::apply);
        router.post("/api/recruit/apply/process").handler(this::apply_process);
    }
	
	private void apply_process(RoutingContext context) {
		JsonObject data = context.getBodyAsJson();
		Document doc = new Document();
		doc.put("apply_id", data.getString("apply_id"));
		
		Document a = applyDialect.findOne(new Document("active", new Document("$exists", true)));
		if(a!= null) {
			context.response().end(Status.RECRUIT_APPLY_PROCESS_FAIL.getJsonMessage());
			return;
		}

		Document update = new Document("active", data.getBoolean("active"));
		applyDialect.findOneAndUpdate(doc, new Document("$set", update));
		
		context.response().end(Status.RECRUIT_APPLY_PROCESS_SUCCESS.getJsonMessage());
	}
	
	private void apply(RoutingContext context) {
		JsonObject data = context.getBodyAsJson();
		
		JsonObject new_data = new JsonObject();
		String writer = getAccount(context).getEmail();

		Document doc = new Document();
		doc.put("id", data.getString("recruit_id"));
		doc.put("apply", new Document().put("writer", writer));
		
		Document isExist = recruitDialect.findOne(doc);
		if(isExist != null) {
			context.response().end(Status.RECRUIT_ALREADY_APPLIED.getJsonMessage());
			return;
		}
		
		new_data.put("recruit_id", data.getString("recruit_id"));
		new_data.put("writer", writer);
		new_data.put("time", String.valueOf(new Date()));
		new_data.put("active", true);
		
		applyDialect.insert(Document.parse(new_data.toString()));
		
		JsonObject symbolic_data = new JsonObject();
		Document inserted_data= applyDialect.findOne(Document.parse(new_data.toString()));
		JsonObject inner_data = new JsonObject();
		inner_data.put("apply_id", inserted_data.get("_id"));
		inner_data.put("writer", writer);
		
		symbolic_data.put("apply", inner_data);
		
		Document recruit_searchKey = new Document("id", data.getString("recruit_id"));
		recruitDialect.update(recruit_searchKey, Document.parse(symbolic_data.toString()));
		
		Document auth_searchKey = new Document("email", writer);
		
		Document updateDocument = new Document("$set", Document.parse(symbolic_data.toString()));
		authDIalect.findOneAndUpdate(auth_searchKey, Document.parse(updateDocument.toString()));
		
		context.response().end(Status.RECRUIT_APPLY_SUCCESS.getJsonMessage());
	}
    
    private void test(RoutingContext routingContext) {
    	System.out.println("test called!");
    	routingContext.response().end("test() called!");
    }
    
    private void getCategories(RoutingContext routingContext) {
    	Iterator<Document> cursor = recruitDialect.find();
    	
    	String categories = null;
        while(cursor.hasNext())
        	categories = cursor.next().toJson();
        
        routingContext.response().setStatusCode(200);
        routingContext.response().end(categories);
    }

    private void getKeyword(RoutingContext routingContext) {
        String projectName = routingContext.request().getParam("project_name");
        String bigCategory = routingContext.request().getParam("big_category");
        List<String> colorTags = routingContext.request().params().getAll("colortags[]");

        Document searchQuery = new Document();
        searchQuery.put("project_name", projectName);
        searchQuery.put("big_category", bigCategory);
        searchQuery.put("colortags", colorTags);
        
        Iterator<Document> cursor = recruitDialect.find(searchQuery);
        JsonArray categories= new JsonArray();
        while(cursor.hasNext())
        	categories.add(cursor.next().toJson());

        routingContext.response().end(categories.toString());
    }

    private void getAmount(RoutingContext routingContext) {
        int limit = Integer.parseInt(routingContext.pathParam("limit"));
        Iterator<Document> cursor = recruitDialect.find(null, limit, 15);
        
        JsonArray jsonArray = new JsonArray();
        while(cursor.hasNext()) {
        	jsonArray.add(cursor.next().toJson());
        }

        routingContext.response().setChunked(true);
        routingContext.response().end(jsonArray.toString());
    }
    
    private void addRecruit(RoutingContext routingContext) {
        JsonObject json = routingContext.getBodyAsJson();

        json.put("writer", getAccount(routingContext).getEmail());
        json.put("time", String.valueOf(new Date()));

        recruitDialect.insert(Document.parse(json.toString()));
        routingContext.response().setStatusCode(200);
        routingContext.response().setStatusMessage("post writed");
        routingContext.response().end();
    }

    private void getRecruit(RoutingContext routingContext) {
    	System.out.println("getRecruit called!");
        Document searchQuery = new Document();
        searchQuery.put("_id", Integer.parseInt(routingContext.pathParam("id")));

        Document doc = recruitDialect.findOne(searchQuery);
        String response_json = null;
    	Account account = getAccount(routingContext);
    	if(!doc.getString("writer").equals(account.getEmail())) {
    		doc.remove("apply");
    	}
    	response_json = doc.toJson();
        
        routingContext.response().setChunked(true);
        
        if(response_json != null) 
            routingContext.response().end(response_json);
        else
        	routingContext.response().end();
    }
    
    private void updateRecruit(RoutingContext routingContext) {
        Document searchKey = new Document();
        searchKey.put("_id", Integer.parseInt(routingContext.pathParam("id")));
        recruitDialect.update(searchKey, Document.parse(routingContext.getBodyAsJson().toString()));
        
        routingContext.response().setChunked(true);
        routingContext.response().end();
    }
    
    private void deleteRecruit(RoutingContext routingContext) {
    	Document searchKey = new Document("_id", Integer.parseInt(routingContext.pathParam("id")));
    	recruitDialect.delete(searchKey);
    	
    	routingContext.response().end();
    }
}
