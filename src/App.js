import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter,Routes,Route,} from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard/Dashboard';
import Employee from './Component/Dashboard/Employee/Employee';
import Order from './Component/Dashboard/Orders/Order';
import Home from './Component/Dashboard/Home_Page/Home';
import Brands from './Component/Dashboard/Brands/Brands';
import Customer from './Component/Dashboard/Customers/Customer';
import CreateCustomer from './Component/Dashboard/Customers/CreateCustomer';
import EditCustomer from './Component/Dashboard/Customers/EditCustomer';
import CreateBrand from './Component/Dashboard/Brands/CreateBrand';
import LandingPage from './Component/Pages/Landing/LandingPage';
import EditBrand from './Component/Dashboard/Brands/EditBrand';
import Category from './Component/Dashboard/Category/Category';
import CreateCategory from './Component/Dashboard/Category/CreateCategory';
import EditCategory from './Component/Dashboard/Category/EditCategory';
import Item from './Component/Dashboard/Products/Items/Items';
import Billing from './Component/Cashier/Billing/Billing';
import CreateItem from './Component/Dashboard/Products/Items/CreateItem';
import EditItem from './Component/Dashboard/Products/Items/EditItem';
import CreateEmployee from './Component/Dashboard/Employee/CreateEmployee';
import Report from './Component/Dashboard/Repo/Report';
import EditEmployee from './Component/Dashboard/Employee/EditEmployee';
//import Login from './Component/Login/Login';
import Login2 from './Component/Login/Login2';
import ContactUs from './Component/Pages/Contact_Us/ContactUs';
import CahierDashboard from './Component/Cashier/CashierDashboard';
import Products from './Component/Cashier/Products';
import Repair from './Component/Dashboard/Repair/Repair';
import CreateRepair from './Component/Dashboard/Repair/CreateRepair';
import CreateOrder from './Component/Dashboard/Orders/CreateOrder';
import EditOrder from './Component/Dashboard/Orders/EditOrder';
import TechnicianDashboard from './Component/Technician_Dashboard/TechnicianDashboard'
import ShowRepairs from './Component/Technician_Dashboard/ShowRepairs';
import AdminProfile from './Component/Dashboard/Admin_Profile/AdminProfile';
import EditRepair from './Component/Dashboard/Repair/EditRepair';
const App = ()=>{
  return (  
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/login' element={<Login2/>}></Route>
        <Route path='/contact' element={<ContactUs/>}></Route>
        <Route path='/dashboard/' element={<Dashboard/>}>
          <Route path='/dashboard/home' element={<Home/>}></Route>
          <Route path='/dashboard/brands' element={<Brands/>}></Route>
          <Route path='/dashboard/brands/create/' element={<CreateBrand/>}></Route>
          <Route path='/dashboard/brands/read/:id' element={<EditBrand/>}></Route>
          <Route path='/dashboard/category' element={<Category/>}></Route>
          <Route path='/dashboard/category/add' element={<CreateCategory/>}></Route>
          <Route path='/dashboard/category/read/:id' element={<EditCategory/>}></Route>
          <Route path='/dashboard/items' element={<Item/>}></Route>
          <Route path='/dashboard/items/create' element={<CreateItem/>}></Route>
          <Route path='/dashboard/items/read/:id' element={<EditItem/>}></Route>
          <Route path='/dashboard/employee' element={<Employee/>}></Route>
          <Route path='/dashboard/employee/add' element={<CreateEmployee/>}></Route>
          <Route path='/dashboard/employee/read/:id' element={<EditEmployee/>}></Route>
          <Route path='/dashboard/customer' element={<Customer/>}></Route>
          <Route path='/dashboard/customer/add' element={<CreateCustomer/>}></Route>
          <Route path='/dashboard/customer/read/:id' element={<EditCustomer/>}></Route>
          <Route path='/dashboard/orders' element={<Order/>}></Route>
          <Route path='/dashboard/orders/add' element={<CreateOrder/>}></Route>
          <Route path='/dashboard/orders/read/:id' element={<EditOrder/>}></Route>
          <Route path='/dashboard/repairs' element={<Repair/>}></Route>
          <Route path='/dashboard/repairs/add' element={<CreateRepair/>}></Route>
          <Route path='/dashboard/repairs/read/:id' element={<EditRepair/>}></Route>
          <Route path='/dashboard/report' element={<Report/>}></Route>
          <Route path='/dashboard/billing' element={<Billing/>}></Route>
          <Route path='/dashboard/adminprofile' element={<AdminProfile/>}></Route>
        </Route>
        <Route path='/cashierDashboard/' element={<CahierDashboard/>}>
          <Route path='/cashierDashboard/billing' element={<Billing/>}></Route>
          <Route path='/cashierDashboard/products' element={<Products/>}></Route>
        </Route>
        <Route path='/techdashboard/' element={<TechnicianDashboard/>}>
          <Route path='/techdashboard/showrepairs' element={<ShowRepairs/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
