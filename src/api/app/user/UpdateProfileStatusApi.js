import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const UpdateProfileStatusApi = async (
    {
        token,
        status
    }
) => {
    try {



        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(`${API.BASE_URL}change-status`,
            {
                status
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log(response.data);


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


export default UpdateProfileStatusApi;
