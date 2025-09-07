import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './FeaturedProducts.scss';

export const FeaturedProducts = ({ compareProducts }) => {
    const { t, isRTL } = useLanguage();
    const navigate = useNavigate();

    // This data will come from backend later - keeping as is
    const featuredProducts = [
        {
            id: 101, // Matches ProductDetails database
            name: "Mechanical Gaming Keyboard RGB",
            image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&h=120&fit=crop&crop=center",
            price: "$89.99",
            featured: true
        },
        {
            id: 301, // Matches ProductDetails database
            name: "Latest Pro Smartphone 128GB",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop&crop=center",
            price: "$899.99",
            featured: true
        },
        {
            id: 401, // From ProductsList - 4K Gaming Monitor
            name: "4K Gaming Monitor 27\"",
            image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=120&h=120&fit=crop&crop=center",
            price: "$449.99",
            featured: true
        },
        {
            id: 501, // From ProductsList - Gaming Laptop
            name: "Gaming Laptop RTX 4070",
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop&crop=center",
            price: "$1899.99",
            featured: true
        },
        {
            id: 601, // From ProductsList - Pro Tablet
            name: "Pro Tablet 12.9\" 256GB",
            image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&h=120&fit=crop&crop=center",
            price: "$1099.99",
            featured: true
        },
        {
            id: 201, // Matches ProductDetails database
            name: "Gaming Mouse with LED",
            image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=120&h=120&fit=crop&crop=center",
            price: "$29.99",
            featured: true
        }
    ];

    const handleProductClick = (productId) => {
        // Preserve comparison state when clicking on featured products
        if (compareProducts) {
            navigate(`/shop/product/${productId}?compare=${compareProducts}`);
        } else {
            navigate(`/shop/product/${productId}`);
        }
    };

    return (
        <div className={`featured-products ${isRTL ? 'rtl' : 'ltr'}`}>
            <h3 className="section-title">{t('shop.featuredProducts.title')}</h3>
            <div className="products-list">
                {featuredProducts.map(product => (
                    <div
                        key={product.id}
                        className="product-item"
                        onClick={() => handleProductClick(product.id)}
                    >
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            {product.originalPrice && product.originalPrice !== product.price && (
                                <div className="featured-badge">Featured</div>
                            )}
                        </div>
                        <div className="product-info">
                            <h4 className="product-name">{product.name}</h4>
                            <div className="product-pricing">
                                <span className="price">{product.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;