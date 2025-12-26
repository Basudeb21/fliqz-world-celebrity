import axios from "axios";
import API from "../../common/API";
const SubscribersApi = async (token) => {
    try {
        const response = await axios.post(
            `${API.BASE_URL}subscribers`, // Adjust this endpoint if different
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Subscribers API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Subscribers API Error:", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch subscribers",
            data: null
        };
    }
};
export default SubscribersApi;