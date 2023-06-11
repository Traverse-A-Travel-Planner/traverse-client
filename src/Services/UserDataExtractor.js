import { Functions } from "appwrite";
import appwriteClient from "./appwriteClient";

async function userDataExtractor(data) {
  try {
    if (!data || !data.length){
      return {
        success: false,
        message: "Data not present"
      }
    }

    let userID;
    let dataType;
    
    if (typeof data === "object"){
      dataType = "object"
      userID = [data.author_id];
    }  else if (Array.isArray(data) === true) {
      dataType = "array"
      userID = data.map(item => item.author_id);
    } else {
      // Handle other data types or scenarios here
    }

    let executionResponse = []

    const functions = new Functions(appwriteClient);
    executionResponse = await functions.createExecution(
      "userDataExtractor",
      JSON.stringify({
        userId: userID,
      })
    );

    executionResponse = JSON.parse(executionResponse.response);

    if (!executionResponse.length || !executionResponse.success) {
      return {
        success: false,
        message: "Internal server error occured while fetching place details."
      }
    }

    if (dataType === "object"){
      return {
        success: true,
        data: { ...data, name: executionResponse.userDetails.users[0].name }
      }
    } else if (dataType === "array") {
      let finalData = executionResponse.userDetails.users?.map(
        (item, idx) => {
          let currentReview = data[idx];
          return { ...currentReview, name: item.name };
        }
      )

      return {
        success: true,
        data: finalData
      }
    }
  } catch (error) {
    return {
          success: false,
          message: "Something went wrong"
      }
  }
}

export default userDataExtractor;