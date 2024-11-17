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
            dispatch(addPizzaToCart({...item, price: item.price / item.count}))
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
                <div key={item.id} className='flex relative items-center w-full justify-between py-[30px] border-b-[1px] border-[#F4F4F4]'>
                    <div className='flex items-center space-x-[15px] '>
                        <img className='w-[80px] h-[80px] col-span-1 object-cover rounded-lg' src={item.img} alt="Pizza img" width={80} height={80} />
                        <div className='flex flex-col items-start'>
                            <h3 className='text-[22px] font-bold leading-[26px]'>{item.name}</h3>
                            <p className='text-[18px] text-[#8D8D8D]  mt-[3px]'>{item.type} тесто, {item.size}</p>
                        </div>
                    </div>
                    <div className='flex absolute mx-auto inset-x-0 left-[442px] items-center space-x-3'>
                        <button onClick={() => handleMinusPizza(item)} className='w-[32px] h-[32px] rounded-full border-2 border-[#FE5F1E] text-[#FE5F1E] flex items-center justify-center hover:text-white hover:bg-[#FE5F1E] duration-300'><MinusIcon /></button>
                        <span className='text-[22px] font-bold leading-[26px]'>{item.count}</span>
                        <button onClick={() => handleAddPizza(item)} className='w-[32px] h-[32px] rounded-full border-2 border-[#FE5F1E] text-[#FE5F1E] flex items-center justify-center hover:text-white hover:bg-[#FE5F1E] duration-300'><AddIcon /></button>
                    </div>
                    <div className='flex items-center space-x-[93px]'>
                        <strong className=' text-[22px] leading-[26px]'>{item.price} ₽</strong>
                        <Button onClick={() => handleRemovePizza(item.id)} type='text' className='hover:border-[#00000099] duration-300 text-[#D7D7D7]  w-[32px] h-[32px] border-[#D7D7D7] border-2 rounded-full flex items-center justify-center'><CloseOutlined /></Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SavedPizzas
