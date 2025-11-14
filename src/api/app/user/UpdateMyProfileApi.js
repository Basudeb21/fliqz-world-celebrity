import axios from "axios";
import API from "../../common/API";
import { ToastAndroid } from "react-native";

const UpdateMyProfileApi = async (
    { token,
        first_name,
        last_name,
        email,
        username,
        phone,
        bio,
        birthdate,
        gender_id,
        country_id,
        location,
        state,
        city,
        zipcode,
        address,
        website,
        x_account,
        google_account,
        facebook_account,
        instagram_account,
        tiktok_account }
) => {
    try {



        if (!token) {
            ToastAndroid.show("Token not found...", ToastAndroid.SHORT);
            return null;
        }

        const response = await axios.post(`${API.BASE_URL}update-profile`,
            {
                first_name,
                last_name,
                email,
                username,
                phone,
                bio,
                birthdate,
                gender_id,
                country_id,
                location,
                state,
                city,
                zipcode,
                address,
                website,
                x_account,
                google_account,
                facebook_account,
                instagram_account,
                tiktok_account
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data || null;
    } catch (error) {
        console.error("Unable to fetch posts", {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return null;
    }
};


export default UpdateMyProfileApi;
