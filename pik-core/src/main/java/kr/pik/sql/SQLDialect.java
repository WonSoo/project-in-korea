package kr.pik.sql;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;

import io.vertx.core.json.JsonObject;
import kr.pik.utils.database.Database;

public class SQLDialect {
	private MongoCollection<Document> collection;

	public SQLDialect(String collectionName) {
		collection = Database.getInstance().getCollection(collectionName);
	}

	public void findOneAndUpdate(Document filter, Document update) {
		collection.updateOne(filter, new Document("$set", update));
	}

	public void insert(JsonObject document) {
		this.insert(Document.parse(document.toString()));
	}

	public void insert(Document document) {
		collection.insertOne(document);
	}

	public void delete(Document searchKey) {
		DeleteResult result = collection.deleteOne(searchKey);
		System.out.println(result);
	}

	public void update(Document searchKey, Document document) {
		findOneAndUpdate(searchKey, document);
	}
	
	private void updateHexStringToObjectID(Document src) {
		if (src != null && src.getString("id") != null && !src.getString("id").equals("")) {
			src.put("_id", new ObjectId(src.getString("id")));
			src.remove("id");
		}
	}

	private void updateObjectIDToHexString(Document src) {
		if (src != null) {
			src.put("id", src.getObjectId("_id").toHexString());
			src.remove("_id");
		}
	}

	public Document findOne() {
		Document result = collection.find().first();
		updateObjectIDToHexString(result);
		return result;
	}

	public Document findOne(Document searchKey) {
		updateHexStringToObjectID(searchKey);
		Document result = collection.find(searchKey).first();
		updateObjectIDToHexString(result);
		return result;
	}

	public Document findOne(JsonObject doc) {
		return findOne(Document.parse(doc.toString()));
	}

	public ArrayList<Document> find() {
		return find(null);
	}

	public long count(Document searchKey) {
		return collection.count(searchKey);
	}

	public ArrayList<Document> find(Document searchKey) {
		return this.find(searchKey, -1, -1);
	}

	public ArrayList<Document> find(Document searchKey, int lastIndex, int limit) {
		FindIterable<Document> findIterable = null;

		if (searchKey != null) {
			updateHexStringToObjectID(searchKey);
			findIterable = collection.find(searchKey);
		}
		else {
			findIterable = collection.find();
		}

		if (lastIndex != -1)
			findIterable.skip(lastIndex);
		if (limit != -1)
			findIterable.limit(limit);

		MongoCursor<Document> iterator = findIterable.iterator();

		ArrayList<Document> result = new ArrayList<Document>();
		while (iterator.hasNext()) {
			Document doc = iterator.next();
			updateObjectIDToHexString(doc);
			System.out.println(doc);
			result.add(doc);
		}

		return result;
	}
}
