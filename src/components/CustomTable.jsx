import ResizableHeader from './ResizableHeader';

const Row = ({ schema, rowIndex, data, updateCells, colWidths }) => {

    const handleChange = (keys, values) => {
        updateCells(keys, values, rowIndex)
    }

    return (
        <div className="tr">
            {schema.map((cell, i) =>
                <div
                    style={{ width: colWidths?.[i] ?? 70 }}
                    className='td'
                    key={cell.identifier}>
                    {cell.element(data, handleChange)}
                </div>
            )}
        </div>
    )
}

const CustomTable = ({ schema, colWidths, setColWidths, rows, setRows }) => {

    const handleResize = (index, newSize) => {
        setColWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = newSize;
            return newWidths;
        });
    };

    const updateCells = (keys, values, rowIndex) => {
        const copy = [...rows]
        keys.forEach((key, i) => copy[rowIndex] = { ...copy[rowIndex], [key]: values[i] });
        setRows(copy)
    }

    return (
        <div className='col new-table-container'>
            <div className='new-table-wrapper'>
                <div className="table new-table">
                    <div className='thead'>
                        <div className="tr">
                            {schema.map((item, i) =>
                                <ResizableHeader
                                    key={i}
                                    width={colWidths?.[i]}
                                    onResize={handleResize}
                                    index={i}
                                >
                                    {item.header}
                                </ResizableHeader>)
                            }
                        </div>
                    </div>
                    <div className='tbody'>
                        {rows.map((row, i) =>
                            <Row
                                key={i}
                                rowIndex={i}
                                data={row}
                                colWidths={colWidths}
                                schema={schema}
                                updateCells={updateCells}
                            />)}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CustomTable;