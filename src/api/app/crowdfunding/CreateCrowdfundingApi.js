import axios from 'axios';
import API from '../../common/API';
import moment from 'moment';

const CreateCrowdfundingApi = async ({
    token,
    title,
    description,
    goal_amount,
    deadline,
    content,
    attachment,
}) => {
    try {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('goal_amount', String(goal_amount));
        formData.append('deadline', moment(deadline).format('YYYY-MM-DD'));
        formData.append('content', content);

        if (Array.isArray(attachment) && attachment.length > 0) {
            const img = attachment[0];

            formData.append('attachment', {
                uri: img.uri.startsWith('file://') ? img.uri : `file://${img.uri}`,
                type: img.type || 'image/jpeg',
                name: img.fileName || img.name || 'cover.jpg',
            });
        }

        const response = await axios.post(
            `${API.BASE_URL}crowdfunding/add`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // ✅ ADD THIS
                    Accept: 'application/json',
                },
                timeout: 20000,
            }
        );

        return response.data;

    } catch (error) {
        if (error.response) {
            console.log('❌ SERVER ERROR:', error.response.data);
        } else if (error.request) {
            console.log('❌ NO RESPONSE (Network):', error.request);
        } else {
            console.log('❌ SETUP ERROR:', error.message);
        }
        throw error;
    }
};

export default CreateCrowdfundingApi;