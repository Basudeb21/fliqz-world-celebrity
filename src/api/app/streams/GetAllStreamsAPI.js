import axios from "axios";
import API from "../../common/API";

const GetAllStreamsAPI = async () => {
    try {
        const response = await axios.get(`${API.BASE_URL_NODE}streams`);
        return response.data || null;

    } catch (error) {
        console.error("Unable to fetch events...", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};


export default GetAllStreamsAPI;

