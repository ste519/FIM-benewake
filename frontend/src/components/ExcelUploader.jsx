import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useTabContext } from '../hooks/useCustomContext';
import { useLocation } from 'react-router-dom';
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

    // const activeTab = useLocation().pathname.replace('/', '')

    const handleFile = (event) => {
        setFile(event.target.files[0])

        // const files = event.target.files;
        // const f = files[0];

        // const reader = new FileReader();

        // reader.onload = (e) => {
        //     const data = new Uint8Array(e.target.result);
        //     const workbook = XLSX.read(data, { type: 'array' });
        //     const sheetName = workbook.SheetNames[0];
        //     const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        //     setExcelData(jsonData)
        //     console.log(jsonData);
        // };
        // reader.readAsArrayBuffer(f);
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

