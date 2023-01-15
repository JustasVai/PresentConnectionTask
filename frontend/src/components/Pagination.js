import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
const Pagination = ({ setTableData }) => {
    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    }
    const [pageSize, setPageSize] = useState(5);
    const [pagination, setPagination] = useState();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/restaurants/?pageNumber=${currentPage + 1}&pageSize=${pageSize}`)
            .then(results => {
                return Promise.all([results.json(), results.headers.get('Pagination')])
            })
            .then(([resultsJson, headers]) => {
                setTableData(resultsJson);
                setPagination(JSON.parse(headers));
            });
        return () => {
        };
    }, [currentPage, pageSize, setTableData]);

    const totalPages = pagination ? pagination.totalPages : 0;

    return (
        <div className='pagination'>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                pageCount={totalPages}
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
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} >
                {
                    [5, 10, 15].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                }
            </select>
        </div>
    )

}
export default Pagination;