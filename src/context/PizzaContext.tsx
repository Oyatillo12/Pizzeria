import { useQuery } from "@tanstack/react-query";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { Products } from "../components/PizzaCard";


interface ContextType {
    catogoryID: string | number,
    setCategoryID: React.Dispatch<React.SetStateAction<number | string>>;
    pizzas: Products[],
    setPizzas:React.Dispatch<React.SetStateAction<Products[]>>,
 
}

export const Context = createContext<ContextType>({
    catogoryID: '',
    setCategoryID: () => {},
    pizzas: [] ,
    setPizzas: () => {},
 
})

const PizzaContext:React.FC<{children:ReactNode}> = ({children}) => {
    const [pizzas, setPizzas] = useState<Products[]>([]) 
    const [catogoryID, setCategoryID] = useState<string | number>('');


    const { data: products = [] } = useQuery({
        queryKey: ['products', catogoryID,],
        queryFn: () => useAxios().get(`/products?category_id=${catogoryID  == "1" ? "" : catogoryID}`).then(res => res.data),
    })

    useEffect(() =>{
        setPizzas(products)
    },[products,catogoryID])

    return (
        <Context.Provider value={{ catogoryID,setCategoryID,pizzas,setPizzas}}>
            {children}
        </Context.Provider>
    )
    
}

export default PizzaContext;
