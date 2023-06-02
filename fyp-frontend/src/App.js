
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Card from './components/Cards/Card';
import Dropdown from './components/Dropdown/Dropdown';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Reading from './components/Reading/Reading';

import Home from './pages/Home';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import '../src/constants/fonts.css'


function App() {
  return (
    <div className="App font-[Opensansfontmedium]">

<BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Reading" element={<Reading/>}/>
        <Route path="/Registration" element={<Registration/>}/>
        <Route path="/Login" element={<Login/>}/> 
      </Routes>
</BrowserRouter>

        {/* <Home/> */}
        {/* <Reading/>       */}
        {/* <Dropdown/> */}
    </div>
  );
}

export default App;
