import './SecondHighlights.scss'
import { useLanguage } from '../../../context/LanguageContext'
import phone from '../../../assets/images/home/secondHighlights/phone.png'
import watch from '../../../assets/images/home/secondHighlights/watch.png'
import school from '../../../assets/images/home/secondHighlights/school.png'

export const SecondHighlights = () => {
    const { t } = useLanguage()

    return (
        <div className="secondHighlights-out-container">
            <div className='secondHighlights-container'>
                <div className='product-out-container'>
                    <div className='product-left-container'>
                        <h5>
                            New Items
                        </h5>
                        <h3>
                            Smart Phones
                        </h3>
                        <button>
                            {t('home.secondHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={phone} alt="" />
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
                            {t('home.secondHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={watch} alt="" />
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
                            {t('home.secondHighlights.button')}
                        </button>
                    </div>
                    <div className='product-right-container'>
                        <img className='product-right-image' src={school} alt="tea" />
                    </div>
                </div>
            </div>
        </div>
    )
}