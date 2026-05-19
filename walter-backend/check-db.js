import mongoose from "mongoose";
import { ENV } from "./src/lib/env.js";

if (!ENV.MONGO_URI) {
  console.error("MONGO_URI is not set");
  process.exit(1);
}

try {
  await mongoose.connect(ENV.MONGO_URI);
  console.log("Connected to MongoDB");

  const dbName = mongoose.connection.db.databaseName;
  console.log(`\nDatabase: ${dbName}`);

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(`\nCollections (${collections.length}):`);
  collections.forEach((col) => console.log(`  - ${col.name}`));

  console.log("\nDocument Counts:");
  for (const col of collections) {
    const count = await mongoose.connection.db.collection(col.name).countDocuments();
    console.log(`  - ${col.name}: ${count} documents`);
  }

  console.log("\nDatabase check complete.");
} finally {
  await mongoose.disconnect();
}
