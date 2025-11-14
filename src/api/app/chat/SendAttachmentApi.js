import axios from "axios";
import API from "../../common/API";

const SendAttachmentApi = async ({ token, id, file }) => {
    try {
        const formData = new FormData();

        // Some APIs require message field even for attachments
        formData.append("message", " "); // Space instead of empty string

        // Append the file with the correct field name
        // Try different field names that your backend might expect
        formData.append("attachment", {
            uri: file.uri,
            type: file.type || "image/jpeg",
            name: file.fileName || `upload_${Date.now()}.jpg`,
        });

        // Also try appending with different field names
        formData.append("file", {
            uri: file.uri,
            type: file.type || "image/jpeg",
            name: file.fileName || `upload_${Date.now()}.jpg`,
        });

        // Try with image field name as well
        formData.append("image", {
            uri: file.uri,
            type: file.type || "image/jpeg",
            name: file.fileName || `upload_${Date.now()}.jpg`,
        });

        console.log("Sending attachment with formData:", {
            uri: file.uri,
            type: file.type,
            name: file.fileName
        });

        const response = await axios.post(
            `${API.BASE_URL}message/@${id}/send-message`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", // Add this header
                },
                timeout: 30000,
            }
        );

        console.log("SendAttachmentApi Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("SendAttachmentApi Error Details:", {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers,
        });

        return {
            success: false,
            message: error.response?.data?.message || "Image upload failed",
            error: error.response?.data
        };
    }
};

export default SendAttachmentApi;