//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package kr.pik.utils.database;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.UpdateResult;
import io.vertx.core.json.JsonArray;

import org.bson.Document;

public enum Database {
    INSTANCE;

    private final String DB_URL;
    private final String DEFAULT_DB_NAME;
    private MongoClientURI uri;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    private Document doc;

    private Database() {
        this.DB_URL = "mongodb://" + kr.pik.utils.database.SecureConfig.INSTANCE.getString("database.id") + ":" + kr.pik.utils.database.SecureConfig.INSTANCE.getString("database.password") + "@studygram-shard-00-00-csfwe.mongodb.net:27017,studygram-shard-00-01-csfwe.mongodb.net:27017,studygram-shard-00-02-csfwe.mongodb.net:27017/" + kr.pik.utils.database.SecureConfig.INSTANCE.getString("database.name") + "?ssl=true&maxIdleTimeMS=999999999&replicaSet=studygram-shard-0&authSource=admin";
        this.DEFAULT_DB_NAME = "project-in-korea";
        this.uri = new MongoClientURI(this.DB_URL);
        this.mongoClient = new MongoClient(this.uri);
        this.mongoDatabase = this.mongoClient.getDatabase("project-in-korea");
    }

    public static Database getInstance() {
        return INSTANCE;
    }

    public MongoCollection<Document> getCollection(String collection) {
        return mongoDatabase.getCollection(collection);
    }
}
