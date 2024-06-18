import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import Admin from './pages/Admin';
import SuperAdmin from './pages/SuperAdmin';
import RedirectOnLogin from './pages/RedirectOnLogin'
import ImageUploadForm from './pages/ImageUploadForm';
import SubAdminComplete from './pages/SubAdminComplete';


export default function App() {
  return (
    
    <BrowserRouter>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <RedirectOnLogin>
      <Routes>
      
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        
        <Route element={<PrivateRoute allowedRoles={['seller', 'subadmin','superadmin','buyer']} />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/upload' element={<ImageUploadForm />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['subadmin', 'superadmin']} />}>
          <Route path='/admin' element={<Admin />} />
          <Route path='/subadmin' element={<SubAdminComplete />} />
          
        </Route>

        <Route element={<PrivateRoute allowedRoles={['superadmin']} />}>
          <Route path='/superadmin' element={<SuperAdmin />} />

        </Route>
      </Routes>
      </RedirectOnLogin>
    </BrowserRouter>
   
    
  );
}
