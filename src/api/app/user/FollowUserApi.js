import axios from "axios";
import API from "../../common/API";

const FollowUserApi = async (token, user_id) => {
    try {

        const url = `${API.BASE_URL}list/${user_id}/follow`;
        console.log("📌 FOLLOW API URL:", url);

        const response = await axios.post(
            url,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        console.log("FOLLOW RESPONSE:", response.data);
        return response.data;

    } catch (error) {
        console.log("🔥 FOLLOW ERROR FULL:", JSON.stringify(error?.response?.data, null, 2));
        console.log("🔥 STATUS:", error?.response?.status);
        console.log("🔥 HEADERS:", error?.response?.headers);
        return null;
    }
};

export default FollowUserApi;
