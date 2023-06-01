import axios from "axios";
import { backendUrl } from "../../utils/config";

async function getProfileDetails() {
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${backendUrl}/profile/details`,
            headers: { 
              'Content-Type': 'application/json',
              'authorization': "Bearer " + localStorage.getItem("token")
            },
        };
        
        const res = await axios.request(config);
        return res.data
    } catch(error){
        console.log(error)
    }
}

export default getProfileDetails;