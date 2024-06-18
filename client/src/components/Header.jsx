import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../Homeassets/logo.png';
import './Header.css';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="navbarout bg-white drop-shadow-2xl"> {/* Set background color to white */}
      <div className='bg-base-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to='/'>
            <div className="logo flex items-center">
              <img src={logo} alt="Logo" className="h-8 sm:h-10 mr-4" /> {/* Adjust height for small and larger screens */}
              <h1 className='font-bold hidden text-lg sm:block'>Janardhan Prasad Memorial Multipurpose Social Service Society</h1>
            </div>
          </Link>
          <ul className='flex gap-4 font-semibold'>
            <Link to='/' className='hover:bg-slate-200  rounded-lg px-2 py-1'>
              <li className='ml-2 mr-2'>Home</li>
            </Link>
            {currentUser && currentUser.role === 'seller' && (
              <Link to='/upload' className='hover:bg-slate-200 rounded-lg px-2 py-1'>
                <li className='ml-2 mr-2'>Upload Image</li>
              </Link>
            )}
            {currentUser && currentUser.role === 'subadmin' && (
              <Link to='/subadmin' className='hover:bg-slate-200  rounded-lg px-2 py-1'>
                <li className='ml-2 mr-2'>SubAdmin Dashboard</li>
              </Link>
            )}
            {currentUser && currentUser.role === 'superadmin' && (
              <Link to='/superadmin' className='hover:bg-slate-200 rounded-lg px-2 py-1'>
                <li className='ml-2 mr-2'>SuperAdmin Dashboard</li>
              </Link>
            )}
            {currentUser && (
              <Link to='/cart' className='hover:bg-slate-200 rounded-lg px-2 py-1'>
                <li className='ml-2 mr-2'>Cart</li>
              </Link>
            )}
            <Link to={currentUser ? '/profile' : '/sign-in'} className='hover:bg-gray-100 rounded-lg px-2 py-1'>
              {currentUser ? (
                <img
                  src={currentUser.profilePicture}
                  alt='profile'
                  className='h-7 w-7 rounded-full object-cover ml-2 mr-2'
                />
              ) : (
                <li className='ml-2 mr-2'>Sign In</li>
              )}
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
