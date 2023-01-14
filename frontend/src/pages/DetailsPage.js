import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
const RowDetail = () => {
    const id = useLocation().state.id;
    const [restaurant, setRestaurant] = useState();
    

    useEffect(() => {
        const getRestaurant = async() => {
           const res =await fetch(`http://localhost:8080/api/v1/restaurants/${id}`);
           const data =await res.json();
           setRestaurant(data);
        }
        getRestaurant();
        return () => {
        };
    }, [id]);

    const loaded = restaurant !== null;
    console.log(loaded)
        return (


        <div className='details'>
            {loaded ?
                <div>
                    <h1>Restaurant details</h1>
                    <p>Name: <b>{restaurant.name}</b></p>
                    <p>Description:<b> {restaurant.description}</b></p>
                    <p>Phone number:<b> {restaurant.phoneNumber}</b></p>
                    <p>Rating:<b> {restaurant.rating} </b></p>
                    <p>Creation date:<b>   {format(new Date(restaurant.creationDate), "yyyy-MM-dd hh:mm")} </b></p>
                </div>

                : <p>Loading..</p>}
        </div>
    )
}

export default RowDetail;