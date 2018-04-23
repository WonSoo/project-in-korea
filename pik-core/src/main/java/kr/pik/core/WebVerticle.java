//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.core;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Vertx;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.handler.*;
import kr.pik.utils.database.Database;

public abstract class WebVerticle extends AbstractVerticle {
    protected static Vertx vertx;
    protected static Router router;
    protected static Database database;
    
    public WebVerticle() {
    	vertx = RestAPIService.getVertx();
    	router = RestAPIService.getRouter();
    	database = Database.getInstance();
    }

    public void start() throws Exception {
    }

    public void stop() throws Exception {
        System.out.println("BasicVerticle stopped");
    }
}