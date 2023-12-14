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

const FilterPopup = ({ url, open, closePopup, setRows }) => {
    const { alertError } = useAlertContext()
    const [params, setParams] = useState({
        yearly: 1,
        monthly: 1,
        agent: 1,
        newCustomer: 1,
        temporaryCustomer: 1,
        daily: 1
    });

    const labels = ['年度客户', '月度客户', '代理商', '新增客户', '临时客户', '日常客户'];
    const keys = Object.keys(params);

    const handleClick = async () => {
        const res = await fetchAnalysisData(url, params);
        switch (res.code) {
            case 200:
                setRows(res.data)
                break;
            case 1:
            case 400:
                alertError(res.message)
                break
        }
        // closePopup(); 
    };

    return (
        <div className='popup-container'>
            <div className="popup-wrapper filter-popup g1">
                是否显示:
                {open && labels.map((label, i) => (
                    <label htmlFor={'analysis-filter' + i} key={i}>
                        {label}: 
                        <select
                            id={'analysis-filter' + i}
                            value={params[keys[i]]}
                            onChange={(e) => setParams(prev => ({
                                ...prev, [keys[i]]: e.target.value
                            }))}>
                            <option value={1}>是</option>
                            <option value={0}>否</option>
                        </select>
                    </label>
                ))}
                <button onClick={handleClick} className='small blue40'>确认</button>
            </div>
        </div>
    );
};

const Analysis = ({ schema }) => {
    const res = useLoaderData();
    const [rows, setRows] = useState([])
    const { alertConfirm } = useAlertContext()
    const [openPopup, setOpenPopup] = useState(true)

    console.log(schema);
    useEffect(() => { setRows(res.data) }, [res])

    const handleRefresh = async () => {
        setRows([])
        const res = await fetchAnalysisData(schema.select)
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
            {
                schema.cn.includes("客户类型分类-订单版") &&
                < FilterPopup
                    open={openPopup}
                    closePopup={() => setOpenPopup(false)}
                    url={schema.select}
                    setRows={setRows}
                />
            }
            {rows?.length > 0 ?
                <Table
                    data={rows}
                    columns={defs}
                /> :
                <Loader />
            }
        </div>
    )
}

export default Analysis;