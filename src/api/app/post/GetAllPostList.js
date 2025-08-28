import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetAllPostsApi = async (
    token,
    page = 1
) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(
            `${API.BASE_URL}post?page=${page}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data || null;
    } catch (error) {
        console.error("Unable to fetch posts", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};


export default GetAllPostsApi;
