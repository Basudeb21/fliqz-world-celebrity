import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const ProductListsApi = async (token) => {
    console.log("API Called!!");

    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.get(`${API.BASE_URL}creator/products`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Products :: ", response.data);

        return response.data || null; // ✅ Return full response.data (which contains status and data)
    } catch (error) {
        console.error("Unable to fetch products", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};

export default ProductListsApi;