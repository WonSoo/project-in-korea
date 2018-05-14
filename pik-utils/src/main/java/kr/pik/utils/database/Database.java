package kr.pik.utils.database;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public enum Database {
    INSTANCE;

	private SecureConfig config;
    private MongoClientURI uri;
    private MongoClient mongoClient;
    private MongoDatabase mongoDatabase;
    
    private Database() {
    	config = SecureConfig.getInstance();
        this.uri = new MongoClientURI("mongodb+srv://" + config.getString("database.id") +":" + config.getString("database.password") + "@cluster0-t7aoq.mongodb.net/test?retryWrites=true");
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
