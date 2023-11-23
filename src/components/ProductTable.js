import React, { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import useProducts from '../api/useProducts';

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (props) => <p>{props.getValue()}</p>
  }, {
    accessorKey: 'name',
    header: 'Name',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (props) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (props) => <p>{props.getValue()}</p>
  }
]
const ProductTable = () => {
  // const [products, setProducts] = useState([]);
  const { data: products, isLoading } = useProducts();
  
  const table = useReactTable({
    columns,
    data: isLoading ? [] : products,
    getCoreRowModel: getCoreRowModel({
      onRowClick: (row) => {
        console.log('row clicked', row)
      },
    }),
  });

  console.log(table.getHeaderGroups())
  return (
    <table className="table table-striped table-lg">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} scope="col">
                {header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="table-group-divider">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ProductTable