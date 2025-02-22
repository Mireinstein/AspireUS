import { TableClient } from "@azure/data-tables";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { uid, role } = req.query;
  if (!uid) {
    return res.status(400).json({ error: "Missing uid parameter" });
  }

  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const tableName = process.env.AZURE_TABLE_NAME; // e.g., "UserRecords"
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    let entity = null;
    // If role is provided, use it as the PartitionKey.
    if (role) {
      try {
        entity = await tableClient.getEntity(role, uid);
      } catch (err) {
        if (err.statusCode !== 404) {
          console.error("Error fetching entity:", err);
          return res.status(500).json({ error: err.message });
        }
      }
    } else {
      // If no role is provided, try "student" then "tutor"
      try {
        entity = await tableClient.getEntity("student", uid);
      } catch (err) {
        if (err.statusCode !== 404) {
          console.error("Error fetching student entity:", err);
          return res.status(500).json({ error: err.message });
        }
      }
      if (!entity) {
        try {
          entity = await tableClient.getEntity("tutor", uid);
        } catch (err) {
          if (err.statusCode !== 404) {
            console.error("Error fetching tutor entity:", err);
            return res.status(500).json({ error: err.message });
          }
        }
      }
    }

    if (!entity) {
      return res.status(404).json({ error: "User not found" });
    }

    // Build a trimmed user object with only the desired attributes.
    const user = {
      givenName: entity.givenName,
      surname: entity.surname,
      streetAddress: entity.streetAddress,
      email: entity.email,
      city: entity.city,
      countryRegion: entity.countryRegion,
      bio: entity.bio,
      profilePhotoUrl: entity.profilePhotoUrl,
      meetingHistory: entity.meetingHistory, // Assume this is stored as JSON already
      messages: entity.messages,
      userObjectId: entity.rowKey, // Unique user id stored in rowKey
    };

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUser API:", error);
    return res.status(500).json({ error: error.message });
  }
}
