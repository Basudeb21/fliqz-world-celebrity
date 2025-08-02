import axios from "axios";
import API from "../../common/API";

const AddNewPostApi = async (token, text, price = 0, attachments = []) => {
    try {
        const formData = new FormData();

        formData.append('text', text);
        formData.append('price', price);

        attachments.forEach((file, index) => {
            formData.append('attachments[]', {
                uri: file.uri.startsWith('file://') ? file.uri : `file://${file.uri}`,
                type: file.type || 'image/jpeg',
                name: file.name || `file_${index}.jpg`,
            });
        });

        const response = await axios.post(`${API.BASE_URL}post/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Post upload failed:', {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return { success: false, message: error.message };
    }
};

export default AddNewPostApi;
