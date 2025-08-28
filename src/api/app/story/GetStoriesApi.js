import axios from "axios";
import API from "../../common/API";
import {
    ToastAndroid
} from "react-native";

const GetStoriesApi = async (token,) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(`${API.BASE_URL}story`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("Story: ", response.data.data);


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

export default GetStoriesApi
    ;
