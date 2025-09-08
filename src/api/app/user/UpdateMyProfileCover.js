import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const UpdateMyProfileCover = async (
    { token,
        data
    }
) => {
    try {



        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(`${API.BASE_URL}update-profile-cover`,
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
        console.error("Unable to fetch posts", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};


export default UpdateMyProfileCover;
