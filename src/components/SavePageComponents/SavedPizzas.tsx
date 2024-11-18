import React, { useContext } from 'react'
import { Products } from '../HomePage/PizzaCard'
import { AddIcon, MinusIcon } from '../../assets/images/icon'
import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { AppDispatch, RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { Context } from '../../context/PizzaContext'
import { addPizzaToCart, minusPizzaFromCart, removePizzaFromCart } from '../../store/PizzaSlice'

const SavedPizzas: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const { setPizzas, pizzas } = useContext(Context)
    const boughtedPizza: Products[] = useSelector((state: RootState) => state.bought);

    // add to cart
    function handleAddPizza(item: Products): void {
        dispatch(addPizzaToCart({ ...item, price: item.price / item.count }))
        setPizzas(pizzas.map((p: Products) => p.id === item.id ? { ...p, count: p.count + 1 } : p));
    }
    // remove from cart
    function handleRemovePizza(id: number): void {
        dispatch(removePizzaFromCart(id));
        setPizzas(pizzas.map((p: Products) => p.id === id ? { ...p, count: 0 } : p));
    }
    // minus from cart
    function handleMinusPizza(item: Products): void {
        dispatch(minusPizzaFromCart(item));
        setPizzas(pizzas.map((p: Products) => p.id === item.id ? { ...p, count: p.count - 1 } : p));
    }

    return (
        <div>
            {boughtedPizza.map((item: Products) => (
                <div key={item.id} className='relative flex justify-between items-center border-[#F4F4F4] py-2 sm:py-4 md:py-[30px] border-b-[1px] w-full'>
                    <div className='flex items-center space-x-2 md:space-x-[15px]'>
                        <img className='col-span-1 rounded-lg w-[60px] md:w-[80px] h-[60px] md:h-[80px] object-cover' src={item.img} alt="Pizza img" width={80} height={80} />
                        <div className='flex flex-col items-start'>
                            <h3 className='font-bold text-[14px] sm:text-[17px] md:text-[22px] leading-[26px]'>{item.name}</h3>
                            <p className='md:mt-[3px] text-[#8D8D8D] text-[12px] sm:text-[14px] md:text-[18px]'>{item.type} тесто, {item.size}</p>
                        </div>
                    </div>
                    <div className='max-sm:flex max-sm:flex-col max-sm:justify-end items-center'>
                        <div className='sm:left-[280px] md:left-[350px] lg:left-[442px] sm:absolute inset-x-0 flex items-center space-x-[6px] sm:space-x-3 sm:mx-auto max-sm:mr-0 max-sm:mb-1'>
                            <button onClick={() => handleMinusPizza(item)} className='flex justify-center items-center border-[#FE5F1E] border-2 hover:bg-[#FE5F1E] rounded-full w-[24px] sm:w-[32px] h-[24px] sm:h-[32px] text-[#FE5F1E] hover:text-white duration-300'><MinusIcon /></button>
                            <span className='font-bold text-[16px] sm:text-[22px] leading-[26px]'>{item.count}</span>
                            <button onClick={() => handleAddPizza(item)} className='flex justify-center items-center border-[#FE5F1E] border-2 hover:bg-[#FE5F1E] rounded-full w-[24px] sm:w-[32px] h-[24px] sm:h-[32px] text-[#FE5F1E] hover:text-white duration-300'><AddIcon /></button>
                        </div>
                        <strong className='sm:hidden text-[16px] leading-[18px]'>{item.price} ₽</strong>
                    </div>
                    <div className='flex items-center space-x-4 sm:space-x-[40px] md:space-x-[93px] max-sm:hidden'>
                        <strong className='text-[16px] sm:text-[22px] leading-[26px]'>{item.price} ₽</strong>
                        <Button onClick={() => handleRemovePizza(item.id)} type='text' className='flex justify-center items-center border-[#D7D7D7] border-2 hover:border-[#00000099] rounded-full w-[18px] sm:w-[32px] h-[32px] text-[#D7D7D7] duration-300'><CloseOutlined className='' /></Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SavedPizzas
