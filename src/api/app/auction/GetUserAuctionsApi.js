import axios from "axios";
import API from "../../common/API";

const GetUserAuctionsApi = async (token, userId, page = 1) => {
    console.log(`📡 API: Fetching auctions for user ${userId}, page ${page}`);

    try {
        if (!token) {
            console.error("Token not found");
            return null;
        }

        const response = await axios.get(
            `${API.BASE_URL}creator/auctions?user_id=${userId}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("User auctions API response:", response.data);
        return response.data || null;

    } catch (error) {
        console.error("Unable to fetch user auctions", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};

export default GetUserAuctionsApi;