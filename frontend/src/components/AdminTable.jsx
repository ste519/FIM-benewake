import { useState, useMemo } from 'react'

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import Paginate from './Paginate'


export default function AdminTable() {

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        columns: [
          {
            accessorKey: 'firstName',
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            header: () => <span>Last Name</span>,
            footer: props => props.column.id,
          },
        ],
      },
    ],
    []
  )

  const [data, setData] = useState({})


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    debugTable: true,
  })

  return (
    <div className="p-2">
      <div className="h-2" />
      <div className='table'>
        <div className='thead'>
          {table.getHeaderGroups().map(headerGroup => (
            <div className='tr' key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <div className='th' key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className='tbody'>
          {table.getRowModel().rows.map(row => {
            return (
              <div className='tr' key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <div className='td' key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <Paginate table={table} />
    </div>
  )
}

