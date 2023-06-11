import { Functions } from "appwrite";
import appwriteClient from "./appwriteClient";

async function userDataExtractor(data) {
  try {
    if (data.length <= 0 || Object.keys(data).length <= 0){
      return {
        success: false,
        message: "Data not present"
      }
    }

    let userID;
    let dataType = "";

    if (data.author_id){
      dataType = "object"
      userID = [data.author_id];
    } else {
      dataType = "array"
      userID = data.map(item => item.author_id);
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

    if (!executionResponse || !executionResponse.success) {
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