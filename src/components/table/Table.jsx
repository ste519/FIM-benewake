import { useState, useMemo, useEffect, useRef } from 'react';
import {
    flexRender,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getPaginationRowModel,
    getSortedRowModel,
    getGroupedRowModel
} from '@tanstack/react-table'
import Paginate from './Paginate';
import { ReactComponent as FilterIcon } from '../../assets/icons/filter.svg';
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow-down.svg';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useTableStatesContext, useUpdateTableStatesContext } from '../../hooks/useCustomContext';

const Search = ({ column, closeSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const allOptions = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    const options = useMemo(() => {
        return inputValue
            ? allOptions.filter(option => option.toLowerCase().includes(inputValue.toLowerCase()))
            : allOptions;
    }, [inputValue, allOptions]);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleOptionClick = (uniqueValue) => {
        setInputValue(uniqueValue);
        column.setFilterValue(uniqueValue);
        closeSearch()
    };

    return (
        <div className="search-wrapper">
            <input
                type="text"
                value={inputValue}
                onChange={e => handleInputChange(e.target.value)}
                placeholder={`搜索 (${column.getFacetedUniqueValues().size})`}
                name={column.id}
            />
            {inputValue &&
                <ul>
                    {options.map((uniqueValue) => (
                        <li
                            key={uniqueValue}
                            onClick={() => handleOptionClick(uniqueValue)}
                        >
                            {uniqueValue}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}

const DraggableHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header
    const [showSearch, setShowSearch] = useState(false)

    const reorderColumn = (
        draggedColumnId,
        targetColumnId,
        columnOrder
    ) => {
        columnOrder.splice(
            columnOrder.indexOf(targetColumnId),
            0,
            columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0]
        );
        return [...columnOrder];
    };

    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn) => {
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        },
    })

    const [{ isDragging }, dragRef, previewRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
    })

    return (
        <div
            className='th'
            ref={dropRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                width: header.getSize()
            }}

            id={header.id}
            colSpan={header.colSpan}
        >
            <div ref={previewRef} className='row flex-center'>
                <button onClick={header.column.getToggleSortingHandler()} ref={dragRef} >
                    {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}

                    <span className='sort-icon'>
                        {
                            {
                                asc: <ArrowIcon className="header-icon rotate180" />,
                                desc: <ArrowIcon className="header-icon icon__small" />,
                                false: ""
                            }[header.column.getIsSorted() ?? 'false']
                        }
                    </span>

                </button>
                {/* <button onClick={() => setShowSearch(!showSearch)}><ArrowIcon className="header-icon icon__small" /></button> */}
            </div>

            {/* resizer */}
            {header.column.getCanResize() &&
                <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                        }`}
                />
            }

            {/* filter */}

            {/* {header.column.getCanFilter() && showSearch && (
                <Search column={header.column} closeSearch={() => setShowSearch(false)} />
            )} */}
        </div>
    )
}

export default function Table({ data, columns, setNewInquiryData }) {
    const states = useTableStatesContext()
    const [rowSelection, setRowSelection] = useState({})

    const columnVisibility = states.columnVisibility
    const [sorting, setSorting] = useState([])
    const [grouping, setGrouping] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnResizeMode] = useState('onChange')

    const updateTableStates = useUpdateTableStatesContext()

    const [columnOrder, setColumnOrder] = useState(columns.map(column => column.id))

    useEffect(() => setRowSelection({}), [data])
    useEffect(() => updateTableStates({ type: "SET_ROW_SELECTION", rowSelection }), [rowSelection])


    const table = useReactTable
        ({
            data,
            columns,
            columnResizeMode,
            enableRowSelection: true,
            defaultColumn: {
                isVisible: false
            },
            state: {
                sorting,
                grouping,
                columnFilters,
                columnVisibility,
                rowSelection,
                columnOrder
            },
            initialState: {
                columnVisibility: columnVisibility,
                pagination: {
                    pageSize: 100,
                },
            },
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getGroupedRowModel: getGroupedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getFacetedRowModel: getFacetedRowModel(),
            getFacetedUniqueValues: getFacetedUniqueValues(),

            onSortingChange: setSorting,
            onGroupingChange: setGrouping,
            onColumnOrderChange: setColumnOrder,
            onRowSelectionChange: setRowSelection,
            onColumnFiltersChange: setColumnFilters,
            meta: {
                updateData: (rowIndex, columnId, value) => {
                    setNewInquiryData(prev =>
                        prev.map((row, index) => {
                            if (index === rowIndex) {
                                return { ...prev[rowIndex], [columnId]: value, }
                            }
                            return row
                        })
                    )
                },
            },
        })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="table-container col" >
                <div className="table-wrapper" >
                    <div className="table" style={{
                        width: table.getCenterTotalSize(),
                    }}>
                        <div className='thead'>
                            {table.getHeaderGroups().map(headerGroup =>
                                <div className='tr' key={headerGroup.id}>
                                    {headerGroup.headers.map(header =>
                                        header.id === "select" ?
                                            <div
                                                key={header.id}
                                                className="th">
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </div>
                                            :
                                            <DraggableHeader
                                                key={header.id}
                                                header={header}
                                                table={table}
                                            />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className='tbody'>
                            {table.getRowModel().rows.map(row =>
                                <div
                                    key={row.id}
                                    className={`tr${row.getIsSelected() ? ' selected' : ''}`}
                                >
                                    {row.getVisibleCells().map(cell =>
                                        <div
                                            key={cell.id}
                                            style={{
                                                width: cell.column.getSize()
                                            }}
                                            className={`td ${cell.column.columnDef.id}`}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext())}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Paginate table={table} />
            </div>

        </DndProvider >
    )
}
