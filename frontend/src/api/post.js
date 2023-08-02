import api from "./axios";

//导入excel
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

//新建视图
export async function postView({ tableId, viewName, cols, viewId}) {
    try {
        const response = await api.post('/order/saveView', {
            tableId, viewName, cols, viewId
        })
        console.log("postView: ", response);
        return response.data;
    }
    catch (err) {
        console.log(err);
    }
}
