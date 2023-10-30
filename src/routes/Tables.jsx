import { Link } from "react-router-dom";
const tables = [{ cn: "用户类型", eng: "customerType" }]
const Tables = () => {
    return (
        <div className='col full-screen'>
            {tables.map((table, i) =>
                <Link key={i} to={{ pathname: "manage", state: { tableName: table.eng } }}>{table.cn}</Link>
            )}
        </div>

    )
}

export default Tables;