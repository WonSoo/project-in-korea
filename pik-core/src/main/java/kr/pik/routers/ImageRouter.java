package kr.pik.routers;

import io.vertx.ext.web.FileUpload;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import kr.pik.core.WebVerticle;
import kr.pik.utils.database.Database;

public class ImageRouter extends WebVerticle{
    private Database database;
    private Router router;

    private void Initialize() {
        this.database = Database.getInstance();
        this.router = getRouter();
    }
    
	public void start() {
		Initialize();
		
        this.router.post("/image/:id").handler(this::saveImage);
//        this.router.get("/image/:id").handler(this::getImage);
    }
	
	public void saveImage(RoutingContext context) {
		for (FileUpload upload : context.fileUploads()) {
//			String filename = upload.file
		}
	}

}
