import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import SidebarCart from './components/sidebarCart/SidebarCart'
import FloatingCart from './components/floatingCart/FloatingCart'
import { AppRoutes } from './routes/AppRoutes'
import { CartProvider } from './context/CartReducer'
import { LanguageProvider } from './context/LanguageContext'
import { store } from './stores/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
    <LanguageProvider>

      <BrowserRouter>
        <CartProvider>
          <div className="navbar-positioned">
            <Navbar />
          </div>
          <AppRoutes />
          <div className="footer-positioned">
            <Footer />
          </div>
          <SidebarCart />
          <FloatingCart />
        </CartProvider>
      </BrowserRouter>
    </LanguageProvider>
    </Provider>
  )
}

export default App