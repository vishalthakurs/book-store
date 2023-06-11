import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import MyNavbar from './component/MyNavbar';
import Logout from './pages/Logout';
import ListingPage from './pages/ListingPage';
import Detail from './pages/Detail';
import ViewOrders from './pages/ViewOrders';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <div className="container">
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/book/list' element={<ListingPage />}></Route>
        <Route path='/book/view/:bookid' element={<Detail />}></Route>
        <Route path='/book/orders' element={<ViewOrders />}></Route>
        <Route path='/book/orders/:orderid' element={<OrderDetails />}></Route>
      </Routes>
    </div>
  );
}

export default App;
