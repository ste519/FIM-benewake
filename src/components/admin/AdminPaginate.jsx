const AdminPaginate = ({ totalItems, pageNum, setPageNum, pageSize, setPageSize }) => {

    const getPageCount = () => Math.ceil(totalItems / pageSize);

    const handleInput = (e) => {
        const newValue = e.target.value;
        if (/^\d+$/.test(newValue) && newValue >= 1 && newValue <= getPageCount()) {
            setPageNum(Number(newValue));
        } else if (newValue === '') {
            setPageNum('');
        }
    };

    const canNextPage = pageNum < getPageCount();
    const canPreviousPage = pageNum > 1;

    const goToPage = (page) => {
        setPageNum(page);
    };

    const nextPage = () => {
        setPageNum(currentPage => Math.min(currentPage + 1, getPageCount()));
    };

    const previousPage = () => {
        setPageNum(currentPage => Math.max(currentPage - 1, 1));
    };

    const changePageSize = (newSize) => {
        setPageSize(Number(newSize));
        setPageNum(1); // Reset to the first page when page size changes
    };


    return (
        <div className="pagination-container row flex-center">
            <div className="row pagination-wrapper flex-center">
                <button
                    className="border rounded p-1"
                    onClick={() => goToPage(1)}
                    disabled={!canPreviousPage}
                >
                    {'<<'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={previousPage}
                    disabled={!canPreviousPage}
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
                        max={getPageCount()}
                        onChange={handleInput}
                        step="1"
                        className="page-number"
                        onBlur={() => { if (pageNum === "") setPageNum(1) }}
                    />
                    页
                </span>

                <button
                    className="border rounded p-1"
                    onClick={nextPage}
                    disabled={!canNextPage}
                >
                    {'>'}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => goToPage(getPageCount())}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </button>
            </div>
            <div className="page-size-controller row flex-center">
                每页显示
                <select
                    name="page-size"
                    value={pageSize}
                    onChange={e => changePageSize(e.target.value)}
                >
                    {[10, 50, 100].map(pageSizeOption => (
                        <option key={pageSizeOption} value={pageSizeOption}>
                            {pageSizeOption}
                        </option>
                    ))}
                </select>
                行/共
                <strong>{totalItems}</strong>行
            </div>
        </div>
    );
};

export default AdminPaginate;