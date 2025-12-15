import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetTotalFunds = async (token) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        console.log("Fetching funds from:", `${API.BASE_URL}wallet/total-funds`);

        const response = await axios.get(
            `${API.BASE_URL}wallet/total-funds`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Unable to fetch funds:", error);

        // Detailed error logging
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Error response status:", error.response.status);
            console.error("Error response data:", error.response.data);
            console.error("Error response headers:", error.response.headers);

            if (error.response.status === 401) {
                ToastAndroid.show("Unauthorized. Please login again.", ToastAndroid.SHORT);
            } else if (error.response.status === 404) {
                ToastAndroid.show("Endpoint not found. Check API URL.", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(`Server error: ${error.response.status}`, ToastAndroid.SHORT);
            }

        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received. Request:", error.request);
            ToastAndroid.show("No response from server. Check network.", ToastAndroid.SHORT);

        } else {
            // Something happened in setting up the request
            console.error("Error setting up request:", error.message);
            ToastAndroid.show("Network error: " + error.message, ToastAndroid.SHORT);
        }

        console.error("Error config:", error.config);

        return null;
    }
};

export default GetTotalFunds;