import React, { useContext, useState } from 'react'
import { Button, Segmented } from 'antd';
import { AddIcon } from '../../assets/images/icon';
import { Context } from '../../context/PizzaContext';
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../../store/store';
import { addPizzaToCart } from '../../store/PizzaSlice';

export interface Products {
    id: number;
    name: string;
    price: number;
    categoryId: string;
    count: number;
    img: string;
    size?: string;
    type?: string;
};

const PizzaCard: React.FC = () => {
    const sizePizza: string[] = ["26 см.", "30 см.", "40 см."];
    const typePizza: string[] = ["тонкое", "традиционное"];
    const { pizzas, setPizzas, isLoading } = useContext(Context)
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
        <div className='flex flex-wrap justify-center lg:justify-between items-center gap-[50px] lg:gap-[35px] mt-[35px]'>
            {isLoading ? 
            <div className='mx-auto mt-[70px] loader'></div> : pizzas.length ? pizzas.map((item: Products) => (
                <div key={item.id} className='w-[340px] lg:w-[260px]'>
                    <img className='rounded-lg w-full h-[260px] object-cover' src={item.img} alt={item.name} width={260} height={260} />
                    <div className='mx-auto mt-[5px] lg:mt-[11px] w-full'>
                        <h3 className='font-bold text-[18px] text-center lg:text-[22xp] leading-[24px]'>{item.name}</h3>
                        <div className='flex flex-col justify-center items-center mt-[22px] rounded-lg'>
                            <Segmented<string> size='large' className='!rounded-b-none w-full font-bold !text-[14px] !leading-[14px]'
                                options={typePizza} onChange={(value) => setTypePZ(value)}
                            />
                            <Segmented<string> size='large' className='!rounded-t-none w-full font-bold !text-[14px] !leading-[17px]' options={sizePizza}  onChange={(value) => setSizePZ(value)}
                            />
                        </div>
                        <div className='flex justify-between items-center mt-4'>
                            <strong className='font-bold text-[18px] leading-[22px]'> от {item.price} ₽</strong>
                            <Button onClick={() => handleAddToCart(item)} type='text' icon={<AddIcon />} className='relative border-[#EB5A1E] hover:!bg-[#00000011] py-[15px] border rounded-full w-[150px] font-bold text-[#EB5A1E] text-[16px] hover:!text-[#EB5A1E] leading-[19px] duration-300'><span>Добавить</span>
                                {item.count > 0 ? <span className='right-1 absolute inset-y-0 bg-[#FE5F1E] my-auto rounded-full w-[20px] h-[20px] text-[11] text-white'>{item.count}</span> : null}
                            </Button>
                        </div>
                    </div>
                </div>
            )) : <p className='mx-auto mt-[50px] font-bold text-[25px] text-center'>Not any pizzas</p>}
        </div>
    )
}

export default PizzaCard
