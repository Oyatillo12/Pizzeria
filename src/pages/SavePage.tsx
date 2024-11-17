import { ArrowLeftOutlined, CloseOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { Products } from '../components/PizzaCard'
import { AppDispatch, RootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { AddIcon, MinusIcon } from '../assets/images/icon'
import { useNavigate } from 'react-router-dom'
import ShoppingImg from '../assets/images/shopping.png'
import { addPizzaToCart, clearShopping, minusPizzaFromCart, removePizzaFromCart } from '../store/PizzaSlice'
import { Context } from '../context/PizzaContext'

const SavePage: React.FC = () => {
  const navigate = useNavigate();
  const boughtedPizza: Products[] = useSelector((state: RootState) => state.bought);
  const allPrice:number = boughtedPizza.reduce((acc: number, item: Products) => acc + item.price, 0);
  const countedPizzas = boughtedPizza.reduce((acc:number, item:Products) => acc + item.count, 0)
  const dispatch: AppDispatch = useDispatch()
  const { setPizzas, pizzas } = useContext(Context)

  function handleClear():void {
    dispatch(clearShopping())
    setPizzas(pizzas.map((p:Products) => ({ ...p, count: 0 })));
  }
  function handleAddPizza(id: number):void {
    const addPizza:Products | undefined = pizzas.find((p:Products) => p.id === id)
    if (addPizza) {
      dispatch(addPizzaToCart(addPizza))
    }
    setPizzas(pizzas.map((p:Products) => p.id === id ? { ...p, count: p.count + 1 } : p));
  }
  function handleRemovePizza(id: number):void {
    dispatch(removePizzaFromCart(id));
    setPizzas(pizzas.map((p:Products) => p.id === id ? { ...p, count: 0 } : p));
  }
  function handleMinusPizza(item: Products):void {
    dispatch(minusPizzaFromCart(item));
    setPizzas(pizzas.map((p: Products) => p.id === item.id ? { ...p, count: p.count - 1 } : p));
  }
  

  return (
    <div>
      {
        boughtedPizza.length > 0 ?
          <div className='mt-[70px] max-w-[820px] w-full mx-auto'>
            <div className='flex items-center justify-between border-b-[1px] border-[#F4F4F4] pb-[20px]'>
              <div className='flex space-x-[30px] items-center justify-center'>
                <ShoppingCartOutlined className='scale-[2]' />
                <h2 className='text-[32px] font-bold leading-[39px]'>Корзина</h2>
              </div>
              <Button onClick={handleClear} className='text-[#B6B6B6]' type='text' icon={<DeleteOutlined />}>Очистить корзину</Button>
            </div>
            {boughtedPizza.map((item: Products) => (
              <div key={item.id} className='flex items-center justify-between py-[30px] border-b-[1px] border-[#F4F4F4]'>
                <div className='flex items-center space-x-[15px] '>
                  <img className='w-[80px] h-[80px] col-span-1 object-cover rounded-lg' src={item.img} alt="Pizza img" width={80} height={80} />
                  <div className='flex flex-col items-start'>
                    <h3 className='text-[22px] font-bold leading-[26px]'>{item.name}</h3>
                    <p className='text-[18px] text-[#8D8D8D]  mt-[3px]'>{item.type} тесто, {item.size}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-3'>
                  <button onClick={() => handleMinusPizza(item)} className='w-[32px] h-[32px] rounded-full border-2 border-[#FE5F1E] text-[#FE5F1E] flex items-center justify-center hover:text-white hover:bg-[#FE5F1E] duration-300'><MinusIcon /></button>
                  <span className='text-[22px] font-bold leading-[26px]'>{item.count}</span>
                  <button onClick={() => handleAddPizza(item.id)} className='w-[32px] h-[32px] rounded-full border-2 border-[#FE5F1E] text-[#FE5F1E] flex items-center justify-center hover:text-white hover:bg-[#FE5F1E] duration-300'><AddIcon /></button>
                </div>
                <div className='flex items-center space-x-[93px]'>
                  <strong className=' text-[22px] leading-[26px]'>{item.price} ₽</strong>
                  <Button onClick={() => handleRemovePizza(item.id)} type='text' className='hover:border-[#00000099] duration-300 text-[#D7D7D7]  w-[32px] h-[32px] border-[#D7D7D7] border-2 rounded-full flex items-center justify-center'><CloseOutlined /></Button>
                </div>
              </div>
            ))}
            <div className='mt-[30px] flex items-center justify-between'>
              <p className='text-[22px] leading-[26px]'>Всего пицц: <strong>{countedPizzas} шт.</strong></p>
              <p className='text-[22px] leading-[26px]'>Сумма заказа: <strong className='text-[#FE5F1E]'>{allPrice} ₽</strong></p>
            </div>
            <div className='mt-[30px] flex items-center justify-between'>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} size='large' type='text' className='border-[#CACACA] text-[#CACACA] border-1 rounded-full'>   Вернуться назад</Button>
              <button className='bg-[#FE5F1E] rounded-[30px] border border-[#FE5F1E] duration-300  text-white text-[16px] py-[8px] px-[20px] hover:bg-transparent hover:text-[#FE5F1E] '>Оплатить сейчас</button>
            </div>
          </div> :
          <div className='w-[547px] mx-auto text-center mt-[50px]'>
            <h2 className='text-[32px] font-bold mb-[10px]'>Корзина пустая 😕</h2>
            <p className='text-[#777777] text-[18px] mb-[37px]'>Вероятней всего, вы не заказывали ещё пиццу.
              Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
            <img className='mx-auto w-[300px] h-[255px] object-cover mb-[35px]' src={ShoppingImg} alt="Empty img" width={300} height={255} />
            <button onClick={() => navigate(-1)} className='bg-black border-black border hover:bg-transparent hover:text-black duration-300 text-white text-[16px] font-bold py-3 px-5 rounded-[30px]'>Вернуться назад</button>
          </div>
      }

    </div>
  )
}

export default SavePage