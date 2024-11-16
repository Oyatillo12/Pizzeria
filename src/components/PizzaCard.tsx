import React, { useContext, useState } from 'react'
import { Button, Segmented } from 'antd';
import { AddIcon } from '../assets/images/icon';
import { Context } from '../context/PizzaContext';
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../store/store';
import { addPizzaToCart } from '../store/PizzaSlice';

export interface Products {
    id: number;
    name: string;
    price: number;
    categoryId: string;
    count: number;
    img: string;
    size?: string;
    type?: string;
}


const PizzaCard: React.FC = () => {
    const [_productType, _setProductType] = useState('1');
    const sizePizza: string[] = ["26 см.", "30 см.", "40 см."];
    const typePizza: string[] = ["тонкое", "традиционное"];
    const { pizzas, setPizzas } = useContext(Context)
    const [typePZ, setTypePZ] = useState<string>('')
    const [sizePZ, setSizePZ] = useState<string>('')
    const dispatch: AppDispatch = useDispatch()


    function handleAddToCart(item: Products) {
        item.size = sizePZ ? sizePZ : "26 см."
        item.type = typePZ ? typePZ : "тонкое"
        setPizzas(pizzas.map(pizza => pizza.id == item.id ? { ...pizza, count: pizza.count + 1 } : pizza))
        dispatch(addPizzaToCart(item))
    }

    return (
        <div className='flex flex-wrap items-center mt-[35px] gap-[35px] justify-between'>
            {pizzas.length ? pizzas.map((item: Products) => (
                <div key={item.id} className='w-[260px]'>
                    <img className='w-full rounded-lg h-[260px] object-cover' src={item.img} alt={item.name} width={260} height={260} />
                    <div className='mt-[11px] w-[90%] mx-auto'>
                        <h3 className='text-[22xp] font-bold text-center leading-[24px]'>{item.name}</h3>
                        <div className='flex items-center justify-center flex-col bg-[#F3F3F3] rounded-lg p-[4px]  mx-auto mt-[22px]'>
                            <Segmented<string> size='large' className='!font-bold !bg-transparent  !text-[14px] !leading-[17px] '
                                options={typePizza} onChange={(value) => setTypePZ(value)}
                            />
                            <Segmented<string> size='large' className='!font-bold !bg-transparent  !text-[14px] !leading-[17px] ' options={sizePizza}  onChange={(value) => setSizePZ(value)}
                            />
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <strong className='text-[18px] leading-[22px] font-bold'> от {item.price} ₽</strong>
                            <Button onClick={() => handleAddToCart(item)} type='text' icon={<AddIcon />} className='text-[#EB5A1E] w-[150px] rounded-full relative py-[15px] border-[#EB5A1E] text-[16px] leading-[19px] font-bold border hover:!text-[#EB5A1E] hover:!bg-[#00000011] duration-300'><span>Добавить</span>
                                {item.count > 0 ? <span className='absolute bg-[#FE5F1E] h-[20px] text-[11] inset-y-0 my-auto right-1 w-[20px] text-white rounded-full'>{item.count}</span> : null}
                            </Button>
                        </div>
                    </div>
                </div>
            )) : null}
        </div>
    )
}

export default PizzaCard
