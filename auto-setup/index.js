import {
  Client,
  Functions,
  Databases,
  Storage,
  Permission,
  Role,
} from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

const { APPWRITE_PROJECT_ID, APPWRITE_ENDPOINT, APPWRITE_API_KEY } =
  process.env;

const client = new Client();

if (!APPWRITE_API_KEY || !APPWRITE_ENDPOINT || !APPWRITE_API_KEY) {
  console.log("Please set your environment variables first.");
  process.exit(0);
}

client.setEndpoint(APPWRITE_ENDPOINT);
client.setProject(APPWRITE_PROJECT_ID);
client.setKey(APPWRITE_API_KEY);

const db = new Databases(client);
const functions = new Functions(client);
const storage = new Storage(client);

async function main() {
  try {
    console.log("Setting up resources started...");
    await setupDatabase();
    await setupStorage();
  } catch (error) {
    console.log("Setting up resources failed.");
    console.log(error);
  }
}

let databaseId = "traverse";

// database setup code
async function setupDatabase() {
  try {
    await db.create(databaseId, databaseId);

    // creating places collection

    let placeId = "places";

    console.log("Creating collection places ...");
    await db.createCollection(databaseId, placeId, placeId, [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
      Permission.create(Role.any()),
    ]);

    console.log("places collection created ...");

    console.log("Setting up attributes for places ...");

    await db.createStringAttribute(databaseId, placeId, "title", 255, true);
    await db.createStringAttribute(
      databaseId,
      placeId,
      "location_description",
      255,
      true
    );

    await Promise.all([
      db.createStringAttribute(
        databaseId,
        placeId,
        "place_description",
        10000,
        true
      ),
      db.createUrlAttribute(
        databaseId,
        placeId,
        "image",
        true,
        undefined,
        true
      ),
      db.createFloatAttribute(
        databaseId,
        placeId,
        "coordinates",
        true,
        undefined,
        undefined,
        undefined,
        true
      ),

      await db.createEnumAttribute(
        databaseId,
        placeId,
        "keyword",
        ["historic", "nature", "religious", "park", "others"],
        true,
        undefined
      ),
      db.createStringAttribute(databaseId, placeId, "author_id", 255, true),
      db.createStringAttribute(
        databaseId,
        placeId,
        "contributor_id",
        1000,
        false,
        undefined,
        true
      ),
      db.createEnumAttribute(
        databaseId,
        placeId,
        "verification_status",
        ["verified", "pending", "rejected"],
        false,
        "pending",
        false
      ),
      db.createIntegerAttribute(
        databaseId,
        placeId,
        "total_reviews",
        false,
        0,
        undefined,
        0,
        false
      ),
      db.createIntegerAttribute(
        databaseId,
        placeId,
        "average_rating",
        false,
        0,
        undefined,
        0,
        undefined
      ),
    ]);

    console.log("Attributes creation complete for places ...");

    console.log("Creating index for places ...");
    db.createIndex(
      databaseId,
      placeId,
      "index_1",
      "fulltext",
      ["author_id"],
      ["ASC"]
    );
    console.log("Index created successfully for places ...");

    console.log("====================================");

    // creating favourites collection
    let favouritesId = "favourites";

    console.log("Creating collection favourites ...");
    await db.createCollection(databaseId, favouritesId, favouritesId, [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
      Permission.create(Role.any()),
    ]);
    console.log("Collection favourites created ...");

    console.log("Creating attributes for favourites ...");

    await Promise.all([
      db.createStringAttribute(
        databaseId,
        favouritesId,
        "user_id",
        255,
        true,
        undefined,
        false
      ),
      db.createStringAttribute(
        databaseId,
        favouritesId,
        "place_id",
        255,
        true,
        undefined,
        false
      ),
    ]);

    console.log("Attributes creation complete for favourites ...");

    console.log("Creating indexes for favourites collection ...");
    await Promise.all([
      db.createIndex(
        databaseId,
        favouritesId,
        "index_1",
        "fulltext",
        ["user_id"],
        ["ASC"]
      ),
      db.createIndex(
        databaseId,
        favouritesId,
        "index_2",
        "fulltext",
        ["place_id"],
        ["ASC"]
      ),
    ]);

    console.log("Indexes created successfully for favourites ...");

    console.log("====================================");

    // creating reviews collection
    let reviewsId = "reviews";

    console.log("Creating collection reviews ...");
    await db.createCollection(databaseId, reviewsId, reviewsId, [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
      Permission.create(Role.any()),
    ]);
    console.log("Collection reviews created ...");

    console.log("Creating attributes for reviews ...");

    await Promise.all([
      db.createStringAttribute(
        databaseId,
        reviewsId,
        "place_id",
        255,
        true,
        undefined,
        false
      ),
      db.createStringAttribute(
        databaseId,
        reviewsId,
        "author_id",
        255,
        true,
        undefined,
        false
      ),
      db.createStringAttribute(
        databaseId,
        reviewsId,
        "review_description",
        5000,
        true,
        undefined,
        false
      ),
      db.createIntegerAttribute(
        databaseId,
        reviewsId,
        "rating",
        false,
        1,
        5,
        1,
        false
      ),
    ]);

    console.log("Attributes creation complete for reviews ...");

    console.log("Creating indexes for reviews collection ...");
    await Promise.all([
      db.createIndex(
        databaseId,
        reviewsId,
        "index_1",
        "fulltext",
        ["author_id"],
        ["ASC"]
      ),
      db.createIndex(
        databaseId,
        reviewsId,
        "index_2",
        "fulltext",
        ["place_id"],
        ["ASC"]
      ),
      db.createIndex(
        databaseId,
        reviewsId,
        "index_3",
        "fulltext",
        ["place_id", "author_id"],
        ["ASC", "ASC"]
      ),
    ]);

    console.log("Indexes created successfully for reivews ...");

    console.log("====================================");

    // creating collection sharedTrips
    let sharedTripsId = "sharedTrips";
    console.log("Creating collection sharedTrips ...");

    await db.createCollection(databaseId, sharedTripsId, sharedTripsId, [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
      Permission.create(Role.any()),
    ]);
    console.log("Collection sharedTrips created ...");

    console.log("Creating attributes for sharedTrips ...");

    await Promise.all([
      db.createStringAttribute(
        databaseId,
        sharedTripsId,
        "location",
        255,
        true,
        undefined,
        false
      ),
      db.createStringAttribute(
        databaseId,
        sharedTripsId,
        "message",
        1000,
        true,
        undefined,
        false
      ),
      db.createIntegerAttribute(
        databaseId,
        sharedTripsId,
        "total_proposals",
        false,
        undefined,
        undefined,
        0,
        false
      ),
      db.createStringAttribute(
        databaseId,
        sharedTripsId,
        "departure_date",
        255,
        true,
        undefined,
        false
      ),
      db.createEnumAttribute(
        databaseId,
        sharedTripsId,
        "status",
        ["active", "cancelled", "ended"],
        false,
        "active",
        false
      ),
      db.createStringAttribute(
        databaseId,
        sharedTripsId,
        "author_id",
        255,
        true,
        undefined,
        false
      ),
    ]);

    console.log("Attribute creation complete for sharedTrips ...");

    console.log("Success: Setting up database was successful.");
  } catch (error) {
    console.log("Setting up database failed.");
    await db.delete(databaseId);
    console.log(error);
  }
}

let storageId = "traverse";
async function setupStorage() {
  try {
    console.log("Creating storage bucket for traverse ...");
    await storage.createBucket(
      storageId,
      storageId,
      [
        Permission.read(Role.any()),
        Permission.update(Role.any()),
        Permission.delete(Role.any()),
        Permission.create(Role.any()),
      ],
      false,
      true,
      undefined,
      ["jpg", "png", "webp", "jpeg"],
      undefined,
      true,
      true
    );
    console.log("Successfully created bucked storage for traverse ...");
  } catch (error) {
    console.log("Error while creating storage bucket ...");
    console.log(error);
  }
}

main();
