import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { X, ShoppingCart, Eye } from 'lucide-react';
import { useLanguage } from '../../../../context/LanguageContext';
import './Compare.scss';

export const Compare = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [compareProducts, setCompareProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const { t } = useLanguage();

    // Mock products database - same as ProductDetails
    const productsDatabase = {
        101: {
            id: 101,
            sku: "2021-590",
            name: "Mechanical Gaming Keyboard RGB",
            price: 89.99,
            originalPrice: 129.99,
            images: [
                "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=600&fit=crop"
            ],
            tags: ["gaming", "keyboard", "rgb"],
            description: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches. Perfect for gaming and productivity.",
            inStock: true,
            rating: 4.5,
            reviews: 234,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" },
                    { name: "Silver", value: "#C0C0C0" }
                ],
                sizes: ["Full Size", "Compact", "60%"]
            }
        },
        102: {
            id: 102,
            sku: "2021-591",
            name: "Wireless Compact Keyboard",
            price: 45.99,
            originalPrice: null,
            images: [
                "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop"
            ],
            tags: ["wireless", "compact", "productivity"],
            description: "Compact wireless keyboard perfect for productivity and travel. Ultra-slim design with long battery life.",
            inStock: true,
            rating: 4.2,
            reviews: 156,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Space Gray", value: "#8E8E93" },
                    { name: "Silver", value: "#C0C0C0" }
                ],
                sizes: ["Compact"]
            }
        },
        103: {
            id: 103,
            sku: "2021-592",
            name: "Ergonomic Split Keyboard",
            price: 159.99,
            originalPrice: 199.99,
            images: [
                "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop"
            ],
            tags: ["ergonomic", "split", "health"],
            description: "Ergonomic split design for comfortable typing during long sessions. Reduces wrist strain and improves posture.",
            inStock: true,
            rating: 4.7,
            reviews: 89,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" }
                ],
                sizes: ["S", "M", "L", "XL"]
            }
        },
        201: {
            id: 201,
            sku: "2021-593",
            name: "Gaming Mouse with LED",
            price: 29.99,
            originalPrice: 39.99,
            images: [
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop"
            ],
            tags: ["gaming", "mouse", "led"],
            description: "High-DPI gaming mouse with customizable LED lighting and ergonomic design.",
            inStock: true,
            rating: 4.3,
            reviews: 445,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" },
                    { name: "Red", value: "#FF0000" }
                ],
                sizes: ["Standard", "Large"]
            }
        },
        202: {
            id: 202,
            sku: "2021-594",
            name: "Wireless Office Mouse",
            price: 19.99,
            originalPrice: null,
            images: [
                "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"
            ],
            tags: ["wireless", "office", "productivity"],
            description: "Comfortable wireless mouse designed for office productivity and everyday use.",
            inStock: true,
            rating: null,
            reviews: 267,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "Gray", value: "#6B7280" }
                ],
                sizes: ["Standard"]
            }
        },
        203: {
            id: 203,
            sku: "2021-595",
            name: "Ergonomic Vertical Mouse",
            price: 65.99,
            originalPrice: 85.99,
            images: [
                "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop"
            ],
            tags: ["ergonomic", "vertical", "health"],
            description: "Vertical ergonomic design reduces wrist strain and promotes natural hand positioning.",
            inStock: true,
            rating: 4.6,
            reviews: 178,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "Blue", value: "#3B82F6" }
                ],
                sizes: ["Right-handed", "Left-handed"]
            }
        },
        301: {
            id: 301,
            sku: "2021-596",
            name: "Latest Pro Smartphone 128GB",
            price: 899.99,
            originalPrice: 999.99,
            images: [
                "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
            ],
            tags: ["smartphone", "pro", "camera"],
            description: "Latest flagship smartphone with advanced camera system and premium features.",
            inStock: true,
            rating: 4.8,
            reviews: 1205,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Midnight Black", value: "#1a1a1a" },
                    { name: "Space Blue", value: "#1e3a8a" },
                    { name: "Rose Gold", value: "#e11d48" },
                    { name: "Silver", value: "#c0c0c0" }
                ],
                sizes: ["128GB", "256GB", "512GB"]
            }
        },
        302: {
            id: 302,
            sku: "2021-597",
            name: "Budget Smartphone 64GB",
            price: 199.99,
            originalPrice: null,
            images: [
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
            ],
            tags: ["smartphone", "budget", "value"],
            description: "Affordable smartphone with essential features, perfect for everyday communication and basic apps.",
            inStock: true,
            rating: 4.0,
            reviews: 589,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "Blue", value: "#3B82F6" },
                    { name: "Red", value: "#EF4444" }
                ],
                sizes: ["64GB", "128GB"]
            }
        },
        401: {
            id: 401,
            sku: "2021-598",
            name: "4K Gaming Monitor 27\"",
            price: 449.99,
            originalPrice: 599.99,
            images: [
                "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&h=600&fit=crop"
            ],
            tags: ["monitor", "4K", "gaming"],
            description: "Ultra HD 4K gaming monitor with HDR support and 144Hz refresh rate for immersive gaming experience.",
            inStock: false,
            rating: 4.8,
            reviews: 342,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" }
                ],
                sizes: ["27\"", "32\""]
            }
        },
        501: {
            id: 501,
            sku: "2021-599",
            name: "Gaming Laptop RTX 4070",
            price: 1899.99,
            originalPrice: 2199.99,
            images: [
                "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop"
            ],
            tags: ["laptop", "gaming", "rtx"],
            description: "High-performance gaming laptop with RTX 4070 graphics, 16GB RAM, and premium cooling system.",
            inStock: true,
            rating: 4.7,
            reviews: 445,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "Silver", value: "#C0C0C0" }
                ],
                sizes: ["16GB RAM", "32GB RAM"]
            }
        },
        601: {
            id: 601,
            sku: "2021-600",
            name: "Pro Tablet 12.9\" 256GB",
            price: 1099.99,
            originalPrice: 1299.99,
            images: [
                "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop",
                "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=600&fit=crop"
            ],
            tags: ["tablet", "pro", "creative"],
            description: "Professional tablet with keyboard support and stylus compatibility, perfect for creative work and productivity.",
            inStock: true,
            rating: 4.8,
            reviews: 567,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Silver", value: "#C0C0C0" },
                    { name: "Space Gray", value: "#4A5568" }
                ],
                sizes: ["256GB", "512GB", "1TB"]
            }
        }
    };

    // Initialize compare products from URL params
    useEffect(() => {
        const productIds = searchParams.get('products');
        if (productIds) {
            const ids = productIds.split(',').filter(id => productsDatabase[id]);
            const products = ids.map(id => productsDatabase[id]);
            setCompareProducts(products);

            // Initialize quantities
            const initialQuantities = {};
            products.forEach(product => {
                initialQuantities[product.id] = 1;
            });
            setQuantities(initialQuantities);
        }
    }, [searchParams]);

    const updateUrlParams = (products) => {
        if (products.length > 0) {
            const productIds = products.map(p => p.id).join(',');
            setSearchParams({ products: productIds });
        } else {
            setSearchParams({});
        }
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = compareProducts.filter(product => product.id !== productId);
        setCompareProducts(updatedProducts);
        updateUrlParams(updatedProducts);

        // Remove from quantities
        const newQuantities = { ...quantities };
        delete newQuantities[productId];
        setQuantities(newQuantities);
    };

    const handleQuantityChange = (productId, type) => {
        setQuantities(prev => {
            const currentQuantity = prev[productId] || 1;
            if (type === 'increment') {
                return { ...prev, [productId]: currentQuantity + 1 };
            } else if (type === 'decrement' && currentQuantity > 1) {
                return { ...prev, [productId]: currentQuantity - 1 };
            }
            return prev;
        });
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        console.log(`Added ${quantity} items to cart`, {
            productId: product.id,
            sku: product.sku,
            quantity
        });
        // Add your cart logic here
    };

    const handleViewProduct = (productId) => {
        // Preserve current compare products when viewing product
        const currentProducts = searchParams.get('products');
        if (currentProducts) {
            navigate(`/shop/product/${productId}?products=${currentProducts}`);
        } else {
            navigate(`/shop/product/${productId}`);
        }
    };

    // FIXED: Preserve comparison state when continuing shopping
    const handleContinueShopping = () => {
        const currentProducts = searchParams.get('products');
        if (currentProducts) {
            navigate(`/shop?compare=${currentProducts}`);
        } else {
            navigate('/shop');
        }
    };

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

    if (compareProducts.length === 0) {
        return (
            <div className="compare-page">
                <div className="compare-header">
                    <h1>{t('shop.compare.header.title')}</h1>
                    <p>{t('shop.compare.header.noProducts')}</p>
                </div>
                <div className="empty-compare">
                    <div className="empty-icon">📊</div>
                    <h2>{t('shop.compare.empty.title')}</h2>
                    <p>{t('shop.compare.empty.description')}</p>
                    <button className="browse-btn" onClick={() => navigate('/shop')}>
                        {t('shop.compare.empty.browseButton')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="compare-page">
            <div className="compare-header">
                <h1>{t('shop.compare.header.title')}</h1>
                <p>
                    {compareProducts.length === 1
                        ? t('shop.compare.header.compareCount', { count: compareProducts.length })
                        : t('shop.compare.header.compareCountPlural', { count: compareProducts.length })
                    }
                </p>
            </div>

            <div className="compare-container">
                <div className="compare-grid">
                    {/* Comparison Table */}
                    <div className={`comparison-table ${compareProducts.length > 4 ? 'many-products' : ''}`} data-products={compareProducts.length}>
                        {/* Product Images Row */}
                        <div className="compare-row product-images-row">
                            <div className="row-label">{t('shop.compare.table.labels.product')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell product-image-cell">
                                    <div className="product-card">
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemoveProduct(product.id)}
                                            title={t('shop.compare.product.removeTitle')}
                                        >
                                            <X size={16} />
                                        </button>
                                        <div className="product-image-container">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="product-image"
                                            />
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <div className="sale-badge">
                                                    {t('shop.compare.product.saleBadge')}
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="product-name">{product.name}</h3>
                                        <button
                                            className="view-product-btn"
                                            onClick={() => handleViewProduct(product.id)}
                                        >
                                            <Eye size={14} />
                                            {t('shop.compare.product.viewDetails')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Rating Row */}
                        <div className="compare-row">
                            <div className="row-label">{t('shop.compare.table.labels.rating')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    {product.rating ? (
                                        <div className="rating-container">
                                            <div className="rating-stars">
                                                {renderStars(product.rating)}
                                            </div>
                                            <span className="rating-text">
                                                {t('shop.compare.rating.ratingText', {
                                                    rating: product.rating,
                                                    reviews: product.reviews
                                                })}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="no-rating">
                                            {t('shop.compare.rating.noRating')}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Price Row */}
                        <div className="compare-row price-row">
                            <div className="row-label">{t('shop.compare.table.labels.price')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    <div className="price-container">
                                        <span className="current-price">${product.price.toFixed(2)}</span>
                                        {product.originalPrice && (
                                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Availability Row */}
                        <div className="compare-row">
                            <div className="row-label">{t('shop.compare.table.labels.availability')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    <span className={`availability ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.inStock
                                            ? t('shop.compare.availability.inStock')
                                            : t('shop.compare.availability.outOfStock')
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* SKU Row */}
                        <div className="compare-row">
                            <div className="row-label">{t('shop.compare.table.labels.sku')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    <span className="sku-value">{product.sku}</span>
                                </div>
                            ))}
                        </div>

                        {/* Condition Row */}
                        <div className="compare-row">
                            <div className="row-label">{t('shop.compare.table.labels.condition')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    <span className="condition">{product.condition || 'New'}</span>
                                </div>
                            ))}
                        </div>

                        {/* Colors Row */}
                        <div className="compare-row">
                            <div className="row-label">{t('shop.compare.table.labels.colors')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    {product.attributes?.colors ? (
                                        <div className="colors-list">
                                            {product.attributes.colors.map((color, index) => (
                                                <div key={index} className="color-item">
                                                    <div
                                                        className="color-swatch"
                                                        style={{ backgroundColor: color.value }}
                                                        title={color.name}
                                                    ></div>
                                                    <span className="color-name">{color.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="no-data">{t('shop.compare.general.notAvailable')}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Sizes Row */}
                        <div className="compare-row">
                            <div className="row-label">{t('shop.compare.table.labels.sizes')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    {product.attributes?.sizes ? (
                                        <div className="sizes-list">
                                            {product.attributes.sizes.map((size, index) => (
                                                <span key={index} className="size-tag">{size}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="no-data">{t('shop.compare.general.notAvailable')}</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add to Cart Row */}
                        <div className="compare-row cart-row">
                            <div className="row-label">{t('shop.compare.table.labels.addToCart')}</div>
                            {compareProducts.map((product) => (
                                <div key={product.id} className="compare-cell">
                                    <div className="cart-section">
                                        <div className="quantity-selector">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleQuantityChange(product.id, 'decrement')}
                                                disabled={quantities[product.id] <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-display">
                                                {quantities[product.id] || 1}
                                            </span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleQuantityChange(product.id, 'increment')}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={!product.inStock}
                                        >
                                            <ShoppingCart size={16} />
                                            {product.inStock
                                                ? t('shop.compare.cart.addToCart')
                                                : t('shop.compare.cart.outOfStock')
                                            }
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Actions */}
            <div className="compare-actions">
                <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                    {t('shop.compare.actions.continueShopping')}
                </button>
                <button
                    className="clear-all-btn"
                    onClick={() => {
                        setCompareProducts([]);
                        setQuantities({});
                        setSearchParams({});
                    }}
                >
                    {t('shop.compare.actions.clearAll')}
                </button>
            </div>
        </div>
    );
};

export default Compare;