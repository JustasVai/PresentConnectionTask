import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const TableRow = (props) => {
    const navigate = useNavigate()
    const handleRowClick = () => {
        navigate("/restaurantDetail",{state:{id:data.id}});
    }
    const { data } = props;
    //console.log(props)
    return (

        <tr  onClick={() => handleRowClick()}>
            <td >
                {data.id}
            </td>
            <td >
                {data.name}
            </td>
            <td >
                {data.description}
            </td>
            <td >
                {data.phoneNumber}
            </td>
            <td>
                {data.rating}
            </td>
            <td >
                {format(new Date(data.creationDate), "yyyy-MM-dd hh:mm")}
            </td>
        </tr>

    );

}

export default TableRow;