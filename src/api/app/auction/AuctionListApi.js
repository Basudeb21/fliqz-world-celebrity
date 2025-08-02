import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const AuctionListApi = async (token, page = 1) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.get(`${API.BASE_URL}auctions?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data || null;
    } catch (error) {
        console.error("Unable to fetch auctions", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};



export default AuctionListApi;
