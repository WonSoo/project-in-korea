//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.routers;

import io.vertx.core.Handler;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import kr.pik.core.VertxMain;

public class ImageLookUp implements Handler<RoutingContext> {
    private Router router = VertxMain.getRouter();

    public ImageLookUp() {
    }

    public void handle(RoutingContext context) {
        String fileName = context.request().getParam("filename");
        context.response().sendFile("upload-files/" + fileName);
    }
}
