import React from 'react'
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import useGetProducts from '../api/useGetProducts';
import SelectedRow from './SelectedRow';
import usePatchProduct from '../api/usePatchProduct';
import Loading from './Loading';

const columns = [
  {
    accessorKey: 'selected',
    header: '☑️',
    cell: SelectedRow
  },
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
  const { data: products, isLoading } = useGetProducts();
  const { mutate: patchProduct } = usePatchProduct();

  const table = useReactTable({
    columns,
    data: isLoading ? [] : products,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {  
        const product = products[rowIndex];
        product['selected'] = value;
        patchProduct(product);
      }
    }
  });

  if (isLoading) {
    return <Loading message='Fetching Data'/>;
  }

  return (
    <table className="table table-striped table-sm">
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