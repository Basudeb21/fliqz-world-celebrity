import axios from "axios";
import API from "../../common/API";

const DeleteCommentApi = async (token, post_no, comment_no) => {
    try {

        const response = await axios.post(`${API.BASE_URL}post/${post_no}/comment/${comment_no}/delete`, {}, {
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

export default DeleteCommentApi;