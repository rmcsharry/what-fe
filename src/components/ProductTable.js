import React, { useEffect, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table'
import useGetProducts from '../api/useGetProducts';
import SelectedRow from './SelectedRow';
import usePatchProduct from '../api/usePatchProduct';
import Loading from './Loading';
import ColumnSortButton from './ColumnSortButton';
import SearchControl from './SearchControl';
import { Button } from 'react-bootstrap';

const columns = [
  {
    accessorKey: 'selected',
    cell: SelectedRow,
    enableSorting: false,
    header: '',
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: (props) => <p>{props.getValue()}</p>,
  }
]
  
const ProductTable = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const { data: products, isLoading, isError } = useGetProducts(searchTerm);
  const { mutate: patchProduct } = usePatchProduct();

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const table = useReactTable({
    columns,
    data: isLoading || isError ? [] : products,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {  
        const product = products[rowIndex];
        product['selected'] = value;
        patchProduct(product);
      }
    },
  });

  if (isLoading && !searchTerm) {
    return <Loading message='Fetching Data'/>;
  };

  return (
    <>
      <div className="d-flex justify-content-center flex-column">
        <SearchControl onSearch={setSearchTerm} />
        <p className="d-flex justify-content-center mt-2">{products?.length} result(s) found</p>
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col-12">
              <div className="row row-cols-12 gx-4">
                <span className="col-6 text-nowrap align-self-center">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div className="col-6">
                  <Button className="btn-secondary btn-sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    {'<'}
                  </Button>
                  <Button className="btn-secondary btn-sm ms-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    {'>'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div className="d-flex p-2 flex-column">
        <table className="table table-striped table-sm">
          <thead className="align-baseline">
            {table?.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => (
                  header && (
                  <th key={header.id} scope="col">
                    {
                      header.column.getCanSort() && (<ColumnSortButton header={header} />)
                    }
                    {header.column.columnDef.header}
                    <br />
                    {
                      {
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()]
                    }
                  </th>
                  )
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
      </div>
    </>
  )
}

export default ProductTable;