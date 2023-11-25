import { BsArrowDownUp } from "react-icons/bs";

const ColumnSortButton = ({header}) => {
  return (
    <>
      <button onClick={header.column.getToggleSortingHandler()}
        type="button"
        className="btn btn-outline-secondary pt-0 pb-1 px-1">
          <BsArrowDownUp />
      </button>
      <br />
    </>
  )
}

export default ColumnSortButton