import axios from "axios";
import API from "../../common/API";

const CollabDetailsApi = async ({
    token
}) => {
    try {
        const response = await axios.post(`${API.BASE_URL}message`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return response.data;

    } catch (error) {
        console.error("GET Auction API Error:", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch auction",
            data: error?.response?.data
        };
    }
};

export default CollabDetailsApi;
