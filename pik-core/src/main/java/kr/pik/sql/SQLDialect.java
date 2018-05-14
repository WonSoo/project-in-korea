package kr.pik.sql;

import java.util.Iterator;

import org.bson.Document;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import kr.pik.utils.database.Database;

public class SQLDialect {
	private String collectionName;
	private MongoCollection<Document> collection;
	private MongoCollection<Document> countCollection;
	
	public SQLDialect(String collectionName) {
		this.collectionName = collectionName;
		collection = Database.getInstance().getCollection(collectionName);
		countCollection = Database.getInstance().getCollection("Counters");
	}
	
    public Object getNextSequence() {
        Document searchQuery = new Document("_id", collectionName);
        Document increase = new Document("seq", Integer.valueOf(1));
        Document updateQuery = new Document("$inc", increase);
        Document result = (Document)countCollection.findOneAndUpdate(searchQuery, updateQuery);
        return result.get("seq");
    }

    private void createCountCollection() {
        Document insertDoc = new Document();
        insertDoc.append("_id", collectionName);
        insertDoc.append("seq", Integer.valueOf(0));
        countCollection.insertOne(insertDoc);
    }
    
    private void updateId(Document doc) {
        Document searchCounters = (new Document()).append("_id", collectionName);
        if (countCollection.count(searchCounters) == 0L) {
            createCountCollection();
        }

        doc.append("_id", this.getNextSequence());
    }
	
	public void insert(Document document) {
		updateId(document);
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
	
	public Iterator<Document> find() {
		MongoCursor<Document> iterator = collection.find().iterator();
		return iterator;
	}
	
	public Iterator<Document> find(Document searchKey) {
		MongoCursor<Document> iterator = collection.find(searchKey).iterator();
		return iterator;
	}
	
	public Iterator<Document> find(Document searchKey, int lastIndex, int limit) {
		MongoCursor<Document> iterator = collection.find(searchKey).skip(lastIndex).limit(limit).iterator();
		return iterator;
	}
}
