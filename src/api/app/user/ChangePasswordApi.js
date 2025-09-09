import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const ChangePasswordApi = async (
    token,
    current_password,
    new_password,
    confirm_password
) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(`${API.BASE_URL}change-password`,
            {
                current_password,
                new_password,
                confirm_password
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Unable to fetch posts", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};


export default ChangePasswordApi;
