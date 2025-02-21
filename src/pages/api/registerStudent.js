import { TableClient } from "@azure/data-tables";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  const { givenName, surname, streetAddress, email, city, countryRegion, userObjectId, profilePhotoUrl } = req.body;

  // Basic validation: ensure required fields are present.
  if (!givenName || !surname || !email || !userObjectId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Use the same connection string and table name for both students and tutors.
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const tableName = process.env.AZURE_TABLE_NAME; // e.g., "UserRecords"

    // Create a TableClient instance.
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    // PartitionKey for students is "student"
    let existingEntity = null;
    try {
      existingEntity = await tableClient.getEntity("student", userObjectId);
    } catch (err) {
      if (err.statusCode !== 404) {
        throw err;
      }
    }

    if (existingEntity) {
      return res.status(200).json({ success: true, message: "User already exists" });
    }

    // Build a new student record.
    const newEntity = {
      partitionKey: "student",
      rowKey: userObjectId,
      givenName,
      surname,
      streetAddress,
      email,
      city,
      countryRegion,
      profilePhotoUrl: profilePhotoUrl || "", // URL from Blob Storage if available.
      createdAt: new Date().toISOString()
    };

    // Insert the new entity into the table.
    await tableClient.createEntity(newEntity);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in registerStudent:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
