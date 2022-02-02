import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [bio, setBio] = useState('')
  const [newBio, setNewBio] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) navigate('/login')

    async function fetchBio() {
      const { data } = await axios.get('http://localhost:5000/auth/getbio', {
        headers: {
          'x-access-token': localStorage.getItem('user'),
        },
      })

      setBio(data.bio)
    }

    fetchBio()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    const { data } = await axios.post(
      'http://localhost:5000/auth/setbio',
      {
        bio: newBio,
      },
      {
        headers: {
          'x-access-token': localStorage.getItem('user'),
        },
      }
    )

    if (data.status == 'ok') {
      alert('Success')
      setBio(newBio)

      setNewBio('')
    }
  }

  return (
    <main>
      Bio: {bio}
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Bio'
          value={newBio}
          onChange={e => setNewBio(e.target.value)}
        />
        <input type='submit' value='Set Bio' />
      </form>
    </main>
  )
}

export default Dashboard
