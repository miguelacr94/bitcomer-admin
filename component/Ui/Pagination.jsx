import ReactPaginate from 'react-paginate';

const Pagination = ({ totalPages = 0, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center">
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel={'...'}
        breakClassName={'break-me'}
        disableInitialCallback
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={8}
        onPageChange={onPageChange}
        containerClassName={'pagination'}
        pageClassName="mx-1 pagination-item"
        activeClassName="active"
      />
    </div>
  );
}

export default Pagination;