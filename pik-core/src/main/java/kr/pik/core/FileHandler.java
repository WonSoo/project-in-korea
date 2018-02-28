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

public class FileHandler extends WebVerticle {
	private Database database;
	private Router router;

	private void Initialize() {
		this.database = Database.getInstance();
		this.router = getRouter();
	}

	public void start() {
		this.Initialize();
		this.router.get("/api/file/:file_name").handler(this::getFile);
		this.router.post("/api/file").handler(this::uploadFile);
	}

	private void getFile(RoutingContext routingContext) {
		routingContext.response().setStatusCode(200);
		routingContext.response().setStatusMessage("file cannot uploaded.");
		routingContext.response().sendFile("file-uploads/" + routingContext.pathParam("file_name"));
	}

	private void uploadFile(RoutingContext routingContext) {
		Iterator fileIterator = routingContext.fileUploads().iterator();

		while (fileIterator.hasNext()) {
			FileUpload fileUpload = (FileUpload) fileIterator.next();
			routingContext.response().setStatusCode(200);
			routingContext.response().end(fileUpload.uploadedFileName().replace("file-uploads\\", ""));
			routingContext.response().close();
		}
		if(!routingContext.response().closed()) {
			routingContext.response().setStatusCode(400);
			routingContext.response().setStatusMessage("file cannot uploaded.");
			routingContext.response().end("file cannot uploaded.");
		}
	}
}
