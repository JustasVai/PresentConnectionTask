import React, { useState,useEffect } from "react";
import Table from "../components/Table/Table";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import Pagination from "../components/Pagination";
const Home = () => {
  const navigate = useNavigate();
  const [pagination,setPagination]= useState(null);
  const [currentPage,setCurrentPage]= useState(0);
  const handleButtonClick = ()=>{
    navigate("/restaurantCreate");
  }
 
  
 
  return (
    <div >
      <h1>Restaurants table</h1>
      <Button color="secondary"variant="contained" onClick={() => handleButtonClick()}>Create Restaurant</Button>
      <Table page={currentPage} setPagination={setPagination}/>
      
      <Pagination className="pagination" setPage={setCurrentPage} paginationData={pagination}  />
    </div>
  );
};

export default Home;