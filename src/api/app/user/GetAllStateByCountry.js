import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetAllStateByCountry = async (token, country_name) => {
    try {

        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }


        const response = await axios.post(
            `${API.BASE_URL}state?country=${country_name}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(`State of ${country_name} -> `, response.data);

        return response.data || null;
    } catch (error) {
        console.error("Unable to fetch countries - Full error:", error);

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
export default GetAllStateByCountry;