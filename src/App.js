import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Registration from './Pages/Registration/Registration';
import Cart from './Pages/Cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDescription from './Pages/ProductDescription/ProductDescription';
import ProtectedRoutes from './Components/ProtectedRoute/ProtectedRouter';
import Orders from './Pages/Orders/Orders';
import Admin from './Pages/Admin/Admin';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path='/' element={<ProtectedRoutes><Home></Home></ProtectedRoutes>} />
          <Route exact path='/home' element={<ProtectedRoutes><Home></Home></ProtectedRoutes>} />
          <Route exact path='/orders' element={<ProtectedRoutes><Orders></Orders></ProtectedRoutes>} />
          <Route exact path='/cart' element={<ProtectedRoutes><Cart></Cart></ProtectedRoutes>} />
          <Route exact path='/admin' element={<ProtectedRoutes><Admin></Admin></ProtectedRoutes>} />
          <Route exact path='/productInfo/:productId' element={<ProtectedRoutes><ProductDescription></ProductDescription></ProtectedRoutes>} />
          <Route exact path='/login' element={<Login></Login>} />
          <Route exact path='/register' element={<Registration></Registration>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
