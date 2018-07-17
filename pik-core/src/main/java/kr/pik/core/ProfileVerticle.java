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
import kr.pik.message.Profile.ProfileMessage;
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

public class ProfileVerticle extends WebVerticle {
	private SQLDialect profileDialect;
	private SQLDialect authDIalect;

	@Override
	public void start() throws Exception {
    	System.out.println(this.getClass().getName() + "'s start() called.");
    	profileDialect = FactorySQLDialect.createSQLDialect(Dialect.Profile);
    	authDIalect = FactorySQLDialect.createSQLDialect(Dialect.Auth);
    	
        router.get("/api/profile").handler(this::getProfile);
        router.put("/api/profile").handler(this::updateProfile);
    }
	
	private void getProfile(RoutingContext context) {
       Document searchQuery = new Document();
        String id = context.pathParam("id");
        Account account = null;
        if(id == null) {
        	account = getAccount(context);
        	if(account != null) {
        		id = account.getObjectID();
        	} else {
        		context.response().end(Status.PERMISSION_DENIED_AUTH_NEED.toBuffer());
        		return;
        	}
        }
        searchQuery.put("userID", id);
        Document doc = profileDialect.findOne(searchQuery);
        
        ProfileMessage post = null;
        ProfileMessage.Builder builder = ProfileMessage.newBuilder();
        if(doc == null) {
        	post = builder.setUserID(account.getObjectID()).setUserName(account.getName()).build();
        	Document inputData = messageToDoc(post);
        	profileDialect.insert(inputData);
        	
        	doc = profileDialect.findOne(searchQuery);
        }
        
    	try {
    		builder.clear();
			JsonFormat.parser().merge(doc.toJson(), builder);
			post = builder.build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
        System.out.println(post);
        context.response().setChunked(true);
        context.response().end(Buffer.buffer(post.toByteArray()));
	}
	
	private void updateProfile(RoutingContext context) {
        byte[] bytes = context.getBody().getBytes();
		ProfileMessage profileMessage = null;
		try {
			profileMessage = ProfileMessage.newBuilder().mergeFrom(bytes).build();
		} catch (InvalidProtocolBufferException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Document searchKey = new Document("userID", profileMessage.getUserID());
		Document updateData = messageToDoc(profileMessage);
		
		System.out.println(searchKey);
		System.out.println(updateData);
		profileDialect.update(searchKey, updateData);
        Document rs = profileDialect.findOne(updateData);
        
        context.response().end(Status.PROFILE_UPDATE_SUCCESS.toBuffer());
	}
	
}
