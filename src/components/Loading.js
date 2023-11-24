import React from 'react'

const Loading = ({message}) => {
  return (
    <div className="d-flex justify-content-center text-secondary">
      <div className="spinner-border">
      </div>
      <h3 className="ms-3 lh-1">{message}...</h3>
    </div>
  );
}

export default Loading;