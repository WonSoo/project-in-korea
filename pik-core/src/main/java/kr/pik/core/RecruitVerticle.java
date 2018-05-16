//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.Future;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;
import org.bson.Document;

public class RecruitVerticle extends WebVerticle {
	private SQLDialect recruitDialect;

	@Override
	public void start() throws Exception {
    	System.out.println(this.getClass().getName() + "'s start() called.");
    	recruitDialect = FactorySQLDialect.createSQLDialect(Dialect.Recruit);
    	
        router.get("/api/recruit/getCategoies").handler(this::getCategories);
        router.get("/api/recruit/getKeyword").handler(this::getKeyword);
        router.get("/api/recruit").handler(this::getAmount);
        router.post("/api/recruit").handler(this::addRecruit);
        router.get("/api/recruitTest").handler(this::test);
        
        router.get("/api/recruit/:id").handler(this::getRecruit);
        router.put("/api/recruit/:recruit_id").handler(this::updateRecruit);
        router.delete("/api/recruit/:recruit_id").handler(this::deleteRecruit);
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

        Iterator<Document> cursor = recruitDialect.find(searchQuery);
        String response_json = null;
        while(cursor.hasNext()) {
        	response_json = cursor.next().toJson();
        }
        
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
