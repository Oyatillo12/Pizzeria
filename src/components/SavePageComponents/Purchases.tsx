import { ArrowLeftOutlined, CheckCircleOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import React, { useContext, useState } from 'react'
import SavedPizzas from '../SavePageComponents/SavedPizzas'
import { clearShopping } from '../../store/PizzaSlice'
import { Products } from '../HomePage/PizzaCard'
import { useDispatch, useSelector } from 'react-redux'
import { Context } from '../../context/PizzaContext'
import { AppDispatch, RootState } from '../../store/store'
import { useNavigate } from 'react-router-dom'

const Purchases: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [isBuy, setisBuy] = useState<boolean>(false);
    const handleShowModal = () => {
        setOpen(true);
    };
    const boughtedPizza: Products[] = useSelector((state: RootState) => state.bought);
    const allPrice: number = boughtedPizza.reduce((acc: number, item: Products) => acc + item.price, 0);
    const countedPizzas = boughtedPizza.reduce((acc: number, item: Products) => acc + item.count, 0)
    const dispatch: AppDispatch = useDispatch()
    const { setPizzas, pizzas } = useContext(Context)


    function clearAll(): void {
        dispatch(clearShopping())
        setPizzas(pizzas.map((p: Products) => ({ ...p, count: 0 })));
    }
    // clear all 
    function handleClear(): void {
        clearAll();
    }
    // buy all items 
    const handleBuy = ():void => {
        setisBuy(true);
        setTimeout(() => {
            clearAll();
            setisBuy(false);
            setOpen(false);
        },1000)
    };
    return (
        <>
            <div className='mt-[70px] max-w-[820px] w-full mx-auto'>
                <div className='flex items-center justify-between border-b-[1px] border-[#F4F4F4] pb-[20px]'>
                    <div className='flex space-x-[30px] items-center justify-center'>
                        <ShoppingCartOutlined className='scale-[2]' />
                        <h2 className='text-[32px] font-bold leading-[39px]'>Корзина</h2>
                    </div>
                    <Button onClick={handleClear} className='text-[#B6B6B6]' type='text' icon={<DeleteOutlined />}>Очистить корзину</Button>
                </div>
                <SavedPizzas />
                <div className='mt-[30px] flex items-center justify-between'>
                    <p className='text-[22px] leading-[26px]'>Всего пицц: <strong>{countedPizzas} шт.</strong></p>
                    <p className='text-[22px] leading-[26px]'>Сумма заказа: <strong className='text-[#FE5F1E]'>{allPrice} ₽</strong></p>
                </div>
                <div className='mt-[30px] flex items-center justify-between'>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} size='large' type='text' className='border-[#CACACA] text-[#CACACA] border-1 rounded-full'>   Вернуться назад</Button>
                    <button onClick={handleShowModal} className='bg-[#FE5F1E] rounded-[30px] border border-[#FE5F1E] duration-300  text-white text-[16px] py-[8px] px-[20px] hover:bg-transparent hover:text-[#FE5F1E] '>Оплатить сейчас</button>
                </div>
            </div>
            <Modal closeIcon={false} footer open={open}
                onCancel={() => {
                    setOpen(false)
                    setisBuy(false)
                }}>
                <div className='h-[100px] flex items-center justify-center flex-col'>
                    {isBuy ? <CheckCircleOutlined className='scale-[4]   text-lime-500  block mx-auto' /> : <>
                        <p className='text-[22px] mb-2 leading-[26px]'>Всего пицц: <strong>{countedPizzas} шт.</strong></p>
                        <p className='text-[22px] leading-[26px]'>Сумма заказа: <strong className='text-[#FE5F1E]'>{allPrice} ₽</strong></p>
                        <button onClick={handleBuy} className='bg-[#FE5F1E] mx-auto block mt-3 rounded-[30px] border border-[#FE5F1E] duration-300  text-white text-[16px] py-[8px] px-[20px] hover:bg-transparent hover:text-[#FE5F1E] '>Оплатить</button>
                    </>}
                </div>

            </Modal>
        </>
    )
}

export default Purchases
