import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const { data } = await axios.post('http://localhost:5000/auth/register', {
      email,
      password,
    })

    if (data.status == 'ok') {
      navigate('/login')
    } else {
      alert(data.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/dashboard')
  }, [])

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='email'
        />
        <br />
        <input
          type='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder='password'
        />
        <br />
        <input type='submit' value='Register' />
      </form>
    </main>
  )
}

export default Register
