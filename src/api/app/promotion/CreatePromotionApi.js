import axios from "axios";
import API from "../../common/API";

const CreatePromotionApi = async ({
    token,
    content,
    position,
    total_amount,
    start_date,
    end_date
}) => {
    try {
        const response = await axios.post(`${API.BASE_URL}promotion/create`,
            {
                content,
                position,
                total_amount,
                start_date,
                end_date
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        return response.data;

    } catch (error) {
        console.error("GET Auction API Error:", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch auction",
            data: error?.response?.data
        };
    }
};

export default CreatePromotionApi;
