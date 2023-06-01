import { Client } from "appwrite";
import { appwriteEndPoint, appwriteProjectId } from "./config";

const appwriteClient = new Client()
  .setEndpoint(appwriteEndPoint)
  .setProject(appwriteProjectId);

export default appwriteClient;
