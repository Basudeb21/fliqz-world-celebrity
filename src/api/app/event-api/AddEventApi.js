import axios from "axios";
import API from "../../common/API";

const AddEventApi = async (token, title, description, location, price, start_time, end_time, quantity_total) => {
    try {

        const response = await axios.post(`${API.BASE_URL}events`, {
            title,
            description,
            location,
            price,
            start_time,
            end_time,
            quantity_total
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })


        return response.data;

    } catch (error) {
        console.error("Unable to add store", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        })
    }
}

export default AddEventApi;