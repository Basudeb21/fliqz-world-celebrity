import axios from "axios";
import API from "../../common/API";
import {
    ToastAndroid
} from "react-native";

const UpdateAuctionItemApi = async ({
    token,
    slug,
    name,
    description,
    min_budget,
    start_date,
    end_date,
    images = [],
}) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const url = `${API.BASE_URL}creator/auctions/${slug}`;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("min_budget", min_budget);
        formData.append("start_date", start_date);
        formData.append("end_date", end_date);

        images.forEach((img, index) => {
            if (img.uri && !img.uri.startsWith("http")) {
                const file = {
                    uri: img.uri,
                    name: img.name || `image${index}.jpg`,
                    type: img.type || "image/jpeg",
                };
                formData.append("images[]", file);
            }
        });

        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            timeout: 10000,
        });

        return response?.data;
    } catch (error) {
        console.error("UpdateAuctionItemApi Error:", error);
        ToastAndroid.show("Failed to update auction item", ToastAndroid.SHORT);
        return null;
    }
};

export default UpdateAuctionItemApi;
