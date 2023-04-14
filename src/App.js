import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import {BrowserRouter,Routes,Route,} from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard/Dashboard';
// import Welcome from './Component/Pages/Welcome';
import Employee from './Component/Dashboard/Employee';
import Order from './Component/Dashboard/Order';
import Home from './Component/Dashboard/Home';
import Brands from './Component/Dashboard/Brands/Brands';
import Customer from './Component/Dashboard/Customers/Customer';
import CreateCustomer from './Component/Dashboard/Customers/CreateCustomer';
import EditCustomer from './Component/Dashboard/Customers/EditCustomer';
import CreateBrand from './Component/Dashboard/Brands/CreateBrand';
import LandingPage from './Component/Pages/Landing/LandingPage';
import EditBrand from './Component/Dashboard/Brands/EditBrand';
const App = ()=>{
  return (  
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/dashboard/' element={<Dashboard/>}>
          <Route path='/dashboard/home' element={<Home/>}></Route>
          <Route path='/dashboard/brands' element={<Brands/>}></Route>
          <Route path='/dashboard/brands/create/' element={<CreateBrand/>}></Route>
          <Route path='/dashboard/brands/read/:id' element={<EditBrand/>}></Route>
          <Route path='/dashboard/brands/update/:id' element={<EditBrand/>}></Route>
          <Route path='/dashboard/employee' element={<Employee/>}></Route>
          <Route path='/dashboard/customer' element={<Customer/>}></Route>
          <Route path='/dashboard/customer/add' element={<CreateCustomer/>}></Route>
          <Route path='/dashboard/customer/read/:id' element={<EditCustomer/>}></Route>
          <Route path='/dashboard/customer/update/:id' element={<EditCustomer/>}></Route>
          <Route path='/dashboard/order' element={<Order/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
