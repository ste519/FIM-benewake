import axios from "./axios";

async function fetchOptions() {
    try {
        const response = await axios.get('options.json')
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export default fetchOptions;