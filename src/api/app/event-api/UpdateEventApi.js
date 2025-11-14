import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const UpdateEventApi = async (
    token,
    id,
    title,
    description,
    location,
    price,
    start_time,
    end_time,
    quantity_total
) => {
    try {

        if (!token || token === "undefined" || token.trim() === "") {
            console.log("Invalid token: ", token);
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }


        const response = await axios.put(`${API.BASE_URL}events/${id}`, {
            title,
            description,
            location,
            price,
            start_time,
            end_time,
            quantity_total
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        return response?.data;
    } catch (error) {
        console.error("UpdateAuctionItemApi Error:", error);
        ToastAndroid.show("Failed to update auction item", ToastAndroid.SHORT);
        return null;
    }
};

export default UpdateEventApi;
