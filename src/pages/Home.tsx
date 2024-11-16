import NavTopItem from '../components/NavTopItem';
import PizzaCard from '../components/PizzaCard';





const Home: React.FC = () => {
    return (
        <div className='mt-[40px] pt-[40px] border-t-2 border-[#F6F6F6]'>
            <NavTopItem />
            <div className='mt-8'>
                <h2 className='text-[32px] leading-[39px] font-bold'>Все пиццы</h2>
                <PizzaCard />
            </div>
        </div>
    )
}

export default Home
