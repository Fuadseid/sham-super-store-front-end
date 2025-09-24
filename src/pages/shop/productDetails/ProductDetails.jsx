import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGetProductdetailQuery } from '../../../stores/apiSlice';
// Styling handled by Tailwind CSS
import { useSelector } from 'react-redux';

const ProductDetails = () => {
    const { t } = useLanguage();
    const { productId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('about');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const { media_url } = useSelector((state) => state.auth);

    // Fetch product data
    const { data: productDetail, isLoading: loadingProduct, error } = useGetProductdetailQuery(productId);
    const [product, setProduct] = useState(null);

    // Transform API data when it's loaded
    useEffect(() => {
        console.log('Product Detail API Response:', productDetail);
        if (productDetail) {
            const detail = productDetail.data || productDetail; // Handle both {data: ...} and direct response
            
            // Log the full detail object for debugging
            console.log('Product detail object:', detail);
            
            // Process product images
            const productImages = detail.productgallers?.length > 0 
                ? detail.productgallers.map(img => img.image_url)
                : ['https://via.placeholder.com/300'];
            
            // Process product variants
            const variants = detail.productvariants || [];
            const colors = [];
            const sizes = [];
            
            variants.forEach(variant => {
                if (variant.color && !colors.some(c => c.name === variant.color)) {
                    colors.push({
                        name: variant.color,
                        value: variant.color.toLowerCase()
                    });
                }
                if (variant.size && !sizes.includes(variant.size)) {
                    sizes.push(variant.size);
                }
            });
            
            // Process product reviews
            const reviews = (detail.productreviews || [])
                .filter(review => review.status === 'approved' && review.stars > 0)
                .map(review => ({
                    id: review.id,
                    user: review.customers?.name || 'Anonymous',
                    rating: review.stars,
                    date: review.created_at ? new Date(review.created_at).toLocaleDateString() : 'N/A',
                    comment: review.comment || 'No review text provided'
                }));
            
            // Calculate average rating
            const averageRating = reviews.length > 0
                ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
                : 0;
            
            const transformedProduct = {
                id: detail.id || productId,
                sku: detail.sku || t('shop.productDetails.productInfo.skuNotAvailable'),
                name: detail.name || t('shop.productDetails.productInfo.noName'),
                brand: detail.brand || t('shop.productDetails.productInfo.noBrand'),
                price: parseFloat(detail.is_on_sale ? detail.on_sale_price : detail.regular_price || 0),
                originalPrice: detail.is_on_sale ? parseFloat(detail.regular_price) : null,
                images:productImages,
                tags: detail.tags ? detail.tags.split(',').map(tag => tag.trim()) : [],
                description: detail.long_description || detail.short_description || 
                            t('shop.productDetails.productInfo.noDescription'),
                inStock: detail.stock_quantity > 0,
                rating: averageRating,
                reviews: reviews.length,
                condition: variants[0]?.condition || 'New',
                stockQuantity: detail.stock_quantity || 0,
                category: detail.productcategors?.name || '',
                store: detail.stores ? {
                    id: detail.stores.id,
                    name: detail.stores.name,
                    description: detail.stores.description,
                    logo: detail.stores.logo,
                    address: `${detail.stores.address}, ${detail.stores.city}, ${detail.stores.country}`,
                    contact: {
                        email: detail.stores.email,
                        phone: detail.stores.phone,
                        website: detail.stores.website
                    }
                } : null,
                attributes: {
                    colors,
                    sizes,
                    weight: variants[0]?.weight,
                    dimensions: variants[0]?.dimensions,
                    warranty: variants[0]?.customAttributes?.Warranty,
                    batteryLife: variants[0]?.customAttributes?.battery_life,
                    bluetoothVersion: variants[0]?.customAttributes?.bluetooth_version,
                    otherFeatures: variants[0]?.customAttributes?.other_attributes
                },
                reviewsList: reviews,
                details: {
                    about: detail.long_description || detail.short_description || 'No description available',
                    shortDescription: detail.short_description || '',
                    moreInformation: (() => {
                        const attrs = [];
                        const variant = detail.productvariants?.[0];
                        if (variant) {
                            if (variant.weight) attrs.push(`Weight: ${variant.weight}`);
                            if (variant.dimensions) {
                                const { length, width, height } = variant.dimensions;
                                attrs.push(`Dimensions: ${length} x ${width} x ${height} cm`);
                            }
                            if (variant.customAttributes) {
                                // Only include non-Arabic attributes
                                Object.entries(variant.customAttributes).forEach(([key, value]) => {
                                    if (!key.endsWith('_arebic') && value) {
                                        attrs.push(`${key}: ${value}`);
                                    }
                                });
                            }
                        }
                        return attrs.join(' • ');
                    })(),
                    productRating: `${averageRating.toFixed(1)}/5 stars${reviews.length ? ` based on ${reviews.length} reviews` : ''}`,
                    contactSeller: detail.stores ? `Contact ${detail.stores.name} at ${detail.stores.email || detail.stores.phone}` : 'Contact seller',
                    otherSellers: 'Check availability from other sellers',
                    storePolicy: detail.product_shipping?.[0]?.return_policy 
                        ? `Return policy: ${detail.product_shipping[0].return_policy}` 
                        : 'Standard return policy applies'
                },
                stores: detail.store ? [{
                    id: detail.store.id,
                    name: detail.store.name || 'Store',
                    rating: detail.store.rating || 0,
                    products: detail.store.product_count || 0,
                    responseRate: 'N/A',
                    shippingTime: 'Varies',
                    logo: detail.store.logo || 'https://via.placeholder.com/50'
                }] : []
            };

            setProduct(transformedProduct);
            
            // Set default selected color if available
            if (transformedProduct.attributes.colors.length > 0) {
                setSelectedColor(transformedProduct.attributes.colors[0].name);
            }
            
            // Set default selected size if available
            if (transformedProduct.attributes.sizes.length > 0) {
                setSelectedSize(transformedProduct.attributes.sizes[0]);
            }
        }
    }, [productDetail]);

    const handleQuantityChange = (type) => {
        if (type === 'increment' && product?.inStock) {
            setQuantity(prev => Math.min(prev + 1, 10)); // Max 10 items
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

   /*  const handleAddToCart = () => {
        if (!product?.inStock) return;
        
        console.log('Added to cart:', {
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity,
            color: selectedColor,
            size: selectedSize
        });

        
        // Here you would typically dispatch an action to update the cart
        // For example: dispatch(addToCart({ product, quantity, selectedColor, selectedSize }));
        
        // Show success message or notification
        alert(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
    } */

    const handleCompare = () => {
        let existingProductIds = [];

        // Check for existing comparison products from URL
        const urlProducts = searchParams.get('products');
        const urlCompare = searchParams.get('compare');

        if (urlProducts) {
            existingProductIds = urlProducts.split(',').filter(Boolean);
        } else if (urlCompare) {
            existingProductIds = urlCompare.split(',').filter(Boolean);
        }

        // Add current product if not already in the list
        if (!existingProductIds.includes(productId)) {
            existingProductIds.push(productId);
        }

        // Navigate to compare page with all products
        navigate(`/compare?products=${existingProductIds.join(',')}`);
    };

  /*   const handleInquiry = () => {
        // Implement inquiry logic here
        console.log('Inquiry about product:', productId);
    }; */

    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star full">★</span>);
        }

        if (hasHalfStar) {
            stars.push(<span key="half" className="star half">★</span>);
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    const getReviewCountText = (count) => {
        if (count === 0) return t('shop.productDetails.productInfo.noReviews');
        if (count === 1) return t('shop.productDetails.productInfo.oneReview');
        return t('shop.productDetails.productInfo.multipleReviews', { count });
    };

    const handleAddToCart = () => {
        if (!product.inStock) return;
        
        // TODO: Implement add to cart functionality
        console.log('Adding to cart:', {
            productId: product.id,
            quantity,
            color: selectedColor,
            size: selectedSize
        });
        
        // Show success message
        alert(t('shop.productDetails.addedToCart'));
    };
    
    const handleInquiry = () => {
        // TODO: Implement inquiry functionality
        console.log('Initiating inquiry for product:', product.id);
    };

    const tabs = [
        { id: 'about', label: t('shop.productDetails.tabs.aboutItem') },
        { id: 'shortDescription', label: t('shop.productDetails.tabs.shortDescription') },
        { id: 'moreInformation', label: t('shop.productDetails.tabs.moreInformation') },
        { id: 'productRating', label: t('shop.productDetails.tabs.productRating') },
        { id: 'contactSeller', label: t('shop.productDetails.tabs.contactSeller') },
        { id: 'otherSellers', label: t('shop.productDetails.tabs.otherSellers') },
        { id: 'storePolicy', label: t('shop.productDetails.tabs.storePolicy') }
    ];

    const renderTabContent = () => {
        if (activeTab === 'reviews') {
            return (
                <div className="reviews-section">
                    {product.reviewsList.length > 0 ? (
                        product.reviewsList.map(review => (
                            <div key={review.id} className="review-item">
                                <div className="review-header">
                                    <span className="reviewer">{review.user}</span>
                                    <div className="review-rating">
                                        {renderRatingStars(review.rating)}
                                    </div>
                                    <span className="review-date">{review.date}</span>
                                </div>
                                <p className="review-comment">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p>{t('shop.productDetails.productInfo.noReviews')}</p>
                    )}
                </div>
            );
        }

        if (activeTab === 'contactSeller' || activeTab === 'otherSellers' || activeTab === 'storePolicy') {
            return (
                <div className="inquiry-section">
                    <p>{product.details[activeTab]}</p>
                    <button className="inquiry-btn" onClick={handleInquiry}>
                        {t('shop.productDetails.contact.contactSeller')}
                    </button>
                </div>
            );
        }

        if (activeTab === 'productRating') {
            return (
                <div className="product-rating-section">
                    {product.rating ? (
                        <div className="rating-display">
                            <div className="rating-stars">
                                {renderRatingStars(product.rating)}
                            </div>
                            <div className="rating-text">
                                {product.details.productRating}
                            </div>
                        </div>
                    ) : (
                        <p>{t('shop.productDetails.productInfo.noRatings')}</p>
                    )}
                    <button 
                        className="write-review-btn"
                        onClick={() => setActiveTab('reviews')}
                    >
                        {t('shop.productDetails.actions.writeReview')}
                    </button>
                </div>
            );
        }

        // Default tab content
        return <p>{product.details[activeTab] || t('shop.productDetails.noInformation')}</p>;
    };

    // Handle loading state
    if (loadingProduct) {
        return (
            <div className="product-details loading">
                <div className="skeleton-loader">
                    <div className="skeleton-image"></div>
                    <div className="skeleton-info">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-rating"></div>
                        <div className="skeleton-price"></div>
                        <div className="skeleton-options"></div>
                        <div className="skeleton-button"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="product-details error">
                <div className="error-content">
                    <div className="error-icon">⚠️</div>
                    <h2>{t('shop.productDetails.errors.loadingError')}</h2>
                    <p>{error?.data?.message || t('shop.productDetails.errors.tryAgain')}</p>
                    <div className="error-actions">
                        <button 
                            className="btn-retry" 
                            onClick={() => window.location.reload()}
                        >
                            {t('common.retry')}
                        </button>
                        <button 
                            className="btn-back"
                            onClick={() => navigate('/shop')}
                        >
                            {t('common.backToShop')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Handle product not found or not loaded
    if (!product) {
        return (
            <div className="product-details not-found">
                <div className="not-found-content">
                    <div className="not-found-icon">🔍</div>
                    <h2>{t('shop.productDetails.errors.productNotFound')}</h2>
                    <p>{t('shop.productDetails.errors.productNotFoundDesc')}</p>
                    <div className="not-found-actions">
                        <button 
                            className="btn-back"
                            onClick={() => navigate('/shop')}
                        >
                            {t('common.backToShop')}
                        </button>
                        <button 
                            className="btn-contact"
                            onClick={() => navigate('/contact')}
                        >
                            {t('common.contactSupport')}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-blue-600 hover:text-blue-800 mr-2"
                >
                    &larr; {t('common.back')}
                </button>
                <span className="mx-2">/</span>
                <span className="text-gray-500">{product.category}</span>
                <span className="mx-2">/</span>
                <span className="font-medium text-gray-900">{product.name}</span>
            </div>

            {/* Product Main */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Gallery */}
                <div className="md:w-1/2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                        {product.images.length > 0 ? (
                            <img
                                src={media_url+product.images[selectedImageIndex]}
                                alt={product.name}
                                className="w-full h-auto object-cover aspect-square"
                            />
                        ) : (
                            <div className="aspect-square flex items-center justify-center bg-gray-100 text-gray-400">
                                {t('shop.productDetails.noImage')}
                            </div>
                        )}
                    </div>
                    
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto py-2">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    className={`flex-shrink-0 w-20 h-20 border-2 rounded overflow-hidden ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                                    onClick={() => setSelectedImageIndex(index)}
                                >
                                    <img 
                                        src={media_url + image} 
                                        alt={`${product.name} thumbnail ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="md:w-1/2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                        <span>SKU: {product.sku}</span>
                        <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock 
                                ? t('shop.productDetails.productInfo.inStock') 
                                : t('shop.productDetails.productInfo.outOfStock')}
                        </span>
                        {product.condition && (
                            <span>
                                {t('shop.productDetails.productInfo.condition')}: {product.condition}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                            <>
                                <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {product.rating > 0 && (
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">
                                ({product.reviews} {product.reviews === 1 ? 'review' : 'reviews'})
                            </span>
                            <button 
                                className="text-sm text-blue-600 hover:underline"
                                onClick={() => document.getElementById('review-form-modal')?.showModal()}
                            >
                                {t('shop.productDetails.writeAReview')}
                            </button>
                        </div>
                    )}

                    {product.description && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('shop.productDetails.productInfo.overview')}</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    )}

                    {(product.attributes?.colors?.length > 0 || product.attributes?.sizes?.length > 0) && (
                        <div className="space-y-4 mb-6">
                            {product.attributes.colors?.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('shop.productDetails.productInfo.color')}:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.attributes.colors.map((color, index) => (
                                            <button
                                                key={index}
                                                className={`w-8 h-8 rounded-full border-2 ${selectedColor === color.value ? 'ring-2 ring-offset-2 ring-blue-500' : 'border-gray-200'} transition-all`}
                                                style={{ backgroundColor: color.value }}
                                                onClick={() => setSelectedColor(color.value)}
                                                aria-label={color.name}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.attributes.sizes?.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('shop.productDetails.productInfo.size')}:
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {product.attributes.sizes.map((size, index) => (
                                            <button
                                                key={index}
                                                className={`px-4 py-2 border rounded-md text-sm font-medium ${
                                                    selectedSize === size 
                                                        ? 'bg-blue-600 text-white border-blue-600' 
                                                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                                }`}
                                                onClick={() => setSelectedSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4 mb-6">
                        <label className="text-sm font-medium text-gray-700">
                            {t('shop.productDetails.quantity')}:
                        </label>
                        <div className="flex items-center border border-gray-300 rounded-md">
                            <button 
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="w-12 text-center">{quantity}</span>
                            <button 
                                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => setQuantity(prev => prev + 1)}
                                disabled={quantity >= product.stockQuantity}
                                aria-label="Increase quantity"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>

                        <button
                            type="button"
                            className={`flex-1 px-6 py-3 rounded-md font-medium text-white transition-colors ${
                                product.inStock
                                    ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                    : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                    />
                                </svg>
                                {product.inStock 
                                    ? t('shop.productDetails.actions.addToCart')
                                    : t('shop.productDetails.actions.outOfStock')}
                            </div>
                        </button>

                        <button 
                            type="button"
                            className="px-4 py-3 border border-gray-300 bg-white text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={handleCompare}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                                    />
                                </svg>
                                {t('shop.productDetails.actions.compare')}
                            </div>
                        </button>
                    </div>

                    {product.store && (
                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                {t('shop.productDetails.soldBy')}
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {product.store.logo && (
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={product.store.logo} 
                                            alt={product.store.name} 
                                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/64';
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="text-base font-medium text-gray-900">{product.store.name}</h4>
                                    {product.store.description && (
                                        <p className="text-sm text-gray-600 mt-1">{product.store.description}</p>
                                    )}
                                    {product.store.address && (
                                        <p className="text-sm text-gray-500 mt-1">{product.store.address}</p>
                                    )}
                                    
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {product.store.contact?.email && (
                                            <a 
                                                href={`mailto:${product.store.contact.email}`}
                                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                <svg 
                                                    className="w-4 h-4 mr-1" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                                                    />
                                                </svg>
                                                {product.store.contact.email}
                                            </a>
                                        )}
                                        
                                        {product.store.contact?.phone && (
                                            <a 
                                                href={`tel:${product.store.contact.phone.replace(/\D/g, '')}`}
                                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                <svg 
                                                    className="w-4 h-4 mr-1" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                                                    />
                                                </svg>
                                                {product.store.contact.phone}
                                            </a>
                                        )}
                                        
                                        {product.store.contact?.website && (
                                            <a 
                                                href={product.store.contact.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                <svg 
                                                    className="w-4 h-4 mr-1" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" 
                                                    />
                                                </svg>
                                                {t('shop.productDetails.visitStore')}
                                            </a>
                                        )}
                                    </div>
                                    
                                    <button 
                                        className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => {
                                            // TODO: Navigate to store page
                                            console.log('Visit store:', product.store.id);
                                        }}
                                    >
                                        {t('shop.productDetails.actions.visitStore')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="mt-12">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                                aria-current={activeTab === tab.id ? 'page' : undefined}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                                        {tabs.findIndex((t) => t.id === tab.id) + 1}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="mt-6">
                    {renderTabContent()}
                </div>
            </div>
            
            {/* Related Products Section */}
            {product.relatedProducts && product.relatedProducts.length > 0 && (
                <section className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        {t('shop.productDetails.youMayAlsoLike')}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {product.relatedProducts.map(related => (
                            <div 
                                key={related.id} 
                                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                                    <img 
                                        src={related.image} 
                                        alt={related.name}
                                        className="h-full w-full object-cover object-center group-hover:opacity-90 transition-opacity duration-200 cursor-pointer"
                                        onClick={() => navigate(`/product/${related.id}`)}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300';
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 
                                        className="text-sm font-medium text-gray-900 line-clamp-2 h-10 overflow-hidden cursor-pointer hover:text-blue-600"
                                        onClick={() => navigate(`/product/${related.id}`)}
                                    >
                                        {related.name}
                                    </h3>
                                    <div className="mt-2 flex items-center">
                                        <p className="text-sm font-medium text-gray-900">
                                            ${related.price.toFixed(2)}
                                        </p>
                                        {related.originalPrice > related.price && (
                                            <p className="ml-2 text-sm text-gray-500 line-through">
                                                ${related.originalPrice.toFixed(2)}
                                            </p>
                                        )}
                                        {related.originalPrice > related.price && (
                                            <span className="ml-2 text-xs font-medium text-red-600">
                                                {Math.round((1 - related.price / related.originalPrice) * 100)}% OFF
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <button 
                                            className="w-full py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // TODO: Add to cart functionality
                                                console.log('Add to cart:', related.id);
                                            }}
                                        >
                                            {t('shop.productDetails.addToCart')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
            {/* Review Form Modal */}
            <dialog id="review-form-modal" className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={() => document.getElementById('review-form-modal')?.close()} />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900">
                                    {t('shop.productDetails.writeAReview')}
                                </h2>
                                <button 
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={() => document.getElementById('review-form-modal')?.close()}
                                    aria-label="Close"
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('shop.productDetails.yourRating')}
                                    </label>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <React.Fragment key={star}>
                                                <input 
                                                    type="radio" 
                                                    id={`star${star}`} 
                                                    name="rating" 
                                                    value={star} 
                                                    className="sr-only"
                                                />
                                                <label 
                                                    htmlFor={`star${star}`}
                                                    className="text-2xl cursor-pointer text-gray-300 hover:text-yellow-400 peer-hover:text-yellow-400 peer-focus-visible:text-yellow-400"
                                                    aria-label={`${star} ${star === 1 ? 'star' : 'stars'}`}
                                                >
                                                    ★
                                                </label>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('shop.productDetails.reviewTitle')}
                                    </label>
                                    <input 
                                        type="text" 
                                        id="review-title" 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder={t('shop.productDetails.reviewTitlePlaceholder')}
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('shop.productDetails.yourReview')}
                                    </label>
                                    <textarea 
                                        id="review-text" 
                                        rows={5} 
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        placeholder={t('shop.productDetails.reviewPlaceholder')}
                                        required
                                    ></textarea>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t('shop.productDetails.uploadPhotos')}
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <label className="group relative cursor-pointer rounded-md bg-white font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                            <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                <svg className="-ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm5.25-9.25a.75.75 0 00-1.5 0v4.59l-1.95-2.1a.75.75 0 10-1.1 1.02l3.25 3.5a.75.75 0 001.1 0l3.25-3.5a.75.75 0 10-1.1-1.02l-1.95 2.1V7.75z" clipRule="evenodd" />
                                                </svg>
                                                {t('shop.productDetails.chooseFiles')}
                                            </span>
                                            <input 
                                                type="file" 
                                                multiple 
                                                accept="image/*" 
                                                className="sr-only"
                                                onChange={(e) => {
                                                    // TODO: Handle file uploads
                                                    console.log('Files selected:', e.target.files);
                                                }}
                                            />
                                        </label>
                                        <p className="ml-4 text-sm text-gray-500">
                                            {t('shop.productDetails.uploadLimit')}
                                        </p>
                                    </div>
                                    <div id="file-names" className="mt-2 text-sm text-gray-600"></div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 pt-4">
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => document.getElementById('review-form-modal')?.close()}
                                    >
                                        {t('common.cancel')}
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        {t('shop.productDetails.submitReview')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default ProductDetails;
