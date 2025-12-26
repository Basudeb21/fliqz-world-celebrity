import axios from 'axios';
import API from "../../common/API";


const GetCrowdFundingApi = async ({ token, userId }) => {

    try {
        const response = await axios.post(
            `${API.BASE_URL}crowdfunding/all-by-user/${userId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Crowdfunding API Error:', error);
        throw error;
    }
};

export default GetCrowdFundingApi;