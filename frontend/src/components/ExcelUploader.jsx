import { useState } from 'react';
import * as XLSX from 'xlsx';
import useTabContext from '../hooks/useTabContext';
import { useLocation } from 'react-router-dom';


export default function ExcelUploader({ close }) {
    const [excelData, setExcelData] = useState(null);
    const { tabContents, setTabContents } = useTabContext();

    const activeTab = useLocation().pathname.replace('/', '')

    const handleFile = (event) => {
        const files = event.target.files;
        const f = files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the first worksheet is the one you want to convert to JSON
            const sheetName = workbook.SheetNames[0];
            const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

            // Output the JSON data to console
            setExcelData(jsonData)
            console.log(jsonData);
        };
        reader.readAsArrayBuffer(f);
    };

    const addData = (newData) => {
        if (newData) {
            const oldData = tabContents[activeTab]
            if (oldData && oldData.length > 0) {
                setTabContents({ ...tabContents, [activeTab]: [...oldData, ...newData] })
            }
            else {
                //TODO
            }
        }
        close();
    }

    return (
        <div>
            <input name="excel-uploader" type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} />
            <button onClick={() => addData(excelData)}>导入</button>
            <button onClick={close}>取消</button>
        </div>
    );
};

