import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { useAxios } from '../../hooks/useAxios'
import { Context } from '../../context/PizzaContext';
import { Products } from './PizzaCard';

interface Category {
    id: number;
    name: string;
    isActive: boolean
}
const SORT_OPTIONS = [
    { value: '1', label: 'по пулярности' },
    { value: '2', label: 'по цене' },
    { value: '3', label: 'по алфавиту' },
];

type SortOption = {
    value: string;
    label: string;
};
const NavTopItem: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState<SortOption>(SORT_OPTIONS[0]);
    const { setPizzas, pizzas, setCategoryID } = useContext(Context)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSelect = (option: SortOption) => {
        setSelectedSort(option);
        setIsOpen(false);
        setPizzas([...pizzas].sort((a: Products, b: Products) => {
            if (option.value === '1') {
                return a.id - b.id
            } else if (option.value === '2') {
                return a.price - b.price
            } else {
                return a.name.localeCompare(b.name)
            }
        }))
    };



    const { data = [] } = useQuery({
        queryKey: ['category'],
        queryFn: () => useAxios().get('/category').then(res => res.data)
    });

    useEffect(() => {
        setCategories(data)
    }, [data]);

    function handeClick(id: number) {
        setCategoryID(id)
        setCategories(categories.map((item: Category) => ({
            ...item,
            isActive: item.id === id
        })));
    };

    return (
        <div className='flex justify-between items-center max-md:overflow-x-auto'>
            <div className='flex items-center space-x-2 max-xl:space-x-1'>
                {categories.length > 0 ? categories.map((item: Category) => (
                    <button onClick={() => handeClick(item.id)} className={` xl:text-[16px] text-[13px] rounded-full font-bold xl:py-[15px] py-[8px] px-[20px] xl:px-[30px] duration-500   ${item.isActive ? "bg-[#282828] text-white" : "bg-[#F9F9F9] text-black"}`} key={item.id}>{item.name}</button>
                )) : null}
            </div>
            <div className="inline-block relative max-md:hidden text-left">
                <button onClick={toggleDropdown} className="flex max-lg:flex-col items-center font-semibold text-gray-800 max-lg:text-[14px] focus:outline-none">
                    Сортировка по: <span className="ml-1 w-[115px] font-bold text-orange-500">{selectedSort.label}</span>
                </button>
                {isOpen && (
                    <ul className="z-50 absolute border-gray-200 bg-white shadow-lg mt-2 border rounded-lg">
                        {SORT_OPTIONS.map((option) => (
                            <li key={option.value} onClick={() => handleSelect(option)} className={`lg:px-4 px-2 z-50 lg:py-2 py-1 cursor-pointer rounded-lg text-sm hover:bg-gray-100 ${selectedSort.value === option.value ? 'bg-gray-50 text-orange-500 font-bold' : 'text-gray-700'}`}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default NavTopItem
