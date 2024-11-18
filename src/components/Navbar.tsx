import React from 'react'
import LogoImg from '../assets/images/logo.png'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Products } from './HomePage/PizzaCard'
import { useLocation, useNavigate } from 'react-router-dom'


const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const boughtedPizza: Products[] = useSelector((state: RootState) => state.bought)
  const countedPizzas = boughtedPizza.reduce((acc: number, item: Products) => acc + item.count, 0)
  const allPrice = boughtedPizza.reduce((acc: number, item: Products) => acc + item.price, 0)

  return (
    <header className='top-[-50px] z-50 sticky flex justify-between items-center bg-white py-2 max-md:py-1 rounded-lg w-full'>
      <div className='flex items-center space-x-4'>
        <img className='max-md:w-[30px] max-md:h-[30px]' src={LogoImg} alt="Logo img " width={38} height={38} />
        <div className='max-sm:w-[126px]'>
          <h2 className='font-extrabold text-[#181818] text-[24px] max-md:text-[18px] leading-[29px]'>Pizzeria</h2>
          <p className='inline text-[#7B7B7B] text-[16px] max-md:text-[13px] leading-[19px]'>самая вкусная пицца во вселенной</p>
        </div>
      </div>
      {!pathname.includes('save') ? <button onClick={() => navigate('/save')} className='relative after:absolute after:inset-x-auto flex justify-center items-center space-x-[27px] max-md:space-x-5 bg-[#FE5F1E] after:bg-[#FFFFFF40] after:mx-auto px-[20px] max-md:px-[15px] py-[15px] max-md:py-[10px] rounded-[30px] after:w-[1px] after:h-[25px] font-bold text-[16px] text-white max-md:text-[13px] leading-[19px]'>
        <span className='left-2 inset-y-auto'>{allPrice} ₽</span>
        <div className='flex items-center space-x-2 max-md:space-x-1'>
          <ShoppingCartOutlined className='sm:scale-110 scale-90' />
          <span >{countedPizzas}</span>
        </div>
      </button> : null}
    </header>
  )
}

export default Navbar