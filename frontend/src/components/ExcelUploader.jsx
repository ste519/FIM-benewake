import { useState } from 'react';
import { postExcelFile } from '../api/post';
import { useAlertContext } from '../hooks/useCustomContext';

export default function ExcelUploader({ close }) {
    const [file, setFile] = useState(null);
    const { alertWarning, alertError, alertSuccess, alertConfirm } = useAlertContext()

    const handleFile = (event) => {
        setFile(event.target.files[0])
    };

    const addData = async () => {
        if (!file)
            alertWarning("未选择文件！")
        else {
            const res = await postExcelFile(file)
            switch (res.code) {
                case 400:
                    alertError(res.message)
                    break
                case 200:
                    alertSuccess(res.message)
                    break
                default:
                    throw new Error("Unknown status")
            }
        }
        close();
    }

    return (
        <div className='excel-uploader-container popup-wrapper col flex-center '>
            <input id="excel-uploader" type="file" accept=".xlsx,.xls" onChange={handleFile} className='hidden' />
            <label htmlFor="excel-uploader">选择文件(.xls, .xlsx)</label>
            <h1>{file?.name}</h1>
            <div className='row flex-center g1'>
                <button onClick={close} className='white small'>取消</button>
                <button onClick={addData} className='blue40 small'>导入</button>
            </div>
        </div>
    );
};

