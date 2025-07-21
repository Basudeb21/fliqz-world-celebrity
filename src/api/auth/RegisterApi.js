import axios from "axios";
import API from "../common/API";

const RegisterApi = async (
    utype = "creator",
    referral_code,
    first_name,
    last_name,
    email,
    phone,
    password,
    confirm_password,
    country
) => {
    try {
        const response = await axios.post(`${API.BASE_URL}register`, {
            utype,
            referral_code,
            first_name,
            last_name,
            email,
            phone,
            password,
            confirm_password,
            country
        });
        return response.data;
    } catch (error) {
        console.error('Register error:', error.response?.data || error.message);
        throw error;
    }
}

export default RegisterApi;