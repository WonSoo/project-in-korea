package kr.pik.routers;

import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import kr.pik.core.WebVerticle;
import kr.pik.utils.database.Database;

public class ImageRouter extends WebVerticle{

	public void start() {
        this.router.post("/image/:id").handler(this::saveImage);
    }
	
	public void saveImage(RoutingContext context) {
		for (FileUpload upload : context.fileUploads()) {
//			String filename = upload.file
		}
	}

}
