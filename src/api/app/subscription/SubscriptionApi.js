import axios from "axios";
import API from "../../common/API";

const SubscriptionApi = async (token) => {
    try {
        const response = await axios.post(
            `${API.BASE_URL}subscription`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Subscription API Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Subscription API Error:", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch subscriptions",
            data: null
        };
    }
};

export default SubscriptionApi;