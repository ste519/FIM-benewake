import api from "./axios";

export async function fetchNewPresets({ tableId }) {
    console.log(tableId);
    try {
        const response = await api.get('/order/views', { params: { "tableId": tableId } })
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}

export async function fetchData({ tableId, viewId, filterCriterias }) {
    try {
        const response = await api.post('/order/Lists',
            { tableId, viewId, filterCriterias }
        )
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
