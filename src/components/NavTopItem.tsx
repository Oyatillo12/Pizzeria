import { useQuery } from '@tanstack/react-query'
import React, { useContext, useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { Context } from '../context/PizzaContext';
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
    const { setPizzas, pizzas,setCategoryID } = useContext(Context)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleSelect = (option: SortOption) => {
        setSelectedSort(option);
        setIsOpen(false);
        setPizzas(pizzas.sort((a: Products, b: Products) => b.price - a.price))
    };



    const { data = [] } = useQuery({
        queryKey: ['category'],
        queryFn: () => useAxios().get('/category').then(res => res.data)
    })

    useEffect(() => {
        setCategories(data)
    }, [data])

    function handeClick(id: number) {
        setCategoryID(id)
        setCategories(categories.map((item: Category) => ({
            ...item,
            isActive: item.id === id
        }))
        )
    }

    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
                {categories.length > 0 ? categories.map((item: Category) => (
                    <button onClick={() => handeClick(item.id)} className={` text-[16px] rounded-full font-bold py-[15px] px-[30px] duration-500  ${item.isActive ? "bg-[#282828] text-white" : "bg-[#F9F9F9] text-black"}`} key={item.id}>{item.name}</button>
                )) : null}
            </div>
            <div className="relative inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    className="text-gray-800 font-semibold focus:outline-none flex items-center"
                >
                    Сортировка по:
                    <span className="ml-1 text-orange-500 font-bold">{selectedSort.label}</span>
                </button>

                {isOpen && (
                    <ul className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        {SORT_OPTIONS.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 ${selectedSort.value === option.value ? 'bg-gray-50 text-orange-500 font-bold' : 'text-gray-700'
                                    }`}
                            >
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
