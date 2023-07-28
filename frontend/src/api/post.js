import api from "./axios";

export async function postExcelFile(file) {
    try {
        console.log({ file });
        const response = await api.post('/order/importExcel', {
            file
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        console.log("postExcelFile: ", response);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
