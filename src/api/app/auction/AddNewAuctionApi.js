import axios from "axios";
import API from "../../common/API";

const AddNewAuctionApi = async ({ token, name, description, min_budget, start_date, end_date, images }) => {
    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("min_budget", min_budget);
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);

        images.forEach((file, index) => {
            formData.append('images[]', {
                uri: file.uri.startsWith('file://') ? file.uri : `file://${file.uri}`,
                type: file.type || 'image/jpeg',
                name: file.name || `file_${index}.jpg`,
            });
        });

        const response = await axios.post(`${API.BASE_URL}creator/auctions`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;

    } catch (error) {
        console.error("API Error Details:", {
            message: error.message,
            code: error.code,
            status: error?.response?.status,
            data: error?.response?.data,
            config: error?.config,
            stack: error.stack
        });

        return {
            success: false,
            message: error?.response?.data?.message ||
                (error.message === 'Network Error' ?
                    'Network connection failed. Please check your internet.' :
                    'Something went wrong. Please try again.'),
            data: error?.response?.data
        };
    }
};

export default AddNewAuctionApi;