import axios from "axios";
import { backendUrl } from "../../utils/config";

async function getPlaces(lat, long) {
    try{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${backendUrl}/${lat}/${long}`,
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

export default getPlaces;