import React, { useState, useEffect } from 'react';
import { Mail, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartReducer';
import { useLanguage } from '../../context/LanguageContext';
import shamSuperStoreLogo from '../../assets/images/shamSuperStoreLogo.jpg';
import './Navbar.scss';

const Navbar = () => {
    const navigate = useNavigate();
    const { toggleCart, getTotalItems } = useCart();
    const { t, language, changeLanguage, isRTL } = useLanguage();
    const totalItems = getTotalItems();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [activeSubDropdown, setActiveSubDropdown] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
    const [mobileActiveSubDropdown, setMobileActiveSubDropdown] = useState(null);

    const navItems = [
        {
            title: t('navbar.navigation.home'),
            link: '/'
        },
        {
            title: t('navbar.navigation.shop'),
            link: '/shop',
            dropdown: [
                { title: t('navbar.shop.allCategories'), link: '/shop' },
                {
                    title: t('navbar.shop.computer'),
                    link: '/shop/category/1',
                    subDropdown: [
                        { title: t('navbar.computer.desktop'), link: '/shop/category/1/desktop' },
                        { title: t('navbar.computer.tablet'), link: '/shop/category/1/tablet' },
                        { title: t('navbar.computer.monitor'), link: '/shop/category/1/monitor' },
                        { title: t('navbar.computer.mouseKeyboard'), link: '/shop/category/1/mouse-keyboard' },
                        { title: t('navbar.computer.software'), link: '/shop/category/1/software' },
                        { title: t('navbar.computer.accessories'), link: '/shop/category/1/accessories' },
                        { title: t('navbar.computer.components'), link: '/shop/category/1/components' }
                    ]
                },
                {
                    title: t('navbar.shop.electronics'),
                    link: '/shop/category/2',
                    subDropdown: [
                        { title: t('navbar.electronics.mobile'), link: '/shop/category/2/mobile' },
                        { title: t('navbar.electronics.wearable'), link: '/shop/category/2/wearable' },
                        { title: t('navbar.electronics.tvVideo'), link: '/shop/category/2/tv-video' },
                        { title: t('navbar.electronics.speakers'), link: '/shop/category/2/speakers' },
                        { title: t('navbar.electronics.cameras'), link: '/shop/category/2/cameras' },
                        { title: t('navbar.electronics.moviesMusic'), link: '/shop/category/2/movies-music' },
                        { title: t('navbar.electronics.musicalInstruments'), link: '/shop/category/2/musical-instruments' },
                        { title: t('navbar.electronics.officeEquipment'), link: '/shop/category/2/office-equipment' }
                    ]
                },
                {
                    title: t('navbar.shop.smartHome'),
                    link: '/shop/category/3',
                    subDropdown: [
                        { title: t('navbar.smartHome.smartLock'), link: '/shop/category/3/smart-lock' },
                        { title: t('navbar.smartHome.smartLighting'), link: '/shop/category/3/smart-lighting' },
                        { title: t('navbar.smartHome.vacuumsMops'), link: '/shop/category/3/vacuums-mops' },
                        { title: t('navbar.smartHome.plugsOutlets'), link: '/shop/category/3/plugs-outlets' },
                        { title: t('navbar.smartHome.wifiNetworking'), link: '/shop/category/3/wifi-networking' },
                        { title: t('navbar.smartHome.detectorsSensors'), link: '/shop/category/3/detectors-sensors' },
                        { title: t('navbar.smartHome.securityCameras'), link: '/shop/category/3/security-cameras' }
                    ]
                },
                {
                    title: t('navbar.shop.homeGarden'),
                    link: '/shop/category/4',
                    subDropdown: [
                        { title: t('navbar.homeGarden.homeAppliances'), link: '/shop/category/4/home-appliances' },
                        { title: t('navbar.homeGarden.kitchen'), link: '/shop/category/4/kitchen' },
                        { title: t('navbar.homeGarden.bath'), link: '/shop/category/4/bath' },
                        { title: t('navbar.homeGarden.laundry'), link: '/shop/category/4/laundry' },
                        { title: t('navbar.homeGarden.heatingCooling'), link: '/shop/category/4/heating-cooling' },
                        { title: t('navbar.homeGarden.lighting'), link: '/shop/category/4/lighting' },
                        { title: t('navbar.homeGarden.homeAudioVideo'), link: '/shop/category/4/home-audio-video' },
                        { title: t('navbar.homeGarden.storage'), link: '/shop/category/4/storage' },
                        { title: t('navbar.homeGarden.homeRepair'), link: '/shop/category/4/home-repair' },
                        { title: t('navbar.homeGarden.lawnGarden'), link: '/shop/category/4/lawn-garden' },
                        { title: t('navbar.homeGarden.gardenSupplies'), link: '/shop/category/4/garden-supplies' }
                    ]
                },
                {
                    title: t('navbar.shop.furniture'),
                    link: '/shop/category/5',
                    subDropdown: [
                        { title: t('navbar.furniture.chair'), link: '/shop/category/5/chair' },
                        { title: t('navbar.furniture.sofa'), link: '/shop/category/5/sofa' },
                        { title: t('navbar.furniture.livingRoom'), link: '/shop/category/5/living-room' },
                        { title: t('navbar.furniture.guestRoom'), link: '/shop/category/5/guest-room' },
                        { title: t('navbar.furniture.kidsRoom'), link: '/shop/category/5/kids-room' },
                        { title: t('navbar.furniture.diningRoom'), link: '/shop/category/5/dining-room' },
                        { title: t('navbar.furniture.bedroom'), link: '/shop/category/5/bedroom' },
                        { title: t('navbar.furniture.studyOffice'), link: '/shop/category/5/study-office' },
                        { title: t('navbar.furniture.outdoor'), link: '/shop/category/5/outdoor' },
                        { title: t('navbar.furniture.antiques'), link: '/shop/category/5/antiques' }
                    ]
                },
                {
                    title: t('navbar.shop.clothes'),
                    link: '/shop/category/6',
                    subDropdown: [
                        { title: t('navbar.clothes.womens'), link: '/shop/category/6/womens' },
                        { title: t('navbar.clothes.mens'), link: '/shop/category/6/mens' },
                        { title: t('navbar.clothes.girls'), link: '/shop/category/6/girls' },
                        { title: t('navbar.clothes.boys'), link: '/shop/category/6/boys' },
                        { title: t('navbar.clothes.childrens'), link: '/shop/category/6/childrens' },
                        { title: t('navbar.clothes.baby'), link: '/shop/category/6/baby' }
                    ]
                },
                {
                    title: t('navbar.shop.shoes'),
                    link: '/shop/category/7',
                    subDropdown: [
                        { title: t('navbar.shoes.womens'), link: '/shop/category/7/womens' },
                        { title: t('navbar.shoes.mens'), link: '/shop/category/7/mens' },
                        { title: t('navbar.shoes.girls'), link: '/shop/category/7/girls' },
                        { title: t('navbar.shoes.boys'), link: '/shop/category/7/boys' },
                        { title: t('navbar.shoes.childrens'), link: '/shop/category/7/childrens' }
                    ]
                },
                {
                    title: t('navbar.shop.babiesKidsChildren'),
                    link: '/shop/category/8',
                    subDropdown: [
                        { title: t('navbar.babiesKids.babies'), link: '/shop/category/8/babies' },
                        { title: t('navbar.babiesKids.kids'), link: '/shop/category/8/kids' },
                        { title: t('navbar.babiesKids.toys'), link: '/shop/category/8/toys' },
                        { title: t('navbar.babiesKids.diapers'), link: '/shop/category/8/diapers' }
                    ]
                },
                { title: t('navbar.shop.teenSupplies'), link: '/shop/category/9' },
                {
                    title: t('navbar.shop.beautyHealth'),
                    link: '/shop/category/10',
                    subDropdown: [
                        { title: t('navbar.beautyHealth.cosmetics'), link: '/shop/category/10/cosmetics' },
                        { title: t('navbar.beautyHealth.skinCare'), link: '/shop/category/10/skin-care' },
                        { title: t('navbar.beautyHealth.salonSpa'), link: '/shop/category/10/salon-spa' },
                        { title: t('navbar.beautyHealth.vitamins'), link: '/shop/category/10/vitamins' },
                        { title: t('navbar.beautyHealth.mensCosmetics'), link: '/shop/category/10/mens-cosmetics' },
                        { title: t('navbar.beautyHealth.jewelry'), link: '/shop/category/10/jewelry' },
                        { title: t('navbar.beautyHealth.sunglasses'), link: '/shop/category/10/sunglasses' },
                        { title: t('navbar.beautyHealth.watches'), link: '/shop/category/10/watches' }
                    ]
                },
                {
                    title: t('navbar.shop.sportsOutdoor'),
                    link: '/shop/category/11',
                    subDropdown: [
                        { title: t('navbar.sportsOutdoor.sportsEquipment'), link: '/shop/category/11/sports-equipment' },
                        { title: t('navbar.sportsOutdoor.exerciseFitness'), link: '/shop/category/11/exercise-fitness' },
                        { title: t('navbar.sportsOutdoor.gameRooms'), link: '/shop/category/11/game-rooms' },
                        { title: t('navbar.sportsOutdoor.outdoorEntertainment'), link: '/shop/category/11/outdoor-entertainment' },
                        { title: t('navbar.sportsOutdoor.golf'), link: '/shop/category/11/golf' },
                        { title: t('navbar.sportsOutdoor.hunting'), link: '/shop/category/11/hunting' },
                        { title: t('navbar.sportsOutdoor.cycling'), link: '/shop/category/11/cycling' },
                        { title: t('navbar.sportsOutdoor.fishingBoating'), link: '/shop/category/11/fishing-boating' }
                    ]
                },
                {
                    title: t('navbar.shop.foodGrocery'),
                    link: '/shop/category/12',
                    subDropdown: [
                        { title: t('navbar.foodGrocery.gourmet'), link: '/shop/category/12/gourmet' }
                    ]
                },
                {
                    title: t('navbar.shop.petsSupplies'),
                    link: '/shop/category/13',
                    subDropdown: [
                        { title: t('navbar.petsSupplies.catFood'), link: '/shop/category/13/cat-food' },
                        { title: t('navbar.petsSupplies.catSupplies'), link: '/shop/category/13/cat-supplies' },
                        { title: t('navbar.petsSupplies.dogFood'), link: '/shop/category/13/dog-food' },
                        { title: t('navbar.petsSupplies.dogSupplies'), link: '/shop/category/13/dog-supplies' },
                        { title: t('navbar.petsSupplies.birdFood'), link: '/shop/category/13/bird-food' },
                        { title: t('navbar.petsSupplies.birdSupplies'), link: '/shop/category/13/bird-supplies' },
                        { title: t('navbar.petsSupplies.fishSupplies'), link: '/shop/category/13/fish-supplies' },
                        { title: t('navbar.petsSupplies.otherAnimals'), link: '/shop/category/13/other-animals' }
                    ]
                },
                {
                    title: t('navbar.shop.entertainment'),
                    link: '/shop/category/14',
                    subDropdown: [
                        { title: t('navbar.entertainment.videoGames'), link: '/shop/category/14/video-games' },
                        { title: t('navbar.entertainment.homeEntertainment'), link: '/shop/category/14/home-entertainment' },
                        { title: t('navbar.entertainment.vr'), link: '/shop/category/14/vr' }
                    ]
                },
                {
                    title: t('navbar.shop.handmade'),
                    link: '/shop/category/15',
                    subDropdown: [
                        { title: t('navbar.handmade.artsCrafts'), link: '/shop/category/15/arts-crafts' }
                    ]
                },
                { title: t('navbar.shop.schoolOffice'), link: '/shop/category/16' },
                { title: t('navbar.shop.books'), link: '/shop/category/17' },
                { title: t('navbar.shop.cars'), link: '/shop/category/18' },
                { title: t('navbar.shop.industrialScientific'), link: '/shop/category/19' },
                {
                    title: t('navbar.shop.bagsLuggage'),
                    link: '/shop/category/20',
                    subDropdown: [
                        { title: t('navbar.bagsLuggage.handbags'), link: '/shop/category/20/handbags' },
                        { title: t('navbar.bagsLuggage.shoulderBags'), link: '/shop/category/20/shoulder-bags' },
                        { title: t('navbar.bagsLuggage.luggage'), link: '/shop/category/20/luggage' }
                    ]
                }
            ]
        },
        {
            title: t('navbar.navigation.myAccount'),
            link: '/my-account',
            dropdown: [
                { title: t('navbar.myAccount.dashboard'), link: '/my-account' },
                { title: t('navbar.myAccount.orders'), link: '/my-account' },
                { title: t('navbar.myAccount.orderTracking'), link: '/my-account' },
                { title: t('navbar.myAccount.downloads'), link: '/my-account' },
                { title: t('navbar.myAccount.addresses'), link: '/my-account' },
                { title: t('navbar.myAccount.paymentMethods'), link: '/my-account' },
                { title: t('navbar.myAccount.accountDetails'), link: '/my-account' },
                { title: t('navbar.myAccount.wishlist'), link: '/my-account' },
                { title: t('navbar.myAccount.following'), link: '/my-account' },
                { title: t('navbar.myAccount.supportTickets'), link: '/my-account' },
                { title: t('navbar.myAccount.contactedSellers'), link: '/my-account' },
                { title: t('navbar.myAccount.lostPassword'), link: '/my-account' }
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
    };

    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
        setActiveSubDropdown(null);
        setMobileActiveDropdown(null);
        setMobileActiveSubDropdown(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
        handleLinkClick();
    };

    const handleCartClick = () => {
        toggleCart();
        handleLinkClick();
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

    return (
        <nav className={`navbar ${isRTL ? 'rtl' : 'ltr'}`}>
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

                                            {/* Third Level Dropdown */}
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

                    <li className="navbar__item navbar__cart">
                        <button className="navbar__cart-btn" onClick={handleCartClick}>
                            <div className="navbar__cart-icon">
                                <ShoppingCart size={20} />
                                {totalItems > 0 && (
                                    <span className="navbar__cart-badge">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </div>
                        </button>
                    </li>
                </ul>

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
        </nav>
    );
};

export default Navbar;