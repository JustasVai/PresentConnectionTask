import React, { useState} from "react";
import Table from "../components/Table/Table";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import Pagination from "../components/Pagination";
const Home = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState();

  const handleButtonClick = ()=>{
    navigate("/restaurantCreate");
  }
 
  
 
  return (
    <div >
      <h1>Restaurants table</h1>
      <Button color="secondary"variant="contained" onClick={() => handleButtonClick()}>Create Restaurant</Button>
      <Table tableData={tableData}/>
      
      <Pagination className="pagination"  setTableData={setTableData}  />
    </div>
  );
};

export default Home;