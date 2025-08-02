import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const AddNewProductApi = async (
    token,
    name,
    description,
    price,
    quantity,
    sizes,
    colors,
    type,
    thumbnails
) => {
    try {
        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("type", type);

        sizes.forEach((size) => formData.append("sizes[]", size));
        colors.forEach((color) => formData.append("colors[]", color));

        thumbnails.forEach((file, index) => {
            formData.append("thumbnail[]", {
                uri: file.uri,
                name: file.name || `image_${index}.jpg`,
                type: file.type || "image/jpeg"
            });
        });

        console.log("Sending Product Data:");
        console.log({
            name,
            description,
            price,
            quantity,
            type,
            sizes,
            colors,
            thumbnails: thumbnails.map((file, i) => ({
                name: file.name || `image_${i}.jpg`,
                uri: file.uri,
                type: file.type || "image/jpeg"
            }))
        });

        const response = await axios.post(`${API.BASE_URL}creator/products`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response?.data;
    } catch (error) {
        console.error("API Error:", error?.response?.data || error.message);
        ToastAndroid.show("Failed to create product", ToastAndroid.SHORT);
        return null;
    }
};

export default AddNewProductApi;
