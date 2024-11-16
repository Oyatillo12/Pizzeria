import './App.css'
import Navbar from './components/Navbar'
import CustomRoutes from './routes'

function App() {

  return (
    <div className='pt-[49px] pb-[96px] px-[67px] bg-white rounded-lg h-[91vh] overflow-y-auto'>
      <Navbar/>
      <CustomRoutes/>
    </div>
  )
}

export default App
