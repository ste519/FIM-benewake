import axios from "./axios";

async function fetchData() {
    try {
        const response = await axios.get('test.json')
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export default fetchData;