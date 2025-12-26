import axios from "axios";
import API from "../../common/API";
import {
    ToastAndroid
} from "react-native";

const AddNewStory = async (token,) => {
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

export default AddNewStory;

