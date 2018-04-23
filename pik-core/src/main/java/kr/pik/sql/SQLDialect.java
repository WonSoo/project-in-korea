package kr.pik.sql;

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import kr.pik.utils.database.Database;

public class SQLDialect {
	private MongoCollection<Document> collection;
	
	public SQLDialect(String collectionName) {
		collection = Database.getInstance().getCollection(collectionName);
	}
	
	public void insert(Document document) {
		collection.insertOne(document);
	}
	
	public void delete(Document searchKey) {
		DeleteResult result = collection.deleteOne(searchKey);
		System.out.println(result);
	}
	
	public void update(Document searchKey, Document document) {
		UpdateResult result = collection.updateOne(searchKey, document);
		System.out.println(result);
	}
	
	public MongoCursor<Document> find() {
		MongoCursor<Document> iterator = collection.find().iterator();
		return iterator;
	}
	
	public MongoCursor<Document> find(Document searchKey) {
		MongoCursor<Document> iterator = collection.find(searchKey).iterator();
		return iterator;
	}
	
	public MongoCursor<Document> find(Document searchKey, int lastIndex, int limit) {
		MongoCursor<Document> iterator = collection.find(searchKey).skip(lastIndex).limit(limit).iterator();
		return iterator;
	}
}
