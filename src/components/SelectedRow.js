import React, { useEffect } from 'react'

const SelectedRow = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [isSelected, setIsSelected] = React.useState(initialValue);

  useEffect(() => {
    setIsSelected(initialValue);
  }, [initialValue]);

  const toggleRowSelected = () => {
    table.options.meta?.updateData(row.index, column.id, !isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <input className="form-check-input" role="button" type="checkbox" checked={isSelected} onChange={() => toggleRowSelected()} />
  )
}

export default SelectedRow