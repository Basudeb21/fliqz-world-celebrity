import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const GetUserProductsApi = async (token, userId) => {
    console.log(`📡 Fetching products for user ${userId}`);

    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.get(
            `${API.BASE_URL}creator/products?user_id=${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("User products response:", response.data);
        return response.data || null;

    } catch (error) {
        console.error("Unable to fetch user products", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};

export default GetUserProductsApi;