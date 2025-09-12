import axios from "axios";
import API from "../../common/API";

const AddFundsApi = async ({
    token,
    amount,
    name,
    email,
    phone,
    address,
    address2,
    state,
    city,
    zipcode,
    country_id,
    remarks,
}) => {
    try {
        const body = {
            amount,
            name,
            email,
            phone,
            address,
            address2,
            state,
            city,
            zipcode,
            country_id,
            payment_id: "xyz-1234", // 🔥 static test payment_id
            remarks,
        };

        const response = await axios.post(`${API.BASE_URL}add-funds`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("AddFundsApi Error:", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });

        return {
            success: false,
            message: error?.response?.data?.message || "Unable to add funds",
        };
    }
};

export default AddFundsApi;
