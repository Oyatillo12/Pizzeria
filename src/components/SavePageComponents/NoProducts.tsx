import React from 'react'
import ShoppingImg from '../../assets/images/shopping.png'
import { useNavigate } from 'react-router-dom'


const NoProducts: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='w-[547px] mx-auto text-center mt-[50px]'>
            <h2 className='text-[32px] font-bold mb-[10px]'>Корзина пустая 😕</h2>
            <p className='text-[#777777] text-[18px] mb-[37px]'>Вероятней всего, вы не заказывали ещё пиццу.
                Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <img className='mx-auto w-[300px] h-[255px] object-cover mb-[35px]' src={ShoppingImg} alt="Empty img" width={300} height={255} />
            <button onClick={() => navigate(-1)} className='bg-black border-black border hover:bg-transparent hover:text-black duration-300 text-white text-[16px] font-bold py-3 px-5 rounded-[30px]'>Вернуться назад</button>
        </div>
    )
}

export default NoProducts
