import axios from "axios";
import API from "../../common/API";

const RewardFollowers = async (token) => {
    try {
        if (!token) {
            return { success: false, message: "Token not found." };
        }

        const response = await axios.post(
            `${API.BASE_URL}reward/follower`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Create list error:", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });

        return {
            success: false,
            message:
                error?.response?.data?.message ||
                "Failed to create list. Try again.",
        };
    }
};

export default RewardFollowers;
