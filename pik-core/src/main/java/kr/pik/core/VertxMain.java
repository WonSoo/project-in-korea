//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;

public class VertxMain {
    private static Vertx vertx;
    private static Router router;

    public VertxMain() {
    }

    private static void initialize() {
        vertx = Vertx.vertx();
        router = Router.router(vertx);
    }

    public static void main(String[] args) {
        initialize();
        RestAPIService.getInstance().start();
        vertx.createHttpServer().requestHandler(router::accept).listen(3000);
    }

    public static Vertx getVertx() {
        return vertx;
    }	

    public static Router getRouter() {
        return router;
    }

}
