package kr.pik.core;

import java.util.Date;

import org.bson.Document;

import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.RoutingContext;
import kr.pik.content.Status;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.SQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;

public class CommentVerticle extends WebVerticle {
	private SQLDialect recruitDialect;
	private SQLDialect authDIalect;
	private SQLDialect commentDialect;

	@Override
	public void start() throws Exception {
		System.out.println(this.getClass().getName() + "'s start() called.");
		recruitDialect = FactorySQLDialect.createSQLDialect(Dialect.Recruit);
		commentDialect = FactorySQLDialect.createSQLDialect(Dialect.Comment);
		authDIalect = FactorySQLDialect.createSQLDialect(Dialect.Auth);

//		router.get("/api/comment").handler(this::getComments);
		router.post("/api/comment").handler(this::addComment);
		router.delete("/api/comment").handler(this::deleteComment);
	}

//	private void getComments(RoutingContext context) {
//		JsonObject data = context.getBodyAsJson();
//		
//		JsonObject doc = new JsonObject();
//		doc.put("id", data.getString("recruit_id"));
//		
//		Document recruit = recruitDialect.findOne(doc);
//		
//	}

	private void addComment(RoutingContext context) {
		JsonObject data = context.getBodyAsJson();

		JsonObject doc = new JsonObject();
		String writer = getAccount(context).getEmail();
		
		doc.put("recruit_id", data.getString("post_id"));
		doc.put("content", data.getString("content"));
		doc.put("writer", writer);
        doc.put("time", String.valueOf(new Date()));
        doc.put("active", true);
		
        commentDialect.insert(doc);
        
        JsonObject symbolic_data = new JsonObject();
		Document inserted_data= commentDialect.findOne(Document.parse(doc.toString()));
		
		JsonObject inner_data = new JsonObject();
		inner_data.put("comment_id", inserted_data.get("_id"));
		inner_data.put("writer", writer);
		
		symbolic_data.put("comments", inner_data);
		
		Document recruit_searchKey = new Document("id", data.getString("post_id"));
		if(data.getString("post_type").equals("recruit")) {
			recruitDialect.findOneAndUpdate(recruit_searchKey, Document.parse(symbolic_data.toString()));
		}
		context.response().end(Status.COMMENT_SUCCESS.getJsonMessage());
	}

	private void deleteComment(RoutingContext context) {
		JsonObject data = context.getBodyAsJson();
		commentDialect.findOneAndUpdate(new Document("_id", data.getString("comment_id")), new Document("$set", new Document("active", false)));
	}
}
