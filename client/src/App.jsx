import Register from './components/Register'
import Login from './components/Login'
import { Link, useNavigate, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
  const navigate = useNavigate()

  const signOut = () => {
    localStorage.clear()

    navigate('/login')
  }

  return (
    <>
      <Link to='/login' className='link'>
        Login
      </Link>
      <Link to='/register' className='link'>
        Register
      </Link>
      <button onClick={signOut}>Sign Out</button>

      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
