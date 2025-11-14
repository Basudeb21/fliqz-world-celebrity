import axios from "axios";
import API from "../../common/API";

const DeleteAddressApi = async ({ token, id }) => {
    try {
        const response = await axios.post(
            `${API.BASE_URL}address/${id}/delete`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
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

export default DeleteAddressApi;