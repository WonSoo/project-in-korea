//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.ext.web.*;
import kr.pik.content.Status;

import java.util.Iterator;

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
		Iterator<FileUpload> fileIterator = routingContext.fileUploads().iterator();
		Document responseMessage = new Document();
		Document files = new Document();
		while (fileIterator.hasNext()) {
			FileUpload fileUpload = (FileUpload) fileIterator.next();
			files.put(Integer.toString(files.size()), fileUpload.uploadedFileName().replace("file-uploads\\", ""));
		}
		responseMessage.put("files", files);
		
		responseMessage = Status.FILE_SAVE_SUCCESS.addErrorMessage(responseMessage);
		routingContext.response().end(responseMessage.toString());
	}
}
