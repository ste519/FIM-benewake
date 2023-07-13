import React from 'react';
const Paginate = ({ totalPages, previousPage, paginate, nextPage, currentPage, setRowsPerPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleSelect = (event) => {
        paginate(1);
        setRowsPerPage(event.target.value)
    }

    const options = [1, 2, 3, 5, 10]
    return (
        <div className="pagination-container row">
            <ul className="pagination">
                <li onClick={previousPage} className="page-number">
                    Prev
                </li>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        onClick={() => paginate(number)}
                        className={`page-number ${number == currentPage ? "active" : ""}`}
                    >
                        {number}
                    </li>
                ))}
                <li onClick={nextPage} className="page-number">
                    Next
                </li>
            </ul>
            <div className="rows-per-page-control">
                每页显示
                <select onChange={handleSelect}>
                    {options.map((option) => <option key={option}>{option}</option>)}
                </select>
                行</div>
        </div>
    );
};

export default Paginate;