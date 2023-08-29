import { useState } from 'react';

const Paginate = ({ table }) => {
    const [pageNum, setPageNum] = useState(1)

    const handleInput = (e) => {
        const newValue = e.target.value;

        if (/^\d+$/.test(newValue)) {
            setPageNum(newValue);
            table.setPageIndex(newValue - 1)
        }
        else if (newValue === '') {
            setPageNum(newValue);
            table.setPageIndex(0)
        }
        else {
            setPageNum(pageNum);
        }
    };

    return (
        <div className="pagination-container row flex-center">
            <div className="row pagination-wrapper flex-center">
                <button
                    className="border rounded p-1"
                    onClick={() => {
                        table.setPageIndex(0)
                        setPageNum(1)
                    }
                    }
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => {
                        table.previousPage()
                        setPageNum(prev => prev - 1)
                    }}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </button>

                <span className="row flex-center">
                    第
                    <input
                        name="page-number"
                        type="number"
                        value={pageNum}
                        min="1"
                        onChange={handleInput}
                        step="1"
                        className="page-number"
                        onBlur={() => { if (pageNum === "") setPageNum(1) }}
                    />
                    页
                </span>

                <button
                    className="border rounded p-1"
                    onClick={() => {
                        table.nextPage()
                        setPageNum(prev => prev + 1)
                    }}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => {
                        table.setPageIndex(table.getPageCount() - 1)
                        setPageNum(table.getPageCount())
                    }
                    }
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </button>
            </div>
            <div className="page-size-controller row flex-center">
                每页显示
                <select
                    name="page-size"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[100, 1000, 5000].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
                行/共
                <strong>{table.getCoreRowModel().rows.length}</strong>行
            </div>
        </div>
    );
};

export default Paginate;