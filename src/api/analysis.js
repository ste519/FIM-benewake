import axios from "./axios";

export async function fetchAnalysisData(url, params) {
    try {
        const response = await axios.get(`/past-analysis/${url}`, { params: params })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
