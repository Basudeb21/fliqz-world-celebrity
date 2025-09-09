import axios from "axios";
import API from "../../common/API";

const DeletePostApi = async (
    token,
    id,
) => {
    try {
        console.log(`${API.BASE_URL}post/${id}/delete`);

        const response = await axios.post(`${API.BASE_URL}post/${id}/delete`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
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

export default DeletePostApi;