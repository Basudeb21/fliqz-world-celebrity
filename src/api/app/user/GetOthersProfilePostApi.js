import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetOthersProfilePostApi = async (token, username, page = 1) => {
    console.log("*********");
    console.log("API Token : ", token);
    console.log("username : ", username);

    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(
            `${API.BASE_URL}other-post/@${username}?page=${page}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("API TEST DATA : ", response.data);

        return response.data.data;
    } catch (error) {
        console.error("Unable to fetch posts", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};

export default GetOthersProfilePostApi;
