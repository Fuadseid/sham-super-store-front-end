import './FirstHighlights.scss'
import { useLanguage } from '../../../context/LanguageContext'
import home from '../../../assets/images/home/firstHighlights/home.png'
import bag from '../../../assets/images/home/firstHighlights/bag.png'
import art from '../../../assets/images/home/firstHighlights/art.png'

export const FirstHighlights = () => {
    const { t } = useLanguage()

    return (
        <div className="firstHighlights-out-container">
            <div className='firstHighlights-container'>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            New Look
                        </h5>
                        <h3>
                            Home Furniture
                        </h3>
                        <button>
                            {t('home.firstHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={home} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            New Products
                        </h5>
                        <h3>
                            Bags and Luggage
                        </h3>
                        <button>
                            {t('home.firstHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={bag} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            At Lowest Price
                        </h5>
                        <h3>
                            Arts and Accessories
                        </h3>
                        <button>
                            {t('home.firstHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={art} alt="tea" />
                    </div>
                </div>
            </div>
        </div>
    )
}