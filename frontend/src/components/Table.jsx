import { useState, useMemo, useEffect } from 'react';
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
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow-down.svg';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ColVisibility from './ColVisibility';
import { useTableStatesContext, useUpdateTableStatesContext } from '../hooks/useCustomContext';

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}) {
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    return (
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
}

function Filter({ column }) {
    const columnFilterValue = column.getFilterValue()

    const sortedUniqueValues = useMemo(
        () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
        [column.getFacetedUniqueValues()]
    )

    return (
        <>
            <datalist id={column.id + 'list'}>
                {sortedUniqueValues.map((uniqueValue) => (
                    <option value={uniqueValue} key={uniqueValue} />
                ))}
            </datalist>
            <DebouncedInput
                type="text"
                value={columnFilterValue ?? ''}
                onChange={value => column.setFilterValue(value)}
                placeholder={`搜索 (${column.getFacetedUniqueValues().size})`}
                list={column.id + 'list'}
                name={column.id}
            />
        </>
    )
}

const DraggableHeader = ({ header, table }) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header

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
            <div ref={previewRef} className='row flex-center header-controls'>
                <button ref={dragRef} >🟰</button>
                {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                <button onClick={header.column.getToggleSortingHandler()}>
                    {
                        {
                            asc: '🔼',
                            desc: <ArrowIcon className="header-icon icon__small" />,
                            false: <FilterIcon className="header-icon icon__small" />
                        }[header.column.getIsSorted() ?? 'false']
                    }
                </button>
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
            {/* {header.column.getCanFilter() ? (
                <div>
                    <Filter column={header.column} table={table} />
                </div>
            ) : null} */}
        </div>
    )
}

export default function Table({ data, columns, showVisibility }) {
    console.log("Table Rerendered");
    const states = useTableStatesContext()
    const [rowSelection, setRowSelection] = useState({})

    const columnVisibility = states.ColVisibility
    const [sorting, setSorting] = useState([])
    const [grouping, setGrouping] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnResizeMode] = useState('onChange')

    const updateTableStates = useUpdateTableStatesContext()

    const [columnOrder, setColumnOrder] = useState(columns.map(column => column.id))

    useEffect(()=> console.log(123), [states])
    useEffect(() => setRowSelection({}), [data,])
    useEffect(() => updateTableStates({ type: "SET_ROW_SELECTION", rowSelection }), [rowSelection])


    const table = useReactTable
        ({
            data,
            columns,
            columnResizeMode,
            enableRowSelection: true,
            state: {
                sorting,
                grouping,
                columnFilters,
                columnVisibility,
                rowSelection,
                columnOrder
            },

            initialState: columnVisibility,

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
                    setTableData(prev =>
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

                {showVisibility && <ColVisibility table={table} />}
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
