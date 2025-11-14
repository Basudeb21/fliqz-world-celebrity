import axios from "axios";
import API from "../../common/API";

const AllTransactionListApi = async (
    token,
) => {
    try {

        const response = await axios.post(`${API.BASE_URL}transactions`, {}, {
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

export default AllTransactionListApi;