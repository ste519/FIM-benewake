import { useState, useMemo } from 'react';
import Filters from './Filters';

import useTabContext from '../context/TabProvider';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

export default function Table() {
    const { tabContents, activeTab } = useTabContext();
    const data = useMemo(() => tabContents[activeTab], [])
    const columns = useMemo(() => {}, [])

    const table = useReactTable({
        data,
        getCoreRowModel: getCoreRowModel(),
    })
    // const [open, setOpen] = useState(true)
    // const toggleOpen = () => setOpen(!open)

    return (
        <div className="table-container" id={activeTab}>
            {/* <button className="toggle-btn" onClick={toggleOpen}>Toggle</button>
            {open ? <Filters headers={headers} /> : null} */}


            {/* <div className="p-2">
                <table>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        {table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.footer,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
                <div className="h-4" />
                <button onClick={() => rerender()} className="border p-2">
                    Rerender
                </button>
            </div> */}

        </div>
    )
}
