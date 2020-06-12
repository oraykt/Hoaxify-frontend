import React from 'react'
import { useSelector } from 'react-redux'
import UserList from '../components/UserList'
import HoaxSubmit from '../components/HoaxSubmit'
import HoaxFeed from '../components/HoaxFeed'

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }))
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          {isLoggedIn && (
            <div className='mb-2'>
              <HoaxSubmit />
            </div>
          )}
          <HoaxFeed />
        </div>
        <div className='col-4'>
          <UserList />
        </div>
      </div>
    </div>
  )
}

export default HomePage
