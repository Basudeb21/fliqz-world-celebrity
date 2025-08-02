import axios from "axios";
import API from "../../common/API";

const UpdateCommentApi = async (token, post_no, comment_no, message) => {
    try {

        const response = await axios.post(`${API.BASE_URL}post/${post_no}/comment/${comment_no}/update`, {
            message
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data;

    } catch (error) {
        console.error("Unable to react the post", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        })
    }
}

export default UpdateCommentApi;

