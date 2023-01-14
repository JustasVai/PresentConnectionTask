import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/ListPage';
import RowDetail from './pages/DetailsPage';
import NewRecordForm from './pages/NewRecordForm';
function App() {


  return (
    <div className="App">
       <div className='background'></div>
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/restaurantDetail" element={<RowDetail />}/>
            <Route path="/restaurantCreate" element={<NewRecordForm />}/>
          </Routes>
        </Router>
      </header>
     
    </div>
  );
}

export default App;
