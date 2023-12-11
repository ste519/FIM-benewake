import { useState } from 'react';
import { postExcelFile } from '../api/post';
import { useAlertContext } from '../hooks/useCustomContext';
import api from '../api/axios';

export default function ExcelUploader({ close }) {
    const [file, setFile] = useState(null);
    const { alertWarning, alertSuccess } = useAlertContext
    const handleFile = (event) => {
        setFile(event.target.files[0])
    };

    const downloadTemplate = async () => {
        try {
            const response = await api.get('/order/downloadFile')
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', '导入模板.xlsx'); 
            document.body.appendChild(link);
            link.click();
            link.remove()
        }
        catch (err) {
            console.log(err);
        }
    }

    const addData = async () => {
        if (!file) {
            alertWarning("未选择文件！")
        }
        else {
            const res = await postExcelFile(file)
            switch (res.code) {
                case 400:
                    alertError(res.message)
                case 200:
                    alertSuccess(res.message)
                default:
                    alertError("未知错误")
                    break
            }
        }
        close();
    }

    return (
        <div className='excel-uploader-container col flex-center '>
            <input id="excel-uploader" type="file" accept=".xlsx,.xls" onChange={handleFile} className='hidden' />
            <div><button onClick={downloadTemplate} className='blue40 small'>下载导入模板</button></div>
            <label htmlFor="excel-uploader">选择文件(.xls, .xlsx)</label>
            {file?.name}
            <div className='row flex-center g1'>
                <button onClick={close} className='white small bordered'>取消</button>
                <button onClick={addData} className='blue40 small'>导入</button>
            </div>
        </div>
    );
};

