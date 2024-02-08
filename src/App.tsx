import Home from './pages/home/Home';
import './styles/index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { apiRoutes } from './utils/constants';
import PageNotFound from './pages/404/404';
import Cart from './pages/cart/Cart';
import LoadingPage from './components/loadinPage/loadinPage';
import useLoadFonts from './hooks/useLoadFonts';
import NavbarComponent from './ui/Navbar/Navbar';

function App() {
  const { windowLoaded, fontsLoaded } = useLoadFonts()

  if (!windowLoaded || !fontsLoaded) return <div style={{ width: "100vw", height: "100vh" }}><LoadingPage /></div>;
  return (
    <BrowserRouter>
      <div className="appPage">
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={apiRoutes.cart} element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
