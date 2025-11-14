import axios from "axios";
import API from "../../common/API";

const SendMessageApi = async ({ token, id, message }) => {
    try {
        const response = await axios.post(
            `${API.BASE_URL}message/@${id}/send-message`,
            { message },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("CHAT SEND CURRENT RESPONSE:", response.data);
        return response.data;

    } catch (error) {
        console.error("SEND MESSAGE API Error:", error?.response?.data || error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to send message",
            data: error?.response?.data,
        };
    }
};

export default SendMessageApi;
