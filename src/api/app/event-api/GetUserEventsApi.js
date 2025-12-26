import axios from "axios";
import API from "../../common/API";

const GetUserEventsApi = async (token, userId, page = 1) => {
    console.log(`📡 Fetching events for user ${userId}, page ${page}`);

    try {
        if (!token) return null;

        const response = await axios.get(
            `${API.BASE_URL}events?user_id=${userId}&page=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("User Event :: ", response.data);


        return response.data || null;
    } catch (error) {
        console.error("Unable to fetch user events", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};

export default GetUserEventsApi;
