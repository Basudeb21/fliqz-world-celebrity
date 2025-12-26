import axios from "axios";
import API from "../../common/API";

const CollabListApi = async (token, page = 1) => {
    try {
        console.log("Token :: ");

        const response = await axios.post(
            `${API.BASE_URL}collaboration?page=${page}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Collabs :: ", response.data);

        return response.data;

    } catch (error) {
        console.error("GET Collaboration API Error:", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to fetch collaborations",
            data: null
        };
    }
};
export default CollabListApi;
