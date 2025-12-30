import axios from "axios";
import API from "../../common/API";

const GetAllCartItem = async (token) => {
    if (!token) {
        return { success: false, message: "Token missing" };
    }

    try {
        const response = await axios.get(
            `${API.BASE_URL}cart`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Cart item -> ", response.data.data);


        return {
            success: true,
            data: response.data?.data || [],
        };
    } catch (error) {
        let message = "Network error";

        if (error.response) {
            message = error.response.data?.message || "Server error";
        }

        return { success: false, message };
    }
};

export default GetAllCartItem;
