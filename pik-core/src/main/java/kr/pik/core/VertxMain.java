//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.Vertx;
import io.vertx.core.VertxOptions;
import io.vertx.core.http.HttpServer;
import io.vertx.ext.web.Router;

public class VertxMain {
    private static Vertx vertx;
    private static HttpServer server;
    private static VertxOptions options = new VertxOptions();
    private static Router router;

    public VertxMain() {
    }

    private static void initialize() {
        options.setMaxEventLoopExecuteTime(9223372036854775807L);
        vertx = Vertx.vertx(options);
        server = vertx.createHttpServer();
        router = Router.router(vertx);
    }

    public static void main(String[] args) {
        initialize();
        vertx.deployVerticle(new WebVerticle());
        HttpServer var10000 = vertx.createHttpServer();
        Router var10001 = router;
        router.getClass();
        var10000.requestHandler(var10001::accept).listen(3000);
    }

    public static Vertx getVertx() {
        return vertx;
    }

    public static void setVertx(Vertx vertx) {
        vertx = vertx;
    }

    public static Router getRouter() {
        return router;
    }

    public static void setRouter(Router router) {
        router = router;
    }

    public static HttpServer getServer() {
        return server;
    }

    public static void setServer(HttpServer server) {
        server = server;
    }
}
