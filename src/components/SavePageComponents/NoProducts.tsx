import React from 'react'
import ShoppingImg from '../../assets/images/shopping.png'
import { useNavigate } from 'react-router-dom'


const NoProducts: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='mx-auto mt-[20px] sm:mt-[50px] w-full max-w-[547px] text-center'>
            <h2 className='mb-[10px] font-bold text-[24px] sm:text-[32px]'>Корзина пустая 😕</h2>
            <p className='mb-[20px] sm:mb-[37px] text-[#777777] text-[14px] ms:text-[18px]'>Вероятней всего, вы не заказывали ещё пиццу.
                Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <img className='mx-auto mb-[20px] sm:mb-[35px] w-[250px] ms:w-[300px] h-[205px] sm:h-[255px] object-cover' src={ShoppingImg} alt="Empty img" width={300} height={255} />
            <button onClick={() => navigate(-1)} className='bg-black hover:bg-transparent px-3 sm:px-5 py-1 sm:py-3 border border-black rounded-[30px] font-bold text-[14px] text-white sm:text-[16px] hover:text-black duration-300'>Вернуться назад</button>
        </div>
    )
}

export default NoProducts
