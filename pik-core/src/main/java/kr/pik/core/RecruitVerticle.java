//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import com.mongodb.client.MongoCursor;
import io.vertx.core.MultiMap;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;

import java.util.Date;
import java.util.List;

import kr.pik.auth.Account;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;
import kr.pik.utils.database.Database;
import org.bson.Document;

public class RecruitVerticle extends WebVerticle {
	private SQLDialect recruitDialect;

    public void start() {
    	recruitDialect = FactorySQLDialect.createSQLDialect(Dialect.Recruit);
    	
        router.get("/api/recruit/getCategoies").handler(this::getCategories);
        router.get("/api/recruit/getKeyword").handler(this::getKeyword);
        router.get("/api/recruit").handler(this::getAmount);
        router.post("/api/recruit").handler(this::addRecruit);
        
        router.get("/api/recruit/:id").handler(this::getRecruit);
        router.put("/api/recruit/:recruit_id").handler(this::updateRecruit);
        router.delete("/api/recruit/:recruit_id").handler(this::deleteRecruit);
    }
    
    private void getCategories(RoutingContext routingContext) {
    	MongoCursor<Document> cursor = recruitDialect.find();
    	
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
        
        MongoCursor<Document> cursor = recruitDialect.find(searchQuery);
        JsonArray categories= new JsonArray();
        while(cursor.hasNext())
        	categories.add(cursor.next().toJson());

        routingContext.response().end(categories.toString());
    }

    private void getAmount(RoutingContext routingContext) {
        int amount = Integer.parseInt(routingContext.pathParam("amount"));
        HttpServerResponse response = routingContext.response();
        MongoCursor<Document> cursor = recruitDialect.find(null, 0, amount);
        JsonArray jsonArray = database.findMany("grams", amount);

        response.setChunked(true);
        if (jsonArray.isEmpty()) {
            response.setStatusCode(204);
            response.end();
        } else {
            response.end(jsonArray.toString());
        }
    }

    private void addRecruit(RoutingContext routingContext) {
        MultiMap attributes = routingContext.request().formAttributes();

        JsonObject json = routingContext.getBodyAsJson();
        System.out.println(json.toString());
        JsonArray fileArray = new JsonArray();

        json.put("time", String.valueOf(new Date()));

        if (routingContext.getCookie("login_session") == null || routingContext.session().get(routingContext.getCookie("login_session").getValue()) == null) {
            routingContext.response().setStatusCode(400);
            routingContext.response().setStatusMessage("please relogin");
            routingContext.response().end();
        } else{
            json.put("writer", ((Account)routingContext.session().get(routingContext.getCookie("login_session").getValue())).getName());

            database.insert("grams", Document.parse(json.toString()));
            routingContext.response().setStatusCode(200);
            routingContext.response().setStatusMessage("post writed");
            routingContext.response().end();
        }
    }

    private void getRecruit(RoutingContext routingContext) {
        System.out.println(routingContext.request().getParam("id") + " + getGramOne");
        HttpServerResponse response = routingContext.response();
        int id = Integer.parseInt(routingContext.pathParam("id"));
        response.setChunked(true);
        Document searchQuery = new Document();
        searchQuery.put("_id", id);
        Document result = database.findOne("grams", searchQuery);

        String response_json;
        if(result == null) {
            result = new Document();
            result.append("type", "null");
        }
        response_json = result.toJson();

        response.putHeader("content-type", "application/json; charset=utf-8").end(response_json);
    }
    
    private void updateRecruit(RoutingContext routingContext) {
        System.out.println(routingContext.request().getParam("id") + " + updateGram");
        HttpServerResponse response = routingContext.response();
        int id = Integer.parseInt(routingContext.pathParam("id"));
        response.setChunked(true);
        System.out.println(routingContext.getBodyAsJson().toString());
        Database var10000 = database;
        new Document();
        int modifiedCount = var10000.update("grams", id, Document.parse(routingContext.getBodyAsJson().toString()));
        response.end(modifiedCount + "");
    }
    
    private void deleteRecruit(RoutingContext routingContext) {
        System.out.println("deleteGram");
        database.remove("grams", new Document("_id", Integer.parseInt(routingContext.pathParam("id"))));
    }
}