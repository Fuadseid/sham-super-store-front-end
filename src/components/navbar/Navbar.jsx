import React, { useState, useEffect } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import { useLanguage } from '../../context/LanguageContext';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg';
import './Navbar.scss';
import { useGetCategoriesonNavbarQuery, useGetCartQuery } from '../../stores/apiSlice';

const CartDropdown = ({ carts, setOpen }) => {
  const navigate = useNavigate();
  const cartItems = carts?.data?.debug?.processed_items || [];
  
  const handleGoToCheckout = () => {
    navigate("/checkout");
    setOpen(false);
  };

  const handleGoToCart = () => {
    navigate("/cart");
    setOpen(false);
  };

  return (
    <div className="absolute top-full mt-2 right-0 w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Your Cart</h3>
        <p className="text-sm text-gray-600">
          {cartItems?.length || 0} item{cartItems?.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="p-8 text-center">
            <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <ul className="p-4 space-y-4">
            {cartItems.map((cart, index) => (
              <li
                key={`${cart.product_id}-${cart.variant_id}-${index}`}
                className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  {/* Product Image */}
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {cart.image ? (
                      <img 
                        src={cart.image} 
                        alt={cart.product_name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-xs text-gray-500">Img</span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {cart.product_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        Qty: {cart.quantity}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs font-semibold text-gray-800">
                        {cart.price}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer with Totals */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-800">
                {carts?.data?.subtotal || '$0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Delivery Fee:</span>
              <span className="font-semibold text-gray-800">
                {carts?.data?.delivery_fee || '$0.00'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="text-base font-bold text-gray-800">Total:</span>
              <span className="text-base font-bold text-gray-800">
                {carts?.data?.total || '$0.00'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleGoToCart}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              View Cart
            </button>
            <button
              onClick={handleGoToCheckout}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
    const navigate = useNavigate();
    const { toggleCart, getTotalItems } = useCart();
    const { t, language, changeLanguage, isRTL } = useLanguage();
    const totalItems = getTotalItems();
    const [categories, setCategories] = useState([]);
    const { data: categoriesData, isLoading: loadingCategories, isError: errorFetching } = useGetCategoriesonNavbarQuery();
    const { data: carts, refetch: refetchCart } = useGetCartQuery();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [cartData, setCartData] = useState(null);

    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [mobileActiveSubDropdown, setMobileActiveSubDropdown] = useState(null);

    useEffect(() => {
        if (categoriesData?.data) {
            setCategories(categoriesData.data);
        }
    }, [categoriesData]);

    useEffect(() => {
        if (carts) {
            setCartData(carts);
        }
    }, [carts]);

    // Function to recursively build category structure for navigation
    const buildCategoryStructure = (categories) => {
        return categories.map(category => ({
            title: language === 'ar' && category.name_ar ? category.name_ar : category.name,
            link: `/shop/category/${category.id}`,
            subDropdown: category.children_recursive && category.children_recursive.length > 0 
                ? buildCategoryStructure(category.children_recursive)
                : null
        }));
    };

    // Build shop dropdown from categories
    const shopDropdown = [
        { title: t('navbar.shop.allCategories'), link: '/shop' },
        ...buildCategoryStructure(categories)
    ];

    const navItems = [
        {
            title: t('navbar.navigation.home'),
            link: '/'
        },
        {
            title: t('navbar.navigation.shop'),
            link: '/shop',
            dropdown: shopDropdown
        },
        {
            title: t('navbar.navigation.myAccount'),
            link: '/my-account',
            dropdown: [
                { title: t('navbar.myAccount.dashboard'), link: '/my-account' },
                { title: t('navbar.myAccount.orders'), link: '/my-account/orders' },
                { title: t('navbar.myAccount.orderTracking'), link: '/my-account/tracking' },
                { title: t('navbar.myAccount.downloads'), link: '/my-account/downloads' },
                { title: t('navbar.myAccount.addresses'), link: '/my-account/addresses' },
                { title: t('navbar.myAccount.paymentMethods'), link: '/my-account/payment-methods' },
                { title: t('navbar.myAccount.accountDetails'), link: '/my-account/account-details' },
                { title: t('navbar.myAccount.wishlist'), link: '/my-account/wishlist' },
                { title: t('navbar.myAccount.following'), link: '/my-account/following' },
                { title: t('navbar.myAccount.supportTickets'), link: '/my-account/support-tickets' },
                { title: t('navbar.myAccount.contactedSellers'), link: '/my-account/contacted-sellers' },
                { title: t('navbar.myAccount.lostPassword'), link: '/my-account/lost-password' }
            ]
        },
        {
            title: t('navbar.navigation.about'),
            link: '/about'
        },
        {
            title: t('navbar.navigation.contactUs'),
            link: '/contact'
        },
        {
            title: t('navbar.navigation.sellers'),
            link: '/sellers',
            dropdown: [
                { title: t('navbar.sellers.vendorRegistration'), link: '/vendor-registration' },
                { title: t('navbar.sellers.vendorMembership'), link: '/vendor-membership' },
                { title: t('navbar.sellers.storeManager'), link: '/store-manager' },
                { title: t('navbar.sellers.vendorsDriversManager'), link: '/vendors-drivers-manager' },
                { title: t('navbar.sellers.storesList'), link: '/stores-list' }
            ]
        },
        {
            title: t('navbar.navigation.deliveryDrivers'),
            link: '/delivery-drivers',
            dropdown: [
                { title: t('navbar.deliveryDrivers.deliveryDrivers'), link: '/delivery-drivers' },
                { title: t('navbar.deliveryDrivers.deliveryDriversManager'), link: '/delivery-drivers-manager' },
                { title: t('navbar.deliveryDrivers.deliveryDriversApp'), link: '/delivery-drivers-app' }
            ]
        },
        {
            title: language === 'en' ? t('navbar.languages.english') : t('navbar.languages.arabic'),
            dropdown: [
                {
                    title: language === 'en' ? t('navbar.languages.arabic') : t('navbar.languages.english'),
                    onClick: () => changeLanguage(language === 'en' ? 'ar' : 'en')
                }
            ]
        }
    ];

    const handleMouseEnter = (index) => {
        setActiveDropdown(index);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
        setActiveSubDropdown(null);
    };

    const handleSubMouseEnter = (index) => {
        setActiveSubDropdown(index);
    };

    const handleSubMouseLeave = () => {
        setActiveSubDropdown(null);
    };

    const handleMobileDropdownToggle = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileActiveDropdown(mobileActiveDropdown === index ? null : index);
        setMobileActiveSubDropdown(null);
    };

    const handleMobileSubDropdownToggle = (index, e) => {
        e.preventDefault();
        e.stopPropagation();
        setMobileActiveSubDropdown(mobileActiveSubDropdown === index ? null : index);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setMobileActiveDropdown(null);
        setMobileActiveSubDropdown(null);
        setCartOpen(false);
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileActiveDropdown(null);
        setMobileActiveSubDropdown(null);
        setCartOpen(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleLinkClick();
    };

    const handleCartClick = () => {
        setCartOpen(!cartOpen);
        refetchCart();
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            handleLinkClick();
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setMobileMenuOpen(false);
                setMobileActiveDropdown(null);
                setMobileActiveSubDropdown(null);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [mobileMenuOpen]);

    // Close cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartOpen && !event.target.closest('.navbar__cart-container')) {
                setCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [cartOpen]);

    // Loading state for categories
    if (loadingCategories) {
        return (
            <nav className={`navbar ${isRTL ? 'rtl' : 'ltr'}`}>
                <div className="navbar__top">
                    <div className="navbar__top-container">
                        <div className="navbar__logo">
                            <Link to="/">
                                <img src={shamSuperStoreLogo} alt="Sham Super Store" />
                            </Link>
                        </div>
                        <div className="navbar__loading">Loading categories...</div>
                    </div>
                </div>
            </nav>
        );
    }

    return (
        <nav className={`navbar ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Top section remains the same */}
            <div className="navbar__top">
                <div className="navbar__top-container">
                    <div className="navbar__logo">
                        <Link to="/" onClick={handleLinkClick}>
                            <img src={shamSuperStoreLogo} alt="Sham Super Store" />
                        </Link>
                    </div>

                    <div className="navbar__search navbar__search--desktop">
                        <form onSubmit={handleSearchSubmit} className="navbar__search-form">
                            <input
                                type="text"
                                placeholder={t('navbar.search.placeholder')}
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="navbar__search-input"
                            />
                            <button type="submit" className="navbar__search-button">
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    <div className="navbar__actions">
                        <button
                            className="navbar__action-btn"
                            onClick={() => handleNavigation('/contact')}
                        >
                            <Mail size={16} />
                            <span>{t('navbar.topActions.support')}</span>
                        </button>

                        <button
                            className="navbar__action-btn"
                            onClick={() => handleNavigation('/my-account')}
                        >
                            <User size={16} />
                            <span>{t('navbar.topActions.login')}</span>
                        </button>

                        <button
                            className="navbar__seller-btn"
                            onClick={() => handleNavigation('/sellers')}
                        >
                            {t('navbar.topActions.becomeASeller')}
                        </button>
                    </div>

                    <div className="navbar__toggle" onClick={toggleMobileMenu}>
                        <span className={`navbar__toggle-line ${mobileMenuOpen ? 'active' : ''}`}></span>
                        <span className={`navbar__toggle-line ${mobileMenuOpen ? 'active' : ''}`}></span>
                        <span className={`navbar__toggle-line ${mobileMenuOpen ? 'active' : ''}`}></span>
                    </div>
                </div>
            </div>

            <div className="navbar__search-bar-mobile">
                <div className="navbar__search-bar-container">
                    <form onSubmit={handleSearchSubmit} className="navbar__search-form-mobile">
                        <input
                            type="text"
                            placeholder={t('navbar.search.placeholder')}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="navbar__search-input-mobile"
                        />
                        <button type="submit" className="navbar__search-button-mobile">
                            <Search size={20} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Main navigation menu */}
            <div className="navbar__container">
                <ul className="navbar__menu">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className="navbar__item"
                            onMouseEnter={() => item.dropdown && handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to={item.link || '#'} className="navbar__link" onClick={handleLinkClick}>
                                {item.title}
                                {item.dropdown && (
                                    <ChevronDown
                                        size={16}
                                        className={`navbar__arrow ${activeDropdown === index ? 'rotated' : ''}`}
                                    />
                                )}
                            </Link>

                            {item.dropdown && activeDropdown === index && (
                                <ul className={`navbar__dropdown ${index === 1 ? 'navbar__dropdown--scrollable' : ''}`}>
                                    {item.dropdown.map((dropdownItem, dropIndex) => (
                                        <li
                                            key={dropIndex}
                                            className="navbar__dropdown-item"
                                            onMouseEnter={() => dropdownItem.subDropdown && handleSubMouseEnter(dropIndex)}
                                            onMouseLeave={handleSubMouseLeave}
                                        >
                                            {dropdownItem.onClick ? (
                                                <button
                                                    onClick={() => {
                                                        dropdownItem.onClick();
                                                        handleLinkClick();
                                                    }}
                                                    className="navbar__dropdown-link navbar__dropdown-link--button"
                                                >
                                                    {dropdownItem.title}
                                                </button>
                                            ) : (
                                                <Link to={dropdownItem.link} className="navbar__dropdown-link" onClick={handleLinkClick}>
                                                    {dropdownItem.title}
                                                    {dropdownItem.subDropdown && (
                                                        <ChevronRight
                                                            size={14}
                                                            className="navbar__arrow--sub"
                                                        />
                                                    )}
                                                </Link>
                                            )}

                                            {dropdownItem.subDropdown && activeSubDropdown === dropIndex && (
                                                <ul className="navbar__sub-dropdown">
                                                    {dropdownItem.subDropdown.map((subItem, subIndex) => (
                                                        <li key={subIndex} className="navbar__sub-dropdown-item">
                                                            <Link to={subItem.link} className="navbar__sub-dropdown-link" onClick={handleLinkClick}>
                                                                {subItem.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}

                    {/* Updated Cart Section */}
                    <li className="navbar__item navbar__cart navbar__cart-container">
                        <div className="relative">
                            <button 
                                className="navbar__cart-btn" 
                                onClick={handleCartClick}
                            >
                                <div className="navbar__cart-icon">
                                    <ShoppingCart size={20} />
                                    {totalItems > 0 && (
                                        <span className="navbar__cart-badge">
                                            {totalItems > 99 ? '99+' : totalItems}
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Cart Dropdown */}
                            {cartOpen && (
                                <CartDropdown 
                                    carts={cartData} 
                                    setOpen={setCartOpen} 
                                />
                            )}
                        </div>
                    </li>
                </ul>

                {/* Mobile menu */}
                <div className={`navbar__mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item, index) => (
                        <div key={index} className="navbar__mobile-item">
                            <div className="navbar__mobile-link-container">
                                <Link
                                    to={item.link || '#'}
                                    className="navbar__mobile-link"
                                    onClick={item.link ? handleLinkClick : undefined}
                                >
                                    {item.title}
                                </Link>
                                {item.dropdown && (
                                    <button
                                        className="navbar__mobile-arrow-btn"
                                        onClick={(e) => handleMobileDropdownToggle(index, e)}
                                    >
                                        <ChevronDown
                                            size={20}
                                            className={`navbar__mobile-arrow ${mobileActiveDropdown === index ? 'rotated' : ''}`}
                                        />
                                    </button>
                                )}
                            </div>

                            {item.dropdown && (
                                <div className={`navbar__mobile-dropdown ${mobileActiveDropdown === index ? 'active' : ''}`}>
                                    {item.dropdown.map((dropdownItem, dropIndex) => (
                                        <div key={dropIndex} className="navbar__mobile-dropdown-item">
                                            <div className="navbar__mobile-dropdown-link-container">
                                                {dropdownItem.onClick ? (
                                                    <button
                                                        onClick={() => {
                                                            dropdownItem.onClick();
                                                            handleLinkClick();
                                                        }}
                                                        className="navbar__mobile-dropdown-link navbar__mobile-dropdown-link--button"
                                                    >
                                                        {dropdownItem.title}
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to={dropdownItem.link}
                                                        className="navbar__mobile-dropdown-link"
                                                        onClick={handleLinkClick}
                                                    >
                                                        {dropdownItem.title}
                                                    </Link>
                                                )}
                                                {dropdownItem.subDropdown && (
                                                    <button
                                                        className="navbar__mobile-arrow-btn"
                                                        onClick={(e) => handleMobileSubDropdownToggle(dropIndex, e)}
                                                    >
                                                        <ChevronDown
                                                            size={18}
                                                            className={`navbar__mobile-arrow ${mobileActiveSubDropdown === dropIndex ? 'rotated' : ''}`}
                                                        />
                                                    </button>
                                                )}
                                            </div>

                                            {dropdownItem.subDropdown && (
                                                <div className={`navbar__mobile-sub-dropdown ${mobileActiveSubDropdown === dropIndex ? 'active' : ''}`}>
                                                    {dropdownItem.subDropdown.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.link}
                                                            className="navbar__mobile-sub-dropdown-link"
                                                            onClick={handleLinkClick}
                                                        >
                                                            {subItem.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="navbar__mobile-item">
                        <button className="navbar__mobile-cart" onClick={handleCartClick}>
                            <ShoppingCart size={20} />
                            <span>{t('navbar.navigation.cart')}</span>
                            {totalItems > 0 && (
                                <span className="navbar__mobile-cart-badge">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlay to close cart when clicking outside */}
            {cartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-10 z-40"
                    onClick={() => setCartOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;