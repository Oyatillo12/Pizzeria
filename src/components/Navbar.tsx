import React from 'react'
import LogoImg from '../assets/images/logo.png'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Products } from './PizzaCard'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const boughtedPizza:Products[] = useSelector((state:RootState) => state.bought)
  const allPrice = boughtedPizza.reduce((acc:number, item:Products) => acc + item.price, 0)

  return (
    <header className='flex items-center justify-between sticky top-[-50px] py-2 z-50 bg-white rounded-lg w-full'>
      <div className='flex items-center space-x-4'>
        <img src={LogoImg} alt="Logo img " width={38} height={38} />
        <div className='flex flex-col items-start'>
          <h2 className='text-[24px] leading-[29px] font-extrabold text-[#181818]'>REACT PIZZA</h2>
          <p className='text-[#7B7B7B] text-[16px] leading-[19px]'>самая вкусная пицца во вселенной</p>
        </div>
      </div>
     { !pathname.includes('save') ? <button onClick={() => navigate('/save')} className='px-[20px]  flex items-center justify-center space-x-[27px] py-[15px] bg-[#FE5F1E] relative rounded-[30px] font-bold text-white text-[16px] leading-[19px] after:absolute after:w-[1px] after:inset-x-auto after:mx-auto after:h-[25px] after:bg-[#FFFFFF40] '>
        <span className=' left-2  inset-y-auto '>{allPrice} ₽</span>
        <div className='flex right-6 inset-y-auto items-center  space-x-2'>
          <ShoppingCartOutlined className='scale-110' />
          <span >{boughtedPizza.length}</span>
        </div>
      </button> : null}
    </header>
  )
}

export default Navbar