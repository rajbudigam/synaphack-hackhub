import { NextResponse } from "next/server";
// import { BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob";

export async function GET() {
  // Azure Storage disabled - replace with your preferred file upload solution
  // const account = process.env.AZURE_STORAGE_ACCOUNT!;
  // const key = process.env.AZURE_STORAGE_KEY!;
  // const container = process.env.AZURE_STORAGE_CONTAINER!;

  // const creds = new StorageSharedKeyCredential(account, key);
  // const expiresOn = new Date(Date.now() + 10 * 60 * 1000);

  // const sas = generateBlobSASQueryParameters({
  //   containerName: container,
  //   permissions: BlobSASPermissions.parse("cwt"), // create, write, list
  //   expiresOn
  // }, creds).toString();

  // return NextResponse.json({ url: `https://${account}.blob.core.windows.net/${container}`, sas });
  
  return NextResponse.json({ 
    error: "File upload service not configured. Please set up your preferred file upload solution." 
  }, { status: 501 });
}
