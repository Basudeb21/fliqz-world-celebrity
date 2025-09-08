import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const UpdateMyProfilePic = async ({ token, data }) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(
            `${API.BASE_URL}update-profile-avatar`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data || null;
    } catch (error) {
        console.error("Unable to update avatar", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};


export default UpdateMyProfilePic;
