import Home from './pages/home/Home';
import './styles/index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { apiRoutes } from './utils/constants';
import PageNotFound from './pages/404/404';
import Cart from './pages/cart/Cart';
import LoadingPage from './components/loadinPage/loadinPage';
import useLoadFonts from './hooks/useLoadFonts';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Orders from './pages/orders/orders';

function App() {
  const { windowLoaded, fontsLoaded } = useLoadFonts()

  if (!windowLoaded || !fontsLoaded) return <div style={{ width: "100vw", height: "100vh" }}><LoadingPage /></div>;

  return (
    <BrowserRouter>
      <div className="appPage">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={apiRoutes.cart} element={<Cart />} />
          <Route path={apiRoutes.orders} element={<Orders />} />
          <Route path={apiRoutes.login} element={<Login />} />
          <Route path={apiRoutes.register} element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
