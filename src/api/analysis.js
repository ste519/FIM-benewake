import axios from "./axios";

export async function fetchAnalysisData(url) {
    try {
        const response = await axios.get(`/past-analysis/${url}`)
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
