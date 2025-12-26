import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetMyTicket = async (token) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.get(
            `${API.BASE_URL}events/my-tickets`,
            {
                params: {
                    page: 1,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log(response.data);
        return response.data;

    } catch (error) {
        console.error("Unable to fetch orders - Full error:", error);

        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error status:", error.response.status);
            ToastAndroid.show(`Server error: ${error.response.status}`, ToastAndroid.SHORT);
        } else if (error.request) {
            console.error("No response received:", error.request);
            ToastAndroid.show("No response from server", ToastAndroid.SHORT);
        } else {
            console.error("Error message:", error.message);
            ToastAndroid.show("Network error", ToastAndroid.SHORT);
        }

        return null;
    }
};

export default GetMyTicket;
