import axios from "axios";
import API from "../../common/API";

const EventTicketBookingPriceApi = async (token, event_id, quantity) => {
    try {

        const response = await axios.post(`${API.BASE_URL}events/book-an-event`, {
            event_id,
            quantity
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

export default EventTicketBookingPriceApi;