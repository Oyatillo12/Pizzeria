import NavTopItem from '../components/HomePage/NavTopItem';
import PizzaCard from '../components/HomePage/PizzaCard';

const Home: React.FC = () => {
    return (
        <div className='border-[#F6F6F6] mt-[25px] max-sm:mt-[15px] lg:mt-[40px] pt-[25px] max-sm:pt-3 lg:pt-[40px] border-t-2'>
            <NavTopItem />
            <div className='mt-5 md:mt-8'>
                <h2 className='font-bold text-[24px] md:text-[32px] md:leading-[39px] leading0[29px]'>Все пиццы</h2>
                <PizzaCard />
            </div>
        </div>
    )
}

export default Home
