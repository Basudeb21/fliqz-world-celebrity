import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const AllProductsApi = async (token) => {
    console.log("✅ API Called!!")

    try {
        if (!token) {
            console.log("❌ Token missing")
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT)
            return null
        }

        console.log("📡 Hitting URL:", `${API.BASE_URL}creator/products`)

        const response = await axios.get(
            `${API.BASE_URL}creator/products`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        console.log("✅ Products Response:", response.data)
        return response.data

    } catch (error) {
        console.error("🔥 API ERROR:", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        })
        return null
    }
}

export default AllProductsApi
