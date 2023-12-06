import { useEffect, useState } from 'react'
import Table from '../components/table/Table';
import { useLoaderData } from 'react-router-dom'
import { fetchAnalysisData } from '../api/analysis';
import analysisDefs from '../constants/defs/AnalysisDefs';
import * as XLSX from 'xlsx';
import { useAlertContext } from '../hooks/useCustomContext';
import moment from 'moment';

function EngToCn(col_name_ENG) {
    return analysisDefs.find(col => col.id === col_name_ENG)?.header
}

const Analysis = () => {
    const res = useLoaderData();
    const [rows, setRows] = useState([])
    const { alertConfirm } = useAlertContext()

    useEffect(() => { setRows(res.data) }, [res])
    
    const handleRefresh = async () => {
        setRows([])
        const res = await fetchAnalysisData('getAllPastAnalysis')
        setRows(res.data)
    }

    const handleExport = () => {
        alertConfirm("确定导出该表单？", () => {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.json_to_sheet([]);

            const headers_ENG = Object.keys(rows[0])

            let headers_CN = headers_ENG.map((name) => EngToCn(name)).filter((value) => value !== undefined)

            XLSX.utils.sheet_add_aoa(ws, [headers_CN]);
            XLSX.utils.sheet_add_json(ws, rows, { origin: 'A2', skipHeader: true });
            XLSX.utils.book_append_sheet(wb, ws);

            const timestamp = moment(new Date()).format('YYMMDDHHmmss')
            const filename = "销售员销售现况表"

            XLSX.writeFileXLSX(wb, filename + timestamp + ".xlsx");
        })

    }

    const defs = rows.length === 0 ? undefined : analysisDefs.filter((def) => Object.keys(rows[0]).includes(def.id))

    return (
        <div className='col full-screen analysis'>
            <div className='row toolbar' >
                <div className='row flex-center'>
                    <button onClick={handleRefresh}>刷新</button>
                    <button onClick={handleExport}>导出</button>
                </div>
            </div>
            {rows?.length > 0 &&
                <Table
                    data={rows}
                    columns={defs}
                />
            }
        </div>
    )
}

export default Analysis;