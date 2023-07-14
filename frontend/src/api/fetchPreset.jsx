import axios from "./axios";

async function fetchPreset(uid) {
    try {
        const response = await axios.get('mypreset.json')
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export default fetchPreset;