//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.MultiMap;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;

import java.util.Date;
import java.util.Iterator;
import kr.pik.utils.database.Database;
import org.bson.Document;

public class PostsHandler extends WebVerticle {
    private Database database;
    private Router router;

    public PostsHandler() {
    }

    private void Initialize() {
        this.database = Database.getInstance();
        this.router = getRouter();
    }

    public void start() {
        this.Initialize();
        router.get("/request/post/getKeyword").handler(this::getKeyword);
        this.router.get("/request/post/:amount").handler(this::getPostMany);
        this.router.get("/request/postOne/:id").handler(this::getPostOne);
        this.router.get("/request/image/:filename").handler(this::getPostImage);
        this.router.post("/request/post").handler(this::addPost);
        this.router.put("/request/post/:id").handler(this::updatePost);
        this.router.delete("/request/post/:id").handler(this::deletePost);
    }

    private void getKeyword(RoutingContext routingContext) {
        JsonArray receivedMessage = routingContext.getBodyAsJsonArray();
        System.out.println(receivedMessage);
//        String[] colorTags = receivedMessage.get
//
//
//
//        routingContext.response().setChunked(true);
//        Document searchQuery = new Document();
//        searchQuery.put("$or", new Document("title",java.util.regex.Pattern.compile(startWith)));
//        searchQuery.put("$or", new Document("content",java.util.regex.Pattern.compile(startWith)));
//        searchQuery.put("$or", new Document("content",java.util.regex.Pattern.compile(startWith)));
//        searchQuery.put("$or", new Document("content",java.util.regex.Pattern.compile(startWith)));
//
//        JsonArray jsonArray = database.findKeyword("posts", searchQuery);
//
//        System.out.println(jsonArray.toString());

        String responseMessage = "Test...";
        routingContext.response().end(responseMessage);
    }

    private void getPostImage(RoutingContext routingContext) {
        String filename = routingContext.pathParam("filename");
        routingContext.response().sendFile("file-uploads/" + filename);
    }

    private void getPostMany(RoutingContext routingContext) {
        System.out.println(routingContext.pathParam("amount") + " + getPostMany");
        int amount = Integer.parseInt(routingContext.pathParam("amount"));
        HttpServerResponse response = routingContext.response();
        response.setChunked(true);
        JsonArray jsonArray = this.database.findMany("grams", amount);

        if (jsonArray.isEmpty()) {
            response.setStatusCode(204);
            response.end();
        } else {
            response.putHeader("content-type", "application/json; charset=utf-8").end(jsonArray.toString());
        }

    }

    private void getPostOne(RoutingContext routingContext) {
        System.out.println(routingContext.request().getParam("id") + " + getGramOne");
        HttpServerResponse response = routingContext.response();
        int id = Integer.parseInt(routingContext.pathParam("id"));
        response.setChunked(true);
        Document searchQuery = new Document();
        searchQuery.put("_id", id);
        Document result = this.database.findOne("grams", searchQuery);

        String response_json;
        if(result == null) {
            result = new Document();
            result.append("type", "null");
        }
        response_json = result.toJson();

        response.putHeader("content-type", "application/json; charset=utf-8").end(response_json);
    }

    private void updatePost(RoutingContext routingContext) {
        System.out.println(routingContext.request().getParam("id") + " + updateGram");
        HttpServerResponse response = routingContext.response();
        int id = Integer.parseInt(routingContext.pathParam("id"));
        response.setChunked(true);
        System.out.println(routingContext.getBodyAsJson().toString());
        Database var10000 = this.database;
        new Document();
        int modifiedCount = var10000.update("grams", id, Document.parse(routingContext.getBodyAsJson().toString()));
        response.end(modifiedCount + "");
    }

    private void addPost(RoutingContext routingContext) {
        System.out.println("addPost");

        MultiMap attributes = routingContext.request().formAttributes();

        JsonObject json = routingContext.getBodyAsJson();
        JsonArray fileArray = new JsonArray();
        Iterator var5 = routingContext.fileUploads().iterator();

        while(var5.hasNext()) {
            FileUpload fileUpload = (FileUpload)var5.next();
            fileArray.add(fileUpload.uploadedFileName().replace("file-uploads\\", ""));
            routingContext.response().sendFile(fileUpload.uploadedFileName());
        }

//        json.put("title", attributes.get("title"));
//        json.put("content", attributes.get("content"));
//        json.put("files", fileArray);
        json.put("time", String.valueOf(new Date()));


        if (routingContext.getCookie("login_session") == null || routingContext.session().get(routingContext.getCookie("login_session").getValue()) == null) {
            routingContext.response().setStatusCode(400);
            routingContext.response().setStatusMessage("please relogin");
            routingContext.response().end();
        } else{
            json.put("writer", LoginHandler.getIdFromAccessToken(routingContext.session().get(routingContext.getCookie("login_session").getValue())));

            this.database.insert("grams", Document.parse(json.toString()));
            routingContext.response().setStatusCode(200);
            routingContext.response().setStatusMessage("post writed");
            routingContext.response().end();
        }

    }

    private void deletePost(RoutingContext routingContext) {
        System.out.println("deleteGram");
        this.database.remove("grams", new Document("_id", Integer.parseInt(routingContext.pathParam("id"))));
    }
}
