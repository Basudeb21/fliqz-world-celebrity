import axios from "axios";
import API from "../../common/API";

const WithdrawMoneyApi = async (
    token,
    amount,
    bank_account_number,
    bank_routing_number,
    remarks
) => {
    try {

        console.log(amount);
        console.log(bank_account_number);
        console.log(bank_routing_number);
        console.log(remarks);


        const response = await axios.post(`${API.BASE_URL}withdrawals`, {
            amount,
            bank_account_number,
            bank_routing_number,
            remarks
        }, {
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

export default WithdrawMoneyApi;