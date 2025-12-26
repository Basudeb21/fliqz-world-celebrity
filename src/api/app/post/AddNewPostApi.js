import axios from "axios";
import API from "../../common/API";

const AddNewPostApi = async (
    token,
    text,
    price = 0,
    attachments = [],
    poll = [],
    quiz = [],
    postWithStory = false,
    access_type = "public"
) => {
    try {
        const formData = new FormData();

        formData.append('price', price);
        formData.append('post_with_story', postWithStory);
        formData.append('access_type', access_type);

        if (poll?.question && poll?.answers?.length > 0) {
            formData.append("text", poll.question);
            poll.answers.forEach((answer, index) => {
                formData.append(`poll[${index}]`, answer);
            });
        }

        else if (quiz?.question && quiz?.answers?.length > 0) {
            formData.append("text", quiz.question);
            quiz.answers.forEach((answer, index) => {
                formData.append(`quiz[${index}]`, answer);
            });
        }

        else {
            formData.append('text', text);
        }

        attachments.forEach((file, index) => {
            formData.append('attachments[]', {
                uri: file.uri.startsWith('file://') ? file.uri : `file://${file.uri}`,
                type: file.type || 'image/jpeg',
                name: file.name || `file_${index}.jpg`,
            });
        });

        const response = await axios.post(`${API.BASE_URL}post/add`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Post upload failed:', {
            message: error.message,
            status: error?.response?.status,
            data: error?.response?.data,
        });
        return { success: false, message: error.message };
    }
};


export default AddNewPostApi;