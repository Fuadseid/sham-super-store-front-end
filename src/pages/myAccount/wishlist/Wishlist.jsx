import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useGetMyfavoriteQuery } from '../../../stores/apiSlice';
import './Wishlist.scss';
import { useSelector } from 'react-redux';

const Wishlist = ({
    onReturnToShop,
    onRemoveFromWishlist,
    onAddToCart,
    onViewProduct
}) => {
    const { t } = useLanguage();
    const { media_url } = useSelector((state) => state.auth);
    const { data: favorites, isLoading, error } = useGetMyfavoriteQuery();
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        if (favorites?.favorites) {
            // Transform the API response to match the expected format
            const transformedItems = favorites.favorites.map(favorite => ({
                id: favorite.id,
                product_id: favorite.product_id,
                name: favorite.products?.name || 'Unknown Product',
                price: parseFloat(favorite.products?.regular_price) || 0,
                originalPrice: favorite.products?.is_on_sale ? 
                    parseFloat(favorite.products?.on_sale_price) : null,
                image: favorite.products?.productgallers?.[0]?.image_url,
                isOnSale: favorite.products?.is_on_sale === 1,
                salePrice: favorite.products?.is_on_sale ? 
                    parseFloat(favorite.products?.regular_price) : null,
                regularPrice: parseFloat(favorite.products?.regular_price) || 0,
                stockQuantity: favorite.products?.stock_quantity || 0,
                shortDescription: favorite.products?.short_description || '',
                categoryId: favorite.products?.category_id || null
            }));
            setWishlistItems(transformedItems);
        }
    }, [favorites]);

    console.log("My favorite", favorites);

    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };

    const getItemCountText = (count) => {
        if (count === 0) return '';
        if (count === 1) {
            return t('myAccount.wishlist.itemCount.single', { count });
        }
        return t('myAccount.wishlist.itemCount.multiple', { count });
    };

    const handleRemoveFromWishlist = (itemId) => {
        if (onRemoveFromWishlist) {
            onRemoveFromWishlist(itemId);
        }
        // Also update local state
        setWishlistItems(prev => prev.filter(item => item.id !== itemId));
    };

    const handleAddToCart = (productId) => {
        if (onAddToCart) {
            onAddToCart(productId);
        }
    };

    const handleViewProduct = (productId) => {
        if (onViewProduct) {
            onViewProduct(productId);
        }
    };

    const WishlistItem = ({ item }) => (
        <div className="wishlist-item">
            <div className="item-image">
                <img 
                    src={media_url+item?.image} 
                    alt={item.name}
                  
                />
                {item.isOnSale && (
                    <span className="sale-badge">{t('myAccount.wishlist.sale')}</span>
                )}
            </div>
            <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-short-description">{item.shortDescription}</p>
                <div className="price-container">
                    {item.isOnSale && item.salePrice ? (
                        <>
                            <p className="item-price sale-price">
                                {formatPrice(item.salePrice)}
                            </p>
                            <p className="item-original-price">
                                {formatPrice(item.regularPrice)}
                            </p>
                        </>
                    ) : (
                        <p className="item-price">
                            {formatPrice(item.regularPrice)}
                        </p>
                    )}
                </div>
                <p className="stock-info">
                    {item.stockQuantity > 0 
                        ? t('myAccount.wishlist.inStock')
                        : t('myAccount.wishlist.outOfStock')
                    }
                </p>
            </div>
            <div className="item-actions">
                <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item.product_id)}
                    title={t('myAccount.wishlist.actions.addToCart')}
                    disabled={item.stockQuantity === 0}
                >
                    <span className="icon">🛒</span>
                    {t('myAccount.wishlist.actions.addToCart')}
                </button>
                <button
                    className="view-product-btn"
                    onClick={() => handleViewProduct(item.product_id)}
                    title={t('myAccount.wishlist.actions.viewProduct')}
                >
                    <span className="icon">👁</span>
                    {t('myAccount.wishlist.actions.viewProduct')}
                </button>
                <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    title={t('myAccount.wishlist.actions.removeFromWishlist')}
                >
                    <span className="icon">🗑</span>
                    {t('myAccount.wishlist.actions.removeFromWishlist')}
                </button>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="wishlist-content">
                <div className="loading-state">
                    <p>{t('myAccount.wishlist.loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="wishlist-content">
                <div className="error-state">
                    <p>{t('myAccount.wishlist.error')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-content">
            <div className="wishlist-header">
                <h3>{t('myAccount.wishlist.title')}</h3>
                {wishlistItems.length > 0 && (
                    <p className="item-count">{getItemCountText(wishlistItems.length)}</p>
                )}
            </div>

            <div className="wishlist-items">
                {wishlistItems.length > 0 ? (
                    <div className="items-grid">
                        {wishlistItems.map((item) => (
                            <WishlistItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">❤️</div>
                        <h4>{t('myAccount.wishlist.emptyState.title')}</h4>
                        <p>{t('myAccount.wishlist.emptyState.description')}</p>
                    </div>
                )}
            </div>

            {wishlistItems.length === 0 && (
                <div className="empty-wishlist-message">
                    <p>{t('myAccount.wishlist.emptyState.message')}</p>
                </div>
            )}

            <div className="wishlist-actions">
                <button
                    className="return-shop-btn"
                    onClick={(e) => {
                        e.preventDefault();
                        onReturnToShop && onReturnToShop();
                    }}
                >
                    <span className="icon">🛍️</span>
                    {t('myAccount.wishlist.actions.returnToShop')}
                </button>
            </div>
        </div>
    );
};

export default Wishlist;