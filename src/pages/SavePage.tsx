import React from 'react'
import { Products } from '../components/HomePage/PizzaCard'
import {  RootState } from '../store/store'
import {  useSelector } from 'react-redux'
import NoProducts from '../components/SavePageComponents/NoProducts'
import Purchases from '../components/SavePageComponents/Purchases'

const SavePage: React.FC = () => {
  const boughtedPizza: Products[] = useSelector((state: RootState) => state.bought);

  return (
    <div>
      { boughtedPizza.length > 0 ? <Purchases/> :  <NoProducts/> }
    </div>
  )
}

export default SavePage