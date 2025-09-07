import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './StorePage.scss';

export const StorePage = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('products');
    const { t } = useLanguage();

    // Mock stores database - in real app, this would be an API call
    const storesDatabase = {
        2153: {
            id: 2153,
            name: "TechHub Electronics",
            logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
            banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=300&fit=crop",
            rating: 4.6,
            totalReviews: 1247,
            memberSince: "2019",
            location: "New York, USA",
            description: "Your trusted partner for high-quality electronics and tech accessories. We specialize in gaming gear, computer peripherals, and mobile devices.",
            policies: {
                shipping: "Free shipping on orders over $50",
                returns: "30-day return policy",
                warranty: "Extended warranty available"
            },
            products: [101, 102, 103, 201, 202, 203, 301, 401, 501], // Product IDs from the existing database
            reviews: [
                {
                    id: 1,
                    user: "TechEnthusiast92",
                    rating: 5,
                    date: "2025-07-15",
                    comment: "Excellent store! Fast shipping and great customer service. My keyboard arrived perfectly packaged.",
                    productPurchased: "Mechanical Gaming Keyboard RGB"
                },
                {
                    id: 2,
                    user: "ShopperPro",
                    rating: 4,
                    date: "2025-07-10",
                    comment: "Good selection of products. Had a small issue with delivery but they resolved it quickly.",
                    productPurchased: "Gaming Mouse with LED"
                },
                {
                    id: 3,
                    user: "GadgetLover",
                    rating: 5,
                    date: "2025-07-08",
                    comment: "Best electronics store I've found online. Competitive prices and authentic products.",
                    productPurchased: "Pro Tablet 12.9\""
                },
                {
                    id: 4,
                    user: "BusinessBuyer",
                    rating: 4,
                    date: "2025-07-05",
                    comment: "Great for bulk orders. They helped me set up our entire office with keyboards and mice.",
                    productPurchased: "Wireless Office Mouse"
                }
            ]
        },
        1234: {
            id: 1234,
            name: "Mobile World Store",
            logo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=200&h=200&fit=crop",
            banner: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=300&fit=crop",
            rating: 4.3,
            totalReviews: 892,
            memberSince: "2020",
            location: "California, USA",
            description: "Specialized in smartphones and mobile accessories. We offer the latest devices with competitive prices and excellent customer support.",
            policies: {
                shipping: "Free shipping on orders over $75",
                returns: "14-day return policy for opened devices",
                warranty: "Manufacturer warranty included"
            },
            products: [301, 302], // Smartphone products
            reviews: [
                {
                    id: 1,
                    user: "MobileUser",
                    rating: 4,
                    date: "2024-01-12",
                    comment: "Good service and authentic phones. Delivery was quick.",
                    productPurchased: "Latest Pro Smartphone 128GB"
                },
                {
                    id: 2,
                    user: "BudgetShopper",
                    rating: 5,
                    date: "2024-01-09",
                    comment: "Perfect for budget phones! Great customer service.",
                    productPurchased: "Budget Smartphone 64GB"
                }
            ]
        }
    };

    // Products database (from ProductDetails)
    const productsDatabase = {
        101: {
            id: 101,
            sku: "2021-590",
            name: "Mechanical Gaming Keyboard RGB",
            price: 89.99,
            originalPrice: 129.99,
            images: ["https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop"],
            tags: ["gaming", "keyboard", "rgb"],
            description: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches.",
            inStock: true,
            rating: 4.5,
            reviews: 234,
            condition: "New"
        },
        102: {
            id: 102,
            sku: "2021-591",
            name: "Wireless Compact Keyboard",
            price: 45.99,
            originalPrice: null,
            images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"],
            tags: ["wireless", "compact", "productivity"],
            description: "Compact wireless keyboard perfect for productivity and travel.",
            inStock: true,
            rating: 4.2,
            reviews: 156,
            condition: "New"
        },
        103: {
            id: 103,
            sku: "2021-592",
            name: "Ergonomic Split Keyboard",
            price: 159.99,
            originalPrice: 199.99,
            images: ["https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop"],
            tags: ["ergonomic", "split", "health"],
            description: "Ergonomic split design for comfortable typing during long sessions.",
            inStock: false,
            rating: 4.7,
            reviews: 89,
            condition: "New"
        },
        201: {
            id: 201,
            sku: "2021-593",
            name: "Gaming Mouse with LED",
            price: 29.99,
            originalPrice: 39.99,
            images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"],
            tags: ["gaming", "mouse", "led"],
            description: "High-DPI gaming mouse with customizable LED lighting.",
            inStock: true,
            rating: 4.3,
            reviews: 445,
            condition: "New"
        },
        202: {
            id: 202,
            sku: "2021-594",
            name: "Wireless Office Mouse",
            price: 19.99,
            originalPrice: null,
            images: ["https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop"],
            tags: ["wireless", "office", "productivity"],
            description: "Comfortable wireless mouse designed for office productivity.",
            inStock: true,
            rating: null,
            reviews: 267,
            condition: "New"
        },
        203: {
            id: 203,
            sku: "2021-595",
            name: "Ergonomic Vertical Mouse",
            price: 65.99,
            originalPrice: 85.99,
            images: ["https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop"],
            tags: ["ergonomic", "vertical", "health"],
            description: "Vertical ergonomic design reduces wrist strain.",
            inStock: true,
            rating: 4.6,
            reviews: 178,
            condition: "New"
        },
        301: {
            id: 301,
            sku: "2021-596",
            name: "Latest Pro Smartphone 128GB",
            price: 899.99,
            originalPrice: 999.99,
            images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop"],
            tags: ["smartphone", "pro", "camera"],
            description: "Latest flagship smartphone with advanced camera system.",
            inStock: true,
            rating: 4.8,
            reviews: 1205,
            condition: "New"
        },
        302: {
            id: 302,
            sku: "2021-597",
            name: "Budget Smartphone 64GB",
            price: 199.99,
            originalPrice: null,
            images: ["https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop"],
            tags: ["smartphone", "budget", "value"],
            description: "Affordable smartphone with essential features.",
            inStock: true,
            rating: 4.0,
            reviews: 589,
            condition: "New"
        },
        401: {
            id: 401,
            sku: "2021-598",
            name: "4K Gaming Monitor 27\"",
            price: 449.99,
            originalPrice: 599.99,
            images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop"],
            tags: ["monitor", "4K", "gaming"],
            description: "Ultra HD 4K gaming monitor with HDR support.",
            inStock: true,
            rating: 4.8,
            reviews: 342,
            condition: "New"
        },
        501: {
            id: 501,
            sku: "2021-599",
            name: "Gaming Laptop RTX 4070",
            price: 1899.99,
            originalPrice: 2199.99,
            images: ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"],
            tags: ["laptop", "gaming", "rtx"],
            description: "High-performance gaming laptop with RTX 4070 graphics.",
            inStock: true,
            rating: 4.7,
            reviews: 445,
            condition: "New"
        }
    };

    // Get store by ID from URL params
    const store = storesDatabase[storeId];

    // Handle store not found
    if (!store) {
        return (
            <div className="store-page">
                <div className="error-message">
                    <h2>{t('shop.storePage.error.storeNotFound')}</h2>
                    <p>{t('shop.storePage.error.storeNotFoundMessage')}</p>
                    <button onClick={() => navigate('/shop')}>
                        {t('shop.storePage.error.backToShop')}
                    </button>
                </div>
            </div>
        );
    }

    // Get store products
    const storeProducts = store.products
        .map(productId => productsDatabase[productId])
        .filter(product => product); // Filter out any undefined products

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="star filled">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">☆</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    const handleProductClick = (productId) => {
        navigate(`/shop/product/${productId}`);
    };

    const tabs = [
        { id: 'products', label: t('shop.storePage.tabs.products') },
        { id: 'reviews', label: t('shop.storePage.tabs.storeReviews') }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'products':
                return (
                    <div className="products-grid">
                        {storeProducts.length > 0 ? (
                            storeProducts.map((product) => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image-container">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="product-image"
                                            onClick={() => handleProductClick(product.id)}
                                        />
                                        {product.originalPrice && product.originalPrice > product.price && (
                                            <div className="sale-badge">
                                                {t('shop.storePage.product.saleBadge')}
                                            </div>
                                        )}
                                    </div>

                                    <div className="product-info">
                                        <div className="product-header">
                                            <h3
                                                className="product-name"
                                                onClick={() => handleProductClick(product.id)}
                                            >
                                                {product.name}
                                            </h3>
                                            <span className="product-sku">
                                                {t('shop.storePage.product.skuLabel')} {product.sku}
                                            </span>
                                        </div>

                                        {product.rating && (
                                            <div className="product-rating">
                                                <div className="rating-stars">
                                                    {renderStars(product.rating)}
                                                </div>
                                                <span className="review-count">({product.reviews})</span>
                                            </div>
                                        )}

                                        <p className="product-description">{product.description}</p>

                                        <div className="product-tags">
                                            {product.tags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="tag">{tag}</span>
                                            ))}
                                        </div>

                                        <div className="product-footer">
                                            <div className="price-container">
                                                <span className="current-price">${product.price.toFixed(2)}</span>
                                                {product.originalPrice && (
                                                    <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                                                )}
                                            </div>

                                            <div className="stock-status">
                                                <span className={`status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                                    {product.inStock
                                                        ? t('shop.storePage.product.stockStatus.inStock')
                                                        : t('shop.storePage.product.stockStatus.outOfStock')
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-products">
                                <p>{t('shop.storePage.messages.noProducts')}</p>
                            </div>
                        )}
                    </div>
                );

            case 'reviews':
                return (
                    <div className="store-reviews">
                        <div className="reviews-summary">
                            <div className="rating-overview">
                                <div className="rating-display">
                                    <span className="rating-number">{store.rating}</span>
                                    <div className="rating-stars">
                                        {renderStars(store.rating)}
                                    </div>
                                </div>
                                <p className="total-reviews">
                                    {t('shop.storePage.reviews.basedOnReviews', { count: store.totalReviews })}
                                </p>
                            </div>
                        </div>

                        <div className="reviews-list">
                            {store.reviews.map((review) => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <span className="review-user">{review.user}</span>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <div className="purchased-product">
                                        <span>
                                            {t('shop.storePage.reviews.purchasedLabel')} {review.productPurchased}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="store-page">
            {/* Store Navigation Tabs */}
            <div className="store-navigation">
                <div className="tabs-container">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {tab.id === 'products' && <span className="product-count">({storeProducts.length})</span>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Store Content */}
            <div className="store-content">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default StorePage;