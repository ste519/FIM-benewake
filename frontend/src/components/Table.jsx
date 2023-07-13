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
} from '@tanstack/react-table'
import Paginate from './Paginate';
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg';
import { ReactComponent as ArrowIcon } from '../assets/icons/arrow.svg';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ColVisibility = ({ table }) => {
    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(!open)
    return (
        <div className="visibility-container">
            <div className="row dropdown">
                显示列
                <button onClick={toggleOpen}>▾</button>
            </div>
            {open &&
                <form className="col visibility-wrapper">
                    <label>
                        <input
                            type="checkbox"
                            checked={table.getIsAllColumnsVisible()}
                            onChange={table.getToggleAllColumnsVisibilityHandler()}
                        />
                        全选
                    </label>
                    {table.getAllLeafColumns().map(column =>
                        <label key={column.id}>
                            <input
                                type='checkbox'
                                checked={column.getIsVisible()}
                                onChange={column.getToggleVisibilityHandler()}
                            />
                            {column.id}
                        </label>
                    )}
                    <button onClick={toggleOpen}>取消</button>
                    <button onClick={toggleOpen}>确认</button>
                </form >}
        </div>
    )
}

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
        <th
            ref={dropRef}
            style={{ opacity: isDragging ? 0.5 : 1, width: header.getSize() }}

        >
            <div ref={previewRef} className='row flex-center header-controls'>
                <button ref={dragRef}>🟰</button>
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
            <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''
                    }`} />
            {header.column.getCanFilter() ? (
                <div>
                    <Filter column={header.column} table={table} />
                </div>
            ) : null}
        </th>
    )
}

export default function Table({ data }) {

    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})
    const [columnResizeMode] = useState('onChange')
    const columns = [
        {
            id: "select",
            header: ({ table }) => (
                <input type="checkbox"
                    name={table.id}
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) =>
                <input type="checkbox"
                    name={row.id}
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ,
            enableSorting: false
        },
        {
            id: "物料编码",
            header: "物料编码",
            accessorKey: "物料编码",
            size: 200,
            enableResizing: true

        },
        {
            id: "物料名称",
            header: "物料名称",
            accessorKey: "物料名称",
            size: 200,
            enableResizing: true,
        },
        {
            id: "6月包装",
            header: "6月包装",
            accessorKey: "6月包装",
            size: 200,
            enableResizing: true,
            enableColumnFilter: false
        }]

    const [columnOrder, setColumnOrder] = useState(columns.map(column => column.id))

    const table = useReactTable
        ({
            data,
            columns,
            columnResizeMode,
            enableRowSelection: true,
            state: {
                sorting,
                columnFilters,
                columnVisibility,
                rowSelection,
                columnOrder
            },
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getFacetedRowModel: getFacetedRowModel(),
            getFacetedUniqueValues: getFacetedUniqueValues(),

            onSortingChange: setSorting,
            onColumnOrderChange: setColumnOrder,
            onRowSelectionChange: setRowSelection,
            onColumnVisibilityChange: setColumnVisibility,
            onColumnFiltersChange: setColumnFilters
        })


    return (
        <DndProvider backend={HTML5Backend}>
            <div className="table-container col" >
                <ColVisibility table={table} />
                <div className="table-wrapper" >
                    <table style={{
                        width: table.getCenterTotalSize(),
                    }}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup =>
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header =>
                                        header.id === "select" ?
                                            <th
                                                key={header.id}
                                                className={header.id}>
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(header.column.columnDef.header, header.getContext())
                                                }


                                            </th>
                                            :
                                            <DraggableHeader
                                                key={header.id}
                                                header={header}
                                                table={table}
                                            />
                                    )}
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {table.getRowModel().rows.map(row =>
                                <tr key={row.id} className={row.getIsSelected() ? 'selected' : ""}>
                                    {row.getVisibleCells().map(cell =>
                                        <td key={cell.id} className={cell.column.columnDef.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext())}
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Paginate table={table} />
            </div>
        </DndProvider >
    )
}
