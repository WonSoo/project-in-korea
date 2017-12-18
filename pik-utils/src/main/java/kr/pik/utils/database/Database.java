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
    private MongoCollection<Document> collection;
    private Document doc;

    private Database() {
        this.DB_URL = "mongodb://" + kr.pik.utils.database.SecureConfig.INSTANCE.getString("database.id") + ":" + kr.pik.utils.database.SecureConfig.INSTANCE.getString("database.password") + "@studygram-shard-00-00-csfwe.mongodb.net:27017,studygram-shard-00-01-csfwe.mongodb.net:27017,studygram-shard-00-02-csfwe.mongodb.net:27017/" + kr.pik.utils.database.SecureConfig.INSTANCE.getString("database.name") + "?ssl=true&maxIdleTimeMS=999999999&replicaSet=studygram-shard-0&authSource=admin";
        this.DEFAULT_DB_NAME = "project-in-korea";
        this.uri = new MongoClientURI(this.DB_URL);
        this.mongoClient = new MongoClient(this.uri);
        this.mongoDatabase = this.mongoClient.getDatabase("project-in-korea");
    }

    private void createCountCollection(String collectionName) {
        Document insertDoc = new Document();
        insertDoc.append("_id", collectionName);
        insertDoc.append("seq", Integer.valueOf(0));
        this.mongoDatabase.getCollection("counters").insertOne(insertDoc);
    }

    public void remove(String collection, Document doc) {
        this.mongoDatabase.getCollection(collection).deleteOne(doc);
    }

    public JsonArray findMany(String collection, int limit) {
        return this.findMany(collection, limit, 0);
    }

    public JsonArray findMany(String collection, int limit, int lastIndex) {
        this.collection = this.mongoDatabase.getCollection(collection);
        MongoCursor<Document> cursor = this.collection.find().skip(lastIndex).limit(limit).iterator();
        JsonArray jsonArray = new JsonArray();

        while(cursor.hasNext()) {
            jsonArray.add(((Document)cursor.next()).toJson());
        }

        return jsonArray;
    }

    public JsonArray findKeyword(String collection, Document searchQuery)
    {
        this.collection = mongoDatabase.getCollection(collection);
        MongoCursor<Document> cursor = this.collection.find(searchQuery).iterator();
        JsonArray jsonArray = new JsonArray();
        while(cursor.hasNext())
            jsonArray.add(cursor.next().toJson());
        return jsonArray;
    }

    public Document findOne(String collection, Document searchQuery) {
        this.collection = this.mongoDatabase.getCollection(collection);
        Document document = (Document)this.collection.find(searchQuery).first();
        return document;
    }

    public boolean isExist(String collection, String field, String searchKey) {
        Document searchQuery = new Document();
        searchQuery.put(field, searchKey);
        this.collection = this.mongoDatabase.getCollection(collection);
        MongoCursor<Document> cursor = this.collection.find(searchQuery).iterator();
        return cursor.hasNext();
    }

    public void insert(String collection, Document doc) {
        this.collection = this.mongoDatabase.getCollection(collection);
        Document searchCounters = (new Document()).append("_id", collection);
        if (this.mongoDatabase.getCollection("counters").count(searchCounters) == 0L) {
            this.createCountCollection(collection);
        }

        doc.append("_id", this.getNextSequence(collection));
        this.collection.insertOne(doc);
    }

    public int update(String collection, int id, Document updateQuery) {
        UpdateResult result = this.mongoDatabase.getCollection(collection).updateOne(Filters.eq("_id", id), new Document("$set", updateQuery));
        return (int)result.getModifiedCount();
    }

    public Object getNextSequence(String name) {
        Document searchQuery = new Document("_id", name);
        Document increase = new Document("seq", Integer.valueOf(1));
        Document updateQuery = new Document("$inc", increase);
        Document result = (Document)this.mongoDatabase.getCollection("counters").findOneAndUpdate(searchQuery, updateQuery);
        return result.get("seq");
    }

    public static Database getInstance() {
        return INSTANCE;
    }

    public MongoCollection<Document> getCollection() {
        return this.collection;
    }

    public MongoCollection<Document> getCollection(String collection) {
        this.collection = this.mongoDatabase.getCollection(collection);
        return this.collection;
    }
}
