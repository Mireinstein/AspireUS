import { TableClient } from "@azure/data-tables";
import { BlobServiceClient } from "@azure/storage-blob";

// Helper: Convert a readable stream to a buffer.
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

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

    // If the user record has a profilePhotoUrl, download the blob content and convert to a data URI.
    if (entity.profilePhotoUrl) {
      try {
        const urlObj = new URL(entity.profilePhotoUrl);
        // Expected URL format: 
        // https://{account}.blob.core.windows.net/{container}/{blobName}/{filename}
        const pathParts = urlObj.pathname.split('/');
        // pathParts[0] is empty; pathParts[1] is the container; the rest form the blob name (including filename)
        const containerName = pathParts[1];
        const blobName = pathParts.slice(2).join('/');
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const downloadResponse = await blockBlobClient.download(0);
        const buffer = await streamToBuffer(downloadResponse.readableStreamBody);
        // Assume JPEG; you may determine content type dynamically.
        const base64Image = buffer.toString('base64');
        entity.profilePhotoUrl = `data:image/jpeg;base64,${base64Image}`;
      } catch (error) {
        console.error("Error downloading profile photo:", error);
      }
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
      meetingHistory: entity.meetingHistory, // assume stored as JSON or string
      messages: entity.messages,
      userObjectId: entity.rowKey, // Unique user id stored in rowKey
    };

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUser API:", error);
    return res.status(500).json({ error: error.message });
  }
}
