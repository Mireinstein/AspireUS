import { TableClient } from "@azure/data-tables";
import { BlobServiceClient } from "@azure/storage-blob";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Extract fields from the request body.
  // profilePhotoData should be a base64-encoded string (optionally with a data URI prefix)
  const { 
    uid, 
    partition, 
    givenName, 
    surname, 
    countryRegion, 
    streetAddress, 
    bio, 
    profilePhotoData, 
    profilePhotoExtension 
  } = req.body;
  console.log("uid: ", uid);
  console.log("partition: ", partition);
    console.log("givenName: ", givenName);
    console.log("surname: ", surname);
    console.log("countryRegion: ", countryRegion);
    console.log("streetAddress: ", streetAddress);
  // Validate required fields.
  if (!uid || !partition || !givenName || !surname || !countryRegion || !streetAddress) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const tableName = process.env.AZURE_TABLE_NAME; // e.g. "UserRecords"
    const blobContainerName = process.env.AZURE_BLOB_CONTAINER_NAME; // e.g. "profilephotos"
    let profilePhotoUrl = "";

    // If a new profile photo was provided, upload it to Blob Storage.
    if (profilePhotoData) {
      // Remove data URI prefix if present.
      let base64String = profilePhotoData;
      const prefix = "base64,";
      const prefixIndex = base64String.indexOf(prefix);
      if (prefixIndex !== -1) {
        base64String = base64String.substring(prefixIndex + prefix.length);
      }
      const buffer = Buffer.from(base64String, "base64");

      // Generate a unique blob name.
      const ext = profilePhotoExtension 
        ? (profilePhotoExtension.startsWith('.') ? profilePhotoExtension : '.' + profilePhotoExtension)
        : ".jpg";
      const blobName = `${uid}-${Date.now()}${ext}`;

      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      const containerClient = blobServiceClient.getContainerClient(blobContainerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      
      // Upload the file. You might want to adjust the content type as needed.
      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: "image/jpeg" }
      });
      profilePhotoUrl = blockBlobClient.url;
    }

    // Create a TableClient instance.
    const tableClient = TableClient.fromConnectionString(connectionString, tableName);

    // Build the updated entity. Using Merge mode so that only provided fields are updated.
    const updatedEntity = {
      partitionKey: partition,  // either "student" or "tutor"
      rowKey: uid,
      givenName,
      surname,
      countryRegion,
      streetAddress,
      bio: bio || "",
      profilePhotoUrl: profilePhotoUrl || "", 
      updatedAt: new Date().toISOString()
    };

    // Update the entity in Azure Table Storage (Merge mode).
    await tableClient.updateEntity(updatedEntity, "Merge");

    return res.status(200).json({ success: true, profilePhotoUrl });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
