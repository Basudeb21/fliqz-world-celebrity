import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetAllEventsApi = async (token, page = 1) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            console.log("No token found in storage");
            return null;
        }

        const response = await axios.get(`${API.BASE_URL}events/list?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data?.data || null;

    } catch (error) {
        console.error("Unable to fetch events...", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};

export default GetAllEventsApi;
