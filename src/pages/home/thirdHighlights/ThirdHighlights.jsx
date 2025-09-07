import './ThirdHighlights.scss'
import { useLanguage } from '../../../context/LanguageContext'
import shoes from '../../../assets/images/home/thirdHighlights/shoes.png'
import home from '../../../assets/images/home/thirdHighlights/home.png'
import laundry from '../../../assets/images/home/thirdHighlights/laundry.png'

export const ThirdHighlights = () => {
    const { t } = useLanguage()

    return (
        <div className="thirdHighlights-out-container">
            <div className='thirdHighlights-container'>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            Great Deals
                        </h5>
                        <h3>
                            Shoes
                        </h3>
                        <button>
                            {t('home.thirdHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={shoes} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            New Look
                        </h5>
                        <h3>
                            Home Appliances
                        </h3>
                        <button>
                            {t('home.thirdHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={home} alt="" />
                    </div>
                </div>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            On Sale
                        </h5>
                        <h3>
                            Laundry Supplies
                        </h3>
                        <button>
                            {t('home.thirdHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={laundry} alt="tea" />
                    </div>
                </div>
            </div>
        </div>
    )
}