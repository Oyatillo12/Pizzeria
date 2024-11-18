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
            <div className='mx-auto mt-6 sm:mt-[70px] w-full max-w-full lg:max-w-[820px]'>
                <div className='flex justify-between items-center border-[#F4F4F4] pb-3 sm:pb-[20px] border-b-[1px]'>
                    <div className='flex justify-center items-center space-x-4 sm:space-x-[30px]'>
                        <ShoppingCartOutlined className='sm:scale-[2] scale-150' />
                        <h2 className='font-bold text-[24px] sm:text-[32px] leading-[39px]'>Корзина</h2>
                    </div>
                    <Button onClick={handleClear} className='!max-sm:w-[70px] text-[#B6B6B6]' type='text' icon={<DeleteOutlined />}>Очистить корзину</Button>
                </div>
                <SavedPizzas />
                <div className='flex justify-between items-center mt-[20px] sm:mt-[30px]'>
                    <p className='text-[16px] sm:text-[22px] leading-[26px]'>Всего пицц: <strong>{countedPizzas} шт.</strong></p>
                    <p className='text-[16px] sm:text-[22px] leading-[26px]'>Сумма заказа: <strong className='text-[#FE5F1E]'>{allPrice} ₽</strong></p>
                </div>
                <div className='flex justify-between items-center mt-[15px] sm:mt-[30px]'>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} size='large' type='text' className='border-[#CACACA] border-1 rounded-full text-[#CACACA] max-sm:text-[12px]'>   Вернуться назад</Button>
                    <button onClick={handleShowModal} className='border-[#FE5F1E] bg-[#FE5F1E] hover:bg-transparent px-[20px] py-[8px] border rounded-[30px] text-[16px] text-white max-sm:text-[12px] hover:text-[#FE5F1E] duration-300'>Оплатить сейчас</button>
                </div>
            </div>
            <Modal closeIcon={false} footer open={open}
                onCancel={() => {
                    setOpen(false)
                    setisBuy(false)
                }}>
                <div className='flex flex-col justify-center items-center h-[100px]'>
                    {isBuy ? <CheckCircleOutlined className='block mx-auto text-lime-500 scale-[4]' /> : <>
                        <p className='mb-2 text-[16px] sm:text-[22px] leading-[26px]'>Всего пицц: <strong>{countedPizzas} шт.</strong></p>
                        <p className='text-[16px] sm:text-[22px] leading-[26px]'>Сумма заказа: <strong className='text-[#FE5F1E]'>{allPrice} ₽</strong></p>
                        <button onClick={handleBuy} className='block border-[#FE5F1E] bg-[#FE5F1E] hover:bg-transparent mx-auto mt-3 px-[20px] py-[8px] border rounded-[30px] text-[16px] text-white max-sm:text-[12px] hover:text-[#FE5F1E] duration-300'>Оплатить</button>
                    </>}
                </div>

            </Modal>
        </>
    )
}

export default Purchases
