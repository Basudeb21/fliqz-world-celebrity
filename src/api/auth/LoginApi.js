import axios from "axios";
import API from "../common/API";

const LoginApi = async (
    email_username,
    password
) => {
    try {
        const response = await axios.post(`${API.BASE_URL}login`, {
            email_username,
            password,
        });

        return {
            data: response.data,
            headers: response.headers,
        };
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

export default LoginApi;
