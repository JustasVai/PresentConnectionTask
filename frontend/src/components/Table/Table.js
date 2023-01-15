import TableRow from "./TableRow";
import { useEffect, useState } from 'react';

const Table = (props) => {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(props.tableData);
    }, [setTableData, props.tableData])



    const headers = tableData && tableData.length > 0 ? Object.keys(tableData[0]) : null;



    return (
        <table>
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