import axios from "axios";
import API from "../../common/API";

const GetAuctionItemApi = async ({
    token,
    slug
}) => {
    try {
        const response = await axios.get(`${API.BASE_URL}creator/auctions/${slug}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

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

export default GetAuctionItemApi;
