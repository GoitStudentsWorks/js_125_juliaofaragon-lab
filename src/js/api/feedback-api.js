import { request } from "./http";
import axios from 'axios';
axios.defaults.baseURL = 'https://furniture-store-v2.b.goit.study/api';


export async function getFeedbacks() {
    try {
        const data = await request('/feedbacks', { params: { limit: 10 } });
        return data.feedbacks;
        
    } catch (error) {
        console.error('Error fetching feedbacks:', error);
    }
};