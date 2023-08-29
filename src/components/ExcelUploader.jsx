import { useState } from 'react';
import { postExcelFile } from '../api/post';

function getAlertInfo(code, message) {
    switch (code) {
        case 400:
            return { type: "error", message: message }
        case 200:
            return { type: "success", message: message }
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
        <div className='excel-uploader-container col flex-center '>
            <input id="excel-uploader" type="file" accept=".xlsx,.xls" onChange={handleFile} className='hidden' />
            <label htmlFor="excel-uploader">选择文件(.xls, .xlsx)</label>
            <h1>{file?.name}</h1>
            <div className='row flex-center g1'>
                <button onClick={close} className='white small bordered'>取消</button>
                <button onClick={addData} className='blue40 small'>导入</button>
            </div>
        </div>
    );
};

