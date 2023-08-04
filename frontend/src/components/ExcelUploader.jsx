import { useState } from 'react';
import { postExcelFile } from '../api/post';

function getAlertInfo(code, message) {
    switch (code) {
        case 400:
            return { type: "error", message: message }
        case 200:
            //TODO
            break
        default:
            throw new Error("Unknown status")
    }
}


export default function ExcelUploader({ close, updateAlert }) {
    const [file, setFile] = useState(null);


    const handleFile = (event) => {
        setFile(event.target.files[0])
    };

    const addData = async () => {
        if (!file)
            updateAlert({
                type: "SHOW_ALERT", data: {
                    type: "warning", message: "未选择文件！"
                }
            })
        else {
            const res = await postExcelFile(file)
            const alertInfo = getAlertInfo(res.code, res.message)
            updateAlert({ type: "SHOW_ALERT", data: alertInfo })
        }
        close();
    }

    return (
        <div>
            <input name="excel-uploader" type="file" accept=".xlsx,.xls" onChange={handleFile} />
            <button onClick={addData}>导入</button>
            <button onClick={close}>取消</button>
        </div>
    );
};

