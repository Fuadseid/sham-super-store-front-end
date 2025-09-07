import { useLanguage } from '../../../context/LanguageContext';
import './Wishlist.scss';

const Wishlist = ({
    wishlistItems = [],
    onReturnToShop,
    onRemoveFromWishlist,
    onAddToCart,
    onViewProduct
}) => {
    const { t } = useLanguage();

    const formatPrice = (price) => {
        return `$${price.toFixed(2)}`;
    };

    const getItemCountText = (count) => {
        if (count === 0) return '';
        if (count === 1) {
            return t('myAccount.wishlist.itemCount.single', { count });
        }
        return t('myAccount.wishlist.itemCount.multiple', { count });
    };

    const WishlistItem = ({ item }) => (
        <div className="wishlist-item">
            <div className="item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
                <h4 className="item-name">{item.name}</h4>
                <p className="item-price">{formatPrice(item.price)}</p>
                {item.originalPrice && item.originalPrice > item.price && (
                    <p className="item-original-price">{formatPrice(item.originalPrice)}</p>
                )}
            </div>
            <div className="item-actions">
                <button
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart && onAddToCart(item.id)}
                    title={t('myAccount.wishlist.actions.addToCart')}
                >
                    <span className="icon">🛒</span>
                    {t('myAccount.wishlist.actions.addToCart')}
                </button>
                <button
                    className="view-product-btn"
                    onClick={() => onViewProduct && onViewProduct(item.id)}
                    title={t('myAccount.wishlist.actions.viewProduct')}
                >
                    <span className="icon">👁</span>
                    {t('myAccount.wishlist.actions.viewProduct')}
                </button>
                <button
                    className="remove-btn"
                    onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(item.id)}
                    title={t('myAccount.wishlist.actions.removeFromWishlist')}
                >
                    <span className="icon">🗑</span>
                    {t('myAccount.wishlist.actions.removeFromWishlist')}
                </button>
            </div>
        </div>
    );

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

            <a
                href="#"
                className="return-shop"
                onClick={(e) => {
                    e.preventDefault();
                    onReturnToShop && onReturnToShop();
                }}
            >
                <span className="icon">🛍️</span>
                {t('myAccount.wishlist.actions.returnToShop')}
            </a>
        </div>
    );
};

export default Wishlist;