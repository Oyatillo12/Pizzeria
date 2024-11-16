import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, SavePage } from '../pages'

const CustomRoutes:React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/save' element={<SavePage/>}/>
      <Route path='*' element={<h2 className='text-[30px] text-center mt-[20px]'>Not Founded Page</h2>}/>
    </Routes>
  )
}

export default CustomRoutes
