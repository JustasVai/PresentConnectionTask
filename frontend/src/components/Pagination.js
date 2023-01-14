import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
const Pagination = (props) => {
    const handlePageClick = (data) => {
        props.setPage(data.selected);
    }
  
    const pages = props.paginationData===null ? 0 : props.paginationData.totalPages;
  
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            pageCount={pages}
            pageRangeDisplayed={5}
            containerClassName="pagination justify-content-center"
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            activeClassName='active'
            onPageChange={handlePageClick}
            breakClassName='page-item'
            breakLinkClassName='page-link'
        />
        <select value={pageSize} onChange=
    )

}
export default Pagination;