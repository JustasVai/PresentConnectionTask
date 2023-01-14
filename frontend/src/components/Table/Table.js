import TableRow from "./TableRow";
import { useEffect, useState } from 'react';

const Table = (props) => {
    const [tableData, setTableData] = useState();
    const currentPage = props.page;
   

    console.log(currentPage + 1)

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/restaurants/?pageNumber=${currentPage + 1}&pageSize=2`)
            .then(results => {
                return Promise.all([results.json(),results.headers.get('Pagination')])
            })
            .then(([resultsJson, headers]) => {             
                setTableData(resultsJson);
                props.setPagination(JSON.parse(headers));
            });
        return () => {
        };
    }, [currentPage]);

    console.log(tableData)
    const headers = tableData ? Object.keys(tableData[0]) : null;

    return (
        <table class="table">
            <thead >
                <tr>
                    {headers ? headers.map((row, index) =>
                        <th key={index}>
                            {headers[index]}
                        </th>

                    ) : <td></td>}
                </tr>
            </thead>
            <tbody >
                {tableData ? tableData.map((row, index) =>
                    <TableRow key={index} data={row} />
                ) : <tr><td>Loading...</td></tr>}
            </tbody>
        </table>
    );
}
export default Table;