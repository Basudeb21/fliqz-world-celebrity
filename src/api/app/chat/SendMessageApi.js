import axios from "axios";
import API from "../../common/API";

const SendMessageApi = async ({ token, id, message }) => {
    try {
        const formData = new FormData();
        formData.append("message", message);

        const response = await axios.post(
            `${API.BASE_URL}message/${id}/send-message`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log("CHAT SEND CURRENT RESPONSE: ", response.data.data);
        return response.data;

    } catch (error) {
        console.error("SEND MESSAGE API Error:", error?.response?.data || error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to send message",
            data: error?.response?.data
        };
    }
};

export default SendMessageApi;
