//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import io.vertx.core.MultiMap;
import io.vertx.core.http.HttpServerResponse;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.*;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import kr.pik.utils.database.Database;
import org.bson.Document;

public class FileVerticle extends WebVerticle {

	public void start() {
		router.get("/api/file/:file_name").handler(this::getFile);
		router.post("/api/file").handler(this::uploadFile);
	}

	private void getFile(RoutingContext routingContext) {
		routingContext.response().setStatusCode(200);
		routingContext.response().sendFile("file-uploads/" + routingContext.pathParam("file_name"));
	}

	private void uploadFile(RoutingContext routingContext) {
		Iterator fileIterator = routingContext.fileUploads().iterator();
		JsonObject responseMessage = new JsonObject();
		JsonObject files = new JsonObject();
		while (fileIterator.hasNext()) {
			FileUpload fileUpload = (FileUpload) fileIterator.next();
			files.put(Integer.toString(files.size()), fileUpload.uploadedFileName().replace("file-uploads\\", ""));
		}
		responseMessage.put("files", files);
		routingContext.response().setStatusCode(200);
		routingContext.response().end(responseMessage.toString());
	}
}
