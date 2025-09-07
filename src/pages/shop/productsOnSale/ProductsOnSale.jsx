import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './ProductsOnSale.scss';

export const ProductsOnSale = ({ compareProducts }) => {
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();

    // This data will come from backend later - keeping as is
    const saleProducts = [
        {
            id: 101, // Matches ProductDetails database
            name: "Mechanical Gaming Keyboard RGB",
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&h=120&fit=crop&crop=center",
            originalPrice: "$129.99",
            salePrice: "$89.99"
        },
        {
            id: 201, // Matches ProductDetails database
            name: "Gaming Mouse with LED",
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=120&h=120&fit=crop&crop=center",
            originalPrice: "$39.99",
            salePrice: "$29.99"
        },
        {
            id: 301, // Matches ProductDetails database
            name: "Latest Pro Smartphone 128GB",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop&crop=center",
            originalPrice: "$999.99",
            salePrice: "$899.99"
        },
        {
            id: 103, // From ProductsList - Ergonomic Split Keyboard
            name: "Ergonomic Split Keyboard",
            image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=120&h=120&fit=crop&crop=center",
            originalPrice: "$199.99",
            salePrice: "$159.99"
        },
        {
            id: 203, // From ProductsList - Ergonomic Vertical Mouse
            name: "Ergonomic Vertical Mouse",
            image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=120&h=120&fit=crop&crop=center",
            originalPrice: "$85.99",
            salePrice: "$65.99"
        },
    ];

    const handleProductClick = (productId) => {
        // Preserve comparison state when clicking on sale products
        if (compareProducts) {
            navigate(`/shop/product/${productId}?compare=${compareProducts}`);
        } else {
            navigate(`/shop/product/${productId}`);
        }
    };

    const calculateSavings = (originalPrice, salePrice) => {
        const original = parseFloat(originalPrice.replace('$', ''));
        const sale = parseFloat(salePrice.replace('$', ''));
        const savings = original - sale;
        const percentage = Math.round((savings / original) * 100);
        return { amount: savings.toFixed(2), percentage };
    };

    return (
        <div className={`products-on-sale ${isRTL ? 'rtl' : 'ltr'}`}>
            <h3 className="section-title">{t('shop.productsOnSale.title')}</h3>
            <div className="products-list">
                {saleProducts.map(product => {
                    const savings = calculateSavings(product.originalPrice, product.salePrice);

                    return (
                        <div
                            key={product.id}
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                <div className="sale-badge">-{savings.percentage}%</div>
                            </div>
                            <div className="product-info">
                                <h4 className="product-name">{product.name}</h4>
                                <div className="product-pricing">
                                    <span className="original-price">{product.originalPrice}</span>
                                    <span className="sale-price">{product.salePrice}</span>
                                </div>
                                {/* <div className="savings-info">
                                    Save ${savings.amount}
                                </div> */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsOnSale;