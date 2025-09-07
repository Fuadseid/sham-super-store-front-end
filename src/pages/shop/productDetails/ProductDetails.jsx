import { useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext'; // Import the language context
import './ProductDetails.scss';

export const ProductDetails = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [quantity, setQuantity] = useState(1);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('about');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');

    // Language context
    const { t } = useLanguage();

    // Mock products database - in real app, this would be an API call
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "GameMaster2023",
                    rating: 5,
                    date: "2024-01-15",
                    comment: "Amazing keyboard! The RGB lighting is fantastic and the switches feel great."
                },
                {
                    id: 2,
                    user: "ProductivityPro",
                    rating: 4,
                    date: "2024-01-10",
                    comment: "Great for both gaming and work. Build quality is excellent."
                },
                {
                    id: 3,
                    user: "TechReviewer",
                    rating: 5,
                    date: "2024-01-05",
                    comment: "Best keyboard I've owned. Highly recommended!"
                }
            ],
            details: {
                about: "This mechanical gaming keyboard features premium Cherry MX switches, customizable RGB lighting, and durable construction. Designed for both gaming enthusiasts and professionals who demand precision and reliability.",
                shortDescription: "High-quality mechanical keyboard with RGB lighting and Cherry MX switches.",
                moreInformation: "Switch Type: Cherry MX Blue, Backlight: RGB, Connection: USB-C, Compatibility: Windows/Mac/Linux, Warranty: 2 years",
                productRating: "4.5/5 stars based on 234 customer reviews. Customers love the build quality and responsiveness.",
                contactSeller: "Have questions about this product? Our technical specialists are here to help!",
                otherSellers: "This product is also available from 3 other verified sellers with competitive pricing.",
                storePolicy: "Free returns within 30 days, 2-year manufacturer warranty, and lifetime customer support."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "TravelWriter",
                    rating: 4,
                    date: "2024-01-12",
                    comment: "Perfect for travel. Lightweight and responsive."
                },
                {
                    id: 2,
                    user: "OfficeWorker",
                    rating: 4,
                    date: "2024-01-08",
                    comment: "Great for desk setup. Battery lasts forever."
                }
            ],
            details: {
                about: "Ultra-portable wireless keyboard designed for modern professionals. Features low-profile keys, excellent battery life, and seamless connectivity across multiple devices.",
                shortDescription: "Compact wireless keyboard perfect for productivity and travel.",
                moreInformation: "Connection: Bluetooth 5.0, Battery Life: 6 months, Weight: 300g, Dimensions: 28x12x1.5cm",
                productRating: "4.2/5 stars based on 156 customer reviews. Great for travel and office use.",
                contactSeller: "Questions about compatibility or bulk orders? Contact our sales team!",
                otherSellers: "Available from 2 other sellers.",
                storePolicy: "1-year warranty and free technical support."
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
            inStock: false,
            rating: 4.7,
            reviews: 89,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "White", value: "#FFFFFF" }
                ],
                sizes: ["S", "M", "L", "XL"]
            },
            reviewsList: [
                {
                    id: 1,
                    user: "HealthConscious",
                    rating: 5,
                    date: "2024-01-13",
                    comment: "Game changer for my wrist pain. Highly recommended!"
                },
                {
                    id: 2,
                    user: "Developer123",
                    rating: 4,
                    date: "2024-01-09",
                    comment: "Takes time to get used to but worth it for long coding sessions."
                }
            ],
            details: {
                about: "Revolutionary split keyboard design that promotes natural hand positioning and reduces repetitive strain injuries. Perfect for professionals who spend long hours typing.",
                shortDescription: "Ergonomic split design for comfortable typing during long sessions.",
                moreInformation: "Layout: Split QWERTY, Connection: USB-A, Key Travel: 4mm, Wrist Rest: Included, Medical Certification: Yes",
                productRating: "4.7/5 stars based on 89 reviews. Highly recommended by ergonomic specialists.",
                contactSeller: "Any Questions? Please click to submit question about this product.",
                otherSellers: "Limited availability from 1 other seller at higher price.",
                storePolicy: "Extended 45-day return policy for ergonomic products."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "ProGamer",
                    rating: 5,
                    date: "2024-01-14",
                    comment: "Excellent precision for competitive gaming. LED customization is great!"
                },
                {
                    id: 2,
                    user: "CasualPlayer",
                    rating: 4,
                    date: "2024-01-11",
                    comment: "Good value for money. Comfortable grip."
                }
            ],
            details: {
                about: "Professional gaming mouse with high-precision sensor, customizable LED lighting, and ergonomic design for extended gaming sessions.",
                shortDescription: "High-DPI gaming mouse with customizable LED lighting.",
                moreInformation: "DPI: 12000, Buttons: 6 programmable, Sensor: Optical, Cable: Braided USB",
                productRating: "4.3/5 stars based on 445 reviews. Excellent for competitive gaming.",
                contactSeller: "Need help with gaming setup recommendations? Our gaming specialists are here!",
                otherSellers: "Compare prices from 4 other verified sellers.",
                storePolicy: "2-year warranty and gaming gear specialist support."
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
            rating: null, // No rating - will not show rating section
            reviews: 267,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" },
                    { name: "Gray", value: "#6B7280" }
                ],
                sizes: ["Standard"]
            },
            reviewsList: [
                {
                    id: 1,
                    user: "OfficeWorker",
                    rating: 4,
                    date: "2024-01-12",
                    comment: "Reliable and comfortable for daily use."
                },
                {
                    id: 2,
                    user: "Student123",
                    rating: 4,
                    date: "2024-01-08",
                    comment: "Good value for money. Battery lasts long."
                }
            ],
            details: {
                about: "Reliable wireless office mouse with comfortable grip and precise tracking. Perfect for daily office work and general computer use.",
                shortDescription: "Comfortable wireless mouse designed for office productivity.",
                moreInformation: "DPI: 1200, Connection: 2.4GHz wireless, Battery: 2 AA batteries, Range: 10 meters",
                productRating: "No rating available yet. Check individual reviews below.",
                contactSeller: "Ask about bulk pricing for office environments.",
                otherSellers: "Available from 3 other office supply retailers.",
                storePolicy: "1-year manufacturer warranty with free replacement."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "ErgonomicUser",
                    rating: 5,
                    date: "2024-01-15",
                    comment: "Life-changing for my wrist pain. Highly recommended!"
                },
                {
                    id: 2,
                    user: "Developer456",
                    rating: 4,
                    date: "2024-01-10",
                    comment: "Takes getting used to but great for long work sessions."
                }
            ],
            details: {
                about: "Innovative vertical mouse design that eliminates wrist twisting and reduces the risk of repetitive strain injuries. Recommended by occupational therapists.",
                shortDescription: "Vertical ergonomic design reduces wrist strain.",
                moreInformation: "DPI: 1600, Connection: Wireless 2.4GHz, Battery: Rechargeable Li-ion, Grip: Right-handed",
                productRating: "4.6/5 stars based on 178 reviews. Life-changing for users with wrist pain.",
                contactSeller: "Ask about our ergonomic workspace consultation service.",
                otherSellers: "Available from 2 other health-focused retailers.",
                storePolicy: "Health-focused return policy with ergonomic specialist support."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "PhotoEnthusiast",
                    rating: 5,
                    date: "2024-01-16",
                    comment: "Camera quality is outstanding! Best phone camera I've used."
                },
                {
                    id: 2,
                    user: "TechLover",
                    rating: 5,
                    date: "2024-01-13",
                    comment: "Lightning fast performance. Battery lasts all day."
                },
                {
                    id: 3,
                    user: "BusinessUser",
                    rating: 4,
                    date: "2024-01-09",
                    comment: "Great for productivity. Screen is gorgeous."
                }
            ],
            details: {
                about: "Flagship smartphone featuring the latest processor, professional-grade camera system, and premium build quality. Perfect for photography, gaming, and productivity.",
                shortDescription: "Latest flagship smartphone with advanced camera system.",
                moreInformation: "Display: 6.7\" OLED, Storage: 128GB, Camera: Triple 48MP, Battery: 4000mAh, 5G Ready",
                productRating: "4.8/5 stars based on 1205 reviews. Outstanding camera and performance.",
                contactSeller: "Questions about trade-in programs or need help choosing storage size?",
                otherSellers: "Compare prices from authorized retailers.",
                storePolicy: "30-day return policy with full manufacturer warranty."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "BudgetBuyer",
                    rating: 4,
                    date: "2024-01-14",
                    comment: "Great value for money. Does everything I need."
                },
                {
                    id: 2,
                    user: "FirstTimeUser",
                    rating: 4,
                    date: "2024-01-11",
                    comment: "Perfect for my first smartphone. Easy to use."
                }
            ],
            details: {
                about: "Budget-friendly smartphone that doesn't compromise on essential features. Great for first-time smartphone users or those looking for reliable backup device.",
                shortDescription: "Affordable smartphone with essential features.",
                moreInformation: "Display: 6.1\" LCD, Storage: 64GB, Camera: 13MP, Battery: 3000mAh, OS: Android 13",
                productRating: "4.0/5 stars based on 589 reviews. Great value for money.",
                contactSeller: "Ask about our prepaid plan bundles and accessories.",
                otherSellers: "Available from 2 other mobile retailers.",
                storePolicy: "1-year limited warranty and customer support."
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
            inStock: true,
            rating: 4.8,
            reviews: 342,
            condition: "New",
            attributes: {
                colors: [
                    { name: "Black", value: "#000000" }
                ],
                sizes: ["27\"", "32\""]
            },
            reviewsList: [
                {
                    id: 1,
                    user: "GamerPro",
                    rating: 5,
                    date: "2024-01-15",
                    comment: "Incredible display quality. Perfect for competitive gaming."
                },
                {
                    id: 2,
                    user: "ContentCreator",
                    rating: 5,
                    date: "2024-01-12",
                    comment: "Colors are amazing. Great for video editing too."
                }
            ],
            details: {
                about: "Professional 4K gaming monitor with stunning visual clarity, HDR support, and ultra-fast refresh rate. Perfect for gaming, content creation, and professional work.",
                shortDescription: "Ultra HD 4K gaming monitor with HDR support and 144Hz refresh rate.",
                moreInformation: "Resolution: 3840x2160, Refresh Rate: 144Hz, HDR: HDR10, Inputs: HDMI 2.1, DisplayPort 1.4, USB-C",
                productRating: "4.8/5 stars based on 342 reviews. Exceptional color accuracy and gaming performance.",
                contactSeller: "Ask about our monitor calibration service and mounting solutions.",
                otherSellers: "Available from 3 other electronics retailers.",
                storePolicy: "3-year warranty with on-site replacement service."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "HardcoreGamer",
                    rating: 5,
                    date: "2024-01-16",
                    comment: "Beast of a machine! Runs everything at max settings."
                },
                {
                    id: 2,
                    user: "StreamerLife",
                    rating: 5,
                    date: "2024-01-13",
                    comment: "Perfect for streaming and gaming simultaneously."
                }
            ],
            details: {
                about: "Ultimate gaming laptop powered by RTX 4070 graphics and latest generation processor. Features advanced cooling, high-refresh display, and premium build quality for serious gamers.",
                shortDescription: "High-performance gaming laptop with RTX 4070 graphics and 16GB RAM.",
                moreInformation: "CPU: Intel i7-13700H, GPU: RTX 4070 8GB, RAM: 16GB DDR5, Storage: 1TB NVMe SSD, Display: 15.6\" 165Hz",
                productRating: "4.7/5 stars based on 445 reviews. Exceptional gaming performance and build quality.",
                contactSeller: "Ask about our gaming setup consultation and accessories bundle.",
                otherSellers: "Compare configurations from 2 other gaming specialists.",
                storePolicy: "2-year premium warranty with gaming support hotline."
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
            },
            reviewsList: [
                {
                    id: 1,
                    user: "DigitalArtist",
                    rating: 5,
                    date: "2024-01-17",
                    comment: "Perfect for digital art. Stylus is incredibly responsive."
                },
                {
                    id: 2,
                    user: "CreativePro",
                    rating: 5,
                    date: "2024-01-14",
                    comment: "Replaced my laptop for most tasks. Screen is gorgeous."
                }
            ],
            details: {
                about: "Professional-grade tablet designed for creative professionals and power users. Features stunning display, powerful processor, and full compatibility with professional creative apps.",
                shortDescription: "Professional tablet with keyboard support and Apple Pencil compatibility.",
                moreInformation: "Display: 12.9\" Liquid Retina, Storage: 256GB, CPU: M2 chip, Camera: 12MP, Compatibility: Apple Pencil, Magic Keyboard",
                productRating: "4.8/5 stars based on 567 reviews. Industry-leading performance for creative professionals.",
                contactSeller: "Ask about our creative professional bundle deals and financing options.",
                otherSellers: "Available from authorized retailers with same warranty.",
                storePolicy: "AppleCare+ available with comprehensive coverage and priority support."
            }
        }
    };

    // Get product by ID from URL params
    const product = productsDatabase[productId];

    // Initialize selected attributes with first available option
    useState(() => {
        if (product?.attributes?.colors?.length > 0) {
            setSelectedColor(product.attributes.colors[0].name);
        }
        if (product?.attributes?.sizes?.length > 0) {
            setSelectedSize(product.attributes.sizes[0]);
        }
    }, [product]);

    // Handle product not found
    if (!product) {
        return (
            <div className="product-details">
                <div className="error-message">
                    <h2>{t('shop.productDetails.errors.productNotFound')}</h2>
                    <p>{t('shop.productDetails.errors.productNotFoundDescription')}</p>
                    <button onClick={() => navigate('/shop')}>
                        {t('shop.productDetails.errors.backToShop')}
                    </button>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        console.log(`Added ${quantity} items to cart`, {
            productId,
            sku: product.sku,
            color: selectedColor,
            size: selectedSize,
            quantity
        });
        // Add your cart logic here
    };

    // FIXED: Properly handle comparison state
    const handleCompare = () => {
        let existingProductIds = [];

        // Check for existing comparison products from multiple sources
        const urlProducts = searchParams.get('products'); // Direct from compare page
        const urlCompare = searchParams.get('compare'); // From shop page with compare state

        if (urlProducts) {
            existingProductIds = urlProducts.split(',').filter(id => id && productsDatabase[id]);
        } else if (urlCompare) {
            existingProductIds = urlCompare.split(',').filter(id => id && productsDatabase[id]);
        }

        // Add current product if not already in the list
        if (!existingProductIds.includes(productId)) {
            existingProductIds.push(productId);
        }

        // Navigate to compare page with all products
        navigate(`/compare?products=${existingProductIds.join(',')}`);

        console.log('Added to compare:', {
            productId,
            name: product.name,
            sku: product.sku,
            compareList: existingProductIds
        });
    };

    const handleInquiry = () => {
        // Navigate to inquiry page with product details
        navigate(`/inquiry/${productId}`, {
            state: {
                productName: product.name,
                sku: product.sku
            }
        });
    };

    const handleStoreClick = () => {
        // Navigate to store page - using store ID 2153 as default
        // In a real app, this would be dynamic based on the product's seller
        navigate('/shop/store/2153');
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

    // Helper function to get review count text with proper pluralization
    const getReviewCountText = (count) => {
        if (count === 1) {
            return `${count} ${t('shop.productDetails.productInfo.review')}`;
        }
        return `${count} ${t('shop.productDetails.productInfo.reviews')}`;
    };

    const tabs = [
        { id: 'about', label: t('shop.productDetails.tabs.aboutItem') },
        { id: 'shortDescription', label: t('shop.productDetails.tabs.shortDescription') },
        { id: 'moreInformation', label: t('shop.productDetails.tabs.moreInformation') },
        { id: 'productRating', label: t('shop.productDetails.tabs.productRating') },
        { id: 'reviews', label: t('shop.productDetails.tabs.reviews') },
        { id: 'shippingTime', label: t('shop.productDetails.tabs.shippingTime') },
        { id: 'contactSeller', label: t('shop.productDetails.tabs.contactSeller') },
        { id: 'otherSellers', label: t('shop.productDetails.tabs.otherSellers') },
        { id: 'marketplacePolicy', label: t('shop.productDetails.tabs.marketplacePolicy') },
        { id: 'storePolicy', label: t('shop.productDetails.tabs.storePolicy') }
    ];

    const hasSale = product.originalPrice && product.originalPrice > product.price;

    const renderTabContent = () => {
        if (activeTab === 'reviews') {
            return (
                <div className="reviews-section">
                    {product.reviewsList && product.reviewsList.length > 0 ? (
                        <div className="reviews-list">
                            {product.reviewsList.map((review) => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <span className="review-user">{review.user}</span>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>{t('shop.productDetails.reviews.noReviews')}</p>
                    )}
                </div>
            );
        } else if (activeTab === 'contactSeller') {
            return (
                <div className="inquiry-section">
                    <p>{product.details[activeTab]}</p>
                    <button className="inquiry-btn" onClick={handleInquiry}>
                        {t('shop.productDetails.contact.contactSeller')}
                    </button>
                </div>
            );
        } else if (activeTab === 'shippingTime') {
            return (
                <div className="shipping-section">
                    {product.inStock ? (
                        <p>
                            <strong>{t('shop.productDetails.shipping.available')}</strong> - {t('shop.productDetails.shipping.shippingTime')}
                        </p>
                    ) : (
                        <p>
                            <strong>{t('shop.productDetails.shipping.outOfStock')}</strong> {t('shop.productDetails.shipping.expectedRestock')}
                        </p>
                    )}
                </div>
            );
        } else if (activeTab === 'marketplacePolicy') {
            return (
                <div className="marketplace-policy-section">
                    <div className="policy-features">
                        <div className="policy-feature">
                            <div className="policy-icon">
                                🛡️
                            </div>
                            <div className="policy-content">
                                <h4>{t('shop.productDetails.policy.securePayments.title')}</h4>
                                <p>{t('shop.productDetails.policy.securePayments.description')}</p>
                            </div>
                        </div>

                        <div className="policy-feature">
                            <div className="policy-icon">
                                🚚
                            </div>
                            <div className="policy-content">
                                <h4>{t('shop.productDetails.policy.freeShipping.title')}</h4>
                                <p>{t('shop.productDetails.policy.freeShipping.description')}</p>
                            </div>
                        </div>

                        <div className="policy-feature">
                            <div className="policy-icon">
                                🎧
                            </div>
                            <div className="policy-content">
                                <h4>{t('shop.productDetails.policy.customerSupport.title')}</h4>
                                <p>{t('shop.productDetails.policy.customerSupport.description')}</p>
                            </div>
                        </div>

                        <div className="policy-feature">
                            <div className="policy-icon">
                                🔄
                            </div>
                            <div className="policy-content">
                                <h4>{t('shop.productDetails.policy.returnPeriod.title')}</h4>
                                <p>{t('shop.productDetails.policy.returnPeriod.description')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (activeTab === 'storePolicy') {
            return (
                <div className="store-policy-section">
                    {product.details[activeTab] && product.details[activeTab].trim() !== '' ? (
                        <p>{product.details[activeTab]}</p>
                    ) : (
                        <p>{t('shop.productDetails.policy.noStorePolicy')}</p>
                    )}
                </div>
            );
        } else if (activeTab === 'productRating') {
            return (
                <div className="product-rating-section">
                    {product.rating ? (
                        <div className="rating-display">
                            <div className="rating-stars">
                                {renderStars(product.rating)}
                                <span className="rating-value">({product.rating})</span>
                            </div>
                            <p className="rating-text">
                                {t('shop.productDetails.reviews.basedOn', { count: product.reviews })}
                                {product.rating >= 4.5 ? ` ${t('shop.productDetails.reviews.outstanding')}` :
                                    product.rating >= 4.0 ? ` ${t('shop.productDetails.reviews.great')}` :
                                        product.rating >= 3.5 ? ` ${t('shop.productDetails.reviews.good')}` :
                                            ` ${t('shop.productDetails.reviews.mixed')}`}
                            </p>
                        </div>
                    ) : (
                        <p>{t('shop.productDetails.reviews.noRating')}</p>
                    )}
                </div>
            );
        } else {
            return <p>{product.details[activeTab]}</p>;
        }
    };

    return (
        <div className="product-details">
            <div className="product-container">
                {/* Product Images Section */}
                <div className="product-images">
                    <div className="main-image-container">
                        <div className="image-wrapper">
                            {hasSale && <div className="sale-badge">Sale</div>}
                            <img
                                src={product.images[selectedImageIndex]}
                                alt={`${product.name}`}
                                className="main-image"
                            />
                            {product.images.length > 1 && (
                                <>
                                    <button
                                        className="nav-btn prev-btn"
                                        onClick={() => setSelectedImageIndex(prev =>
                                            prev === 0 ? product.images.length - 1 : prev - 1
                                        )}
                                    >
                                        ❮
                                    </button>
                                    <button
                                        className="nav-btn next-btn"
                                        onClick={() => setSelectedImageIndex(prev =>
                                            prev === product.images.length - 1 ? 0 : prev + 1
                                        )}
                                    >
                                        ❯
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Pagination dots */}
                        {product.images.length > 1 && (
                            <div className="pagination-dots">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`dot ${index === selectedImageIndex ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="thumbnails-container">
                            <div className="thumbnails-grid">
                                {product.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Product Info Section */}
                <div className="product-info">
                    <div className="sku-section">
                        <span className="sku-label">{t('shop.productDetails.productInfo.sku')}</span>
                        <span className="sku-value">{product.sku}</span>
                    </div>

                    <h1 className="product-name">{product.name}</h1>

                    {/* Rating Section - only show if rating exists */}
                    {product.rating && (
                        <div className="rating-section">
                            <div className="rating-stars">
                                {renderStars(product.rating)}
                                <span className="rating-value">({product.rating})</span>
                            </div>
                            <span className="review-count">{getReviewCountText(product.reviews)}</span>
                        </div>
                    )}

                    <div className="price-container">
                        <span className="current-price">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Attributes Section */}
                    {product.attributes && (
                        <div className="attributes-section">
                            {/* Color Selection */}
                            {product.attributes.colors && product.attributes.colors.length > 0 && (
                                <div className="attribute-group">
                                    <span className="attribute-label">
                                        {t('shop.productDetails.productInfo.color')} <strong>{selectedColor}</strong>
                                    </span>
                                    <div className="color-options">
                                        {product.attributes.colors.map((color) => (
                                            <button
                                                key={color.name}
                                                className={`color-option ${selectedColor === color.name ? 'selected' : ''}`}
                                                style={{ backgroundColor: color.value }}
                                                onClick={() => setSelectedColor(color.name)}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Size Selection */}
                            {product.attributes.sizes && product.attributes.sizes.length > 0 && (
                                <div className="attribute-group">
                                    <span className="attribute-label">{t('shop.productDetails.productInfo.size')}</span>
                                    <div className="size-options">
                                        {product.attributes.sizes.map((size) => (
                                            <button
                                                key={size}
                                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
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

                    <div className="tags-section">
                        <span className="tags-label">{t('shop.productDetails.productInfo.tags')}</span>
                        {product.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>

                    <div className="description">
                        <p>{product.description}</p>
                    </div>

                    <div className="purchase-section">
                        <div className="quantity-selector">
                            <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                                className="quantity-btn"
                                onClick={() => handleQuantityChange('increment')}
                            >
                                +
                            </button>
                        </div>

                        <button
                            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                        >
                            {product.inStock ?
                                t('shop.productDetails.productInfo.addToCart') :
                                t('shop.productDetails.productInfo.outOfStock')
                            }
                        </button>
                    </div>

                    <button className="compare-btn" onClick={handleCompare}>
                        {t('shop.productDetails.productInfo.compare')}
                    </button>

                    <div className="sold-by">
                        <span>{t('shop.productDetails.productInfo.soldBy')}</span>
                        <div
                            className="sold-by-details clickable"
                            onClick={handleStoreClick}
                            title={t('shop.productDetails.accessibility.viewStoreDetails')}
                        >
                            2153
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <div className="product-tabs">
                <div className="tabs-navigation">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="tab-content">
                    <div className="tab-panel">
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;