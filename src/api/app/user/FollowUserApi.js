import axios from "axios";
import API from "../../common/API";

const FollowUserApi = async (token, user_id) => {
    try {

        const response = await axios.post(`${API.BASE_URL}list/${user_id}/follow`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        console.log(response.data);

        return response.data;

    } catch (error) {
        console.error("Unable to react the post", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        })
    }
}

export default FollowUserApi;