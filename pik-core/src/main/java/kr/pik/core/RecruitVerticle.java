//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.buffer.Buffer;
import io.vertx.core.dns.impl.decoder.RecordDecoder;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import kr.pik.auth.Account;
import kr.pik.content.Status;
import kr.pik.message.Auth.LoginMessage;
import kr.pik.message.Recruit.RecruitList;
import kr.pik.message.Recruit.RecruitPost;
import kr.pik.message.Recruit.RecruitPostArray;
import kr.pik.message.Recruit.ResponseRecruitMessage;
import kr.pik.sql.FactorySQLDialect;
import kr.pik.sql.FactorySQLDialect.Dialect;
import kr.pik.sql.SQLDialect;
import org.bson.Document;

import com.google.protobuf.Descriptors.FieldDescriptor;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.Message.Builder;
import com.google.protobuf.util.JsonFormat;
import com.google.protobuf.util.JsonFormat.Printer;
import com.google.protobuf.util.JsonFormat.TypeRegistry;

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
			context.response().end(Status.RECRUIT_APPLY_PROCESS_FAIL.toBuffer());
			return;
		}

		Document update = new Document("active", data.getBoolean("active"));
		applyDialect.findOneAndUpdate(doc, new Document("$set", update));
		
		context.response().end(Status.RECRUIT_APPLY_PROCESS_SUCCESS.toBuffer());
	}
	
	private void apply(RoutingContext context) {
		JsonObject data = context.getBodyAsJson();
		
		JsonObject new_data = new JsonObject();
		String applier = getAccount(context).getEmail();

		Document doc = new Document();
		doc.put("id", data.getString("recruit_id"));
		doc.put("apply", new Document().put("applier", applier));
		
		Document isExist = recruitDialect.findOne(doc);
		if(isExist != null) {
			context.response().end(Status.RECRUIT_ALREADY_APPLIED.toBuffer());
			return;
		}
		
		new_data.put("recruit_id", data.getString("recruit_id"));
		new_data.put("applier", applier);
		new_data.put("time", String.valueOf(new Date()));
		new_data.put("active", true);
		
		applyDialect.insert(Document.parse(new_data.toString()));
		
		JsonObject symbolic_data = new JsonObject();
		Document inserted_data= applyDialect.findOne(Document.parse(new_data.toString()));
		JsonObject inner_data = new JsonObject();
		inner_data.put("apply_id", inserted_data.get("id"));
		inner_data.put("applier", applier);
		
		symbolic_data.put("apply", inner_data);
		
		Document recruit_searchKey = new Document("id", data.getString("recruit_id"));
		recruitDialect.update(recruit_searchKey, Document.parse(symbolic_data.toString()));
		
		Document auth_searchKey = new Document("email", applier);
		
		Document updateDocument = new Document("$set", Document.parse(symbolic_data.toString()));
		authDIalect.findOneAndUpdate(auth_searchKey, Document.parse(updateDocument.toString()));
		
		context.response().end(Status.RECRUIT_APPLY_SUCCESS.toBuffer());
	}
    
    private void test(RoutingContext routingContext) {
    	System.out.println("test called!");
    	routingContext.response().end("test() called!");
    }
    
    private void getKeyword(RoutingContext routingContext) {
        String projectName = routingContext.request().getParam("project_name");
        String bigCategory = routingContext.request().getParam("big_category");
        List<String> colorTags = routingContext.request().params().getAll("colortags[]");

        Document searchQuery = new Document();
        searchQuery.put("project_name", projectName);
        searchQuery.put("big_category", bigCategory);
        searchQuery.put("colortags", colorTags);
        
        ArrayList<Document> docs = recruitDialect.find(searchQuery);
        
        RecruitList.Builder builder = RecruitList.newBuilder();
        for(Document doc : docs)
        {
        	builder.addRecruitList(RecruitList.RecruitPost.newBuilder().setProjectName(doc.getString("project_name")).setId(doc.getString("id")).setPosterImagePath("posterImagePath"));
        }
        RecruitList recruitLists = builder.build();
        
        routingContext.response().end(Buffer.buffer(recruitLists.toByteArray()));
    }

    private void getAmount(RoutingContext routingContext) {
    	String _lastIndex = routingContext.request().getParam("lastIndex");
    	int lastIndex = 0;
    	
    	if(_lastIndex != null)
    		lastIndex = Integer.parseInt(_lastIndex);
    	
    	String _limit = routingContext.request().getParam("limit");
    	int limit = 0;
    	if(_limit != null)
    		limit = Integer.parseInt(_limit);
    	
        ArrayList<Document> docs = recruitDialect.find(null, lastIndex, limit);
        
        RecruitList.Builder builder = RecruitList.newBuilder(); 
        for( Document doc : docs ) {
        	RecruitList.RecruitPost.Builder postBuilder = RecruitList.RecruitPost.newBuilder();
    		postBuilder.setId(doc.getString("id"));
    		postBuilder.setPosterImagePath(doc.getString("posterImagePath"));
    		postBuilder.setProjectName(doc.getString("projectName"));
        	
        	builder.addRecruitList(postBuilder.build());
        }
        
        RecruitList recruitList = builder.build();

        routingContext.response().setChunked(true);
        routingContext.response().end(Buffer.buffer(recruitList.toByteArray()));
    }
    
    private void addRecruit(RoutingContext routingContext) {
		System.out.println("addRecruit called");
    	byte[] bytes = routingContext.getBody().getBytes();
		RecruitPost.Builder builder = null;
		try {
			builder = RecruitPost.newBuilder().mergeFrom(bytes);
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Document insertData = null;
		try {
			insertData = Document.parse(JsonFormat.printer().includingDefaultValueFields().print(builder));
			
			Account account = getAccount(routingContext);
			if(account == null) {
				ResponseRecruitMessage message = ResponseRecruitMessage.newBuilder().setIsSuccess(false).setMessage("글 작성에 실패하셨습니다. 로그인이 필요합니다.").build();
		        routingContext.response().setStatusCode(200);
		        routingContext.response().end(Buffer.buffer(message.toByteArray()));
				return;
			}

			insertData.replace("writer", account.getEmail());
			insertData.replace("time", String.valueOf(new Date()));
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        recruitDialect.insert(insertData);
        
        Document rs = recruitDialect.findOne(insertData);
        
        ResponseRecruitMessage message = ResponseRecruitMessage.newBuilder().setIsSuccess(true).setMessage("글 작성에 성공하셨습니다.").setId(rs.getString("id")).build();
        routingContext.response().setStatusCode(200);
        routingContext.response().end(Buffer.buffer(message.toByteArray()));
    }

    private void getRecruit(RoutingContext routingContext) {
        Document searchQuery = new Document();
        String id = routingContext.pathParam("id");
        if(id == null) {
        	routingContext.response().end(Status.RECRUIT_GET_ID_NULL.toBuffer());
        	return;
        }
        searchQuery.put("id", id);
        Document doc = recruitDialect.findOne(searchQuery);
        
    	Account account = getAccount(routingContext);
    	System.out.println(doc);
//    	if(!doc.getString("applier").equals(account.getEmail())) {
//    		doc.replace("apply", "");
//    	}

		RecruitPost post = null;
    	try {
        	RecruitPost.Builder builder = RecruitPost.newBuilder();
			JsonFormat.parser().merge(doc.toJson(), builder);
			post = builder.build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
        routingContext.response().setChunked(true);
        
        if(post != null) 
            routingContext.response().end(Buffer.buffer(post.toByteArray()));
        else
        	routingContext.response().end();
    }
    
    private void updateRecruit(RoutingContext routingContext) {
    	Document searchKey = new Document();
        searchKey.put("id", Integer.parseInt(routingContext.pathParam("id")));
        
        byte[] bytes = routingContext.getBody().getBytes();
		RecruitPost requestMessage = null;
		try {
			requestMessage = RecruitPost.newBuilder().mergeFrom(bytes).build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Document updateData = messageToDoc(requestMessage);

		recruitDialect.update(searchKey, updateData);
        Document rs = recruitDialect.findOne(updateData);
        
        ResponseRecruitMessage message = ResponseRecruitMessage.newBuilder().setIsSuccess(true).setMessage("글 수정에 성공하셨습니다.").setId(rs.getString("id")).build();
        routingContext.response().setStatusCode(200);
        routingContext.response().end(Buffer.buffer(message.toByteArray()));
    }
    
    private void deleteRecruit(RoutingContext routingContext) {
    	Document searchKey = new Document("id", Integer.parseInt(routingContext.pathParam("id")));
    	recruitDialect.delete(searchKey);

    	ResponseRecruitMessage message = ResponseRecruitMessage.newBuilder().setIsSuccess(true).setMessage("글 삭제에 성공하셨습니다.").build();
        routingContext.response().setStatusCode(200);
        routingContext.response().end(Buffer.buffer(message.toByteArray()));
    }
}
