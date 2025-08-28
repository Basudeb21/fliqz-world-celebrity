import axios from "axios";
import API from "../../common/API";

const BidOnItemApi = async (
    token,
    slug,
    bid_amount
) => {
    try {
        const response = await axios.post(`${API.BASE_URL}auctions/${slug}/bid`, {
            bid_amount
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Post upload failed:', {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });

        return {
            success: false,
            data: error?.response?.data || {},
            message: error?.response?.data?.message || error.message,
        };
    }
};


export default BidOnItemApi;
