//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.buffer.Buffer;
import io.vertx.ext.web.*;
import kr.pik.content.Status;
import kr.pik.message.File.FileMessage;

import java.util.Iterator;
import org.bson.Document;

public class FileVerticle extends WebVerticle {

	@Override
	public void start() throws Exception {
		router.get("/api/file/:file_name").handler(this::getFile);
		router.post("/api/file").handler(this::uploadFile);
	}

	private void getFile(RoutingContext routingContext) {
		routingContext.response().setStatusCode(200);
		routingContext.response().sendFile("file-uploads/" + routingContext.pathParam("file_name"));
	}

	private void uploadFile(RoutingContext routingContext) {
		Iterator<FileUpload> fileIterator = routingContext.fileUploads().iterator();
		
		FileMessage.Builder builder = FileMessage.newBuilder();
		while (fileIterator.hasNext()) {
			FileUpload fileUpload = (FileUpload) fileIterator.next();
			builder.addFiles(fileUpload.uploadedFileName().replace("file-uploads\\", ""));
		}
		
		builder.setIsSuccess(Status.FILE_SAVE_SUCCESS.isSuccess());
		builder.setMessage(Status.FILE_SAVE_SUCCESS.getMessage());
		
		routingContext.response().end(Buffer.buffer(builder.build().toByteArray()));
	}
}
