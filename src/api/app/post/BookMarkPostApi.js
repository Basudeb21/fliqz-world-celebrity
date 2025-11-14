import axios from "axios";
import API from "../../common/API";

const BookMarkPostApi = async (
    token,
    post_no
) => {
    try {

        const response = await axios.post(`${API.BASE_URL}post/${post_no}/bookmark`, {}, {
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

export default BookMarkPostApi;