import axios from "axios";
import API from "../../common/API";

const GetPromotionSettingsApi = async ({ token }) => {
    try {
        const response = await axios.get(`${API.BASE_URL}promotion/settings`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("Promotion Settings Response:", response.data);

        return response.data;
    } catch (error) {
        console.error("GET Promotion Settings API Error:", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch promotion settings",
            data: error?.response?.data,
        };
    }
};

export default GetPromotionSettingsApi;
