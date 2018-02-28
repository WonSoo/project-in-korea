//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.http.HttpMethod;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.*;
import io.vertx.ext.web.sstore.LocalSessionStore;
import kr.pik.utils.database.Database;

public class WebVerticle extends AbstractVerticle {
    private static Vertx vertx;
    private static Router router;
    private static Database database;

    public WebVerticle() {
    }

    private void initialize() {
        vertx = this.getVertx();
        router = VertxMain.getRouter();
    }

    public void start() throws Exception {
        this.initialize();
        router.route().handler(CorsHandler.create("*")
                .allowedMethod(HttpMethod.GET)
                .allowedMethod(HttpMethod.POST)
                .allowedMethod(HttpMethod.OPTIONS)
                .allowedHeader("X-PINGARUNER")
                .allowedHeader("Content-Type"));
        router.route().handler(CookieHandler.create());
        router.route().handler(BodyHandler.create());
        router.route().handler(SessionHandler.create(LocalSessionStore.create(vertx)));
        PostsHandler gramsHandler = new PostsHandler();
        gramsHandler.start();
        LoginHandler loginHandler = new LoginHandler();
        loginHandler.start();
        FileHandler fileHandler = new FileHandler();
        fileHandler.start();
        router.route().handler(StaticHandler.create("build"));
    }

    public void stop() throws Exception {
        System.out.println("BasicVerticle stopped");
    }

    public static Database getDatabase() {
        return database;
    }

    public static void setDatabase(Database database) {
        database = database;
    }

    public static Router getRouter() {
        return router;
    }

    public static void setRouter(Router router) {
        router = router;
    }
}
