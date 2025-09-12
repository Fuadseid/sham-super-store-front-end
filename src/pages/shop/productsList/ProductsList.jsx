import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, ChevronLeft, Star } from "lucide-react";
import ProductsOnSale from "../productsOnSale/ProductsOnSale";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import { useLanguage } from "../../../context/LanguageContext";
import "./ProductsList.scss";
import {
  useGetcategoryDetailQuery,
  useGetproductperCategoryQuery,
} from "../../../stores/apiSlice";
import { useSelector } from "react-redux";

export const ProductsList = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("name");
  const [filterInStock, setFilterInStock] = useState(false);
  const { media_url } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const {
    data: productpercategory,
    isLoading,
    isError,
  } = useGetproductperCategoryQuery(subcategoryId);
  const [product, setProduct] = useState([]);
  const productsData = productpercategory?.data.data;
  useEffect(() => {
    if (productsData) {
      setProduct(productsData);
    }
  }, [productsData]);
  console.log("Product Data", productsData);
  // Language context
  const { t } = useLanguage();
  const {
    data: categoryDetail,
    isLoading: categoryload,
    isError: categoryError,
  } = useGetcategoryDetailQuery(categoryId);
  const [detail, setDetail] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const subcatdetail = categoryDetail?.data.children;
  const cate = categoryDetail?.data.category_products;
  console.log("category Detail", subcatdetail);
  useEffect(() => {
    if (subcatdetail) {
      setDetail(subcatdetail);
    }
  }, [subcatdetail]);
  useEffect(
    (cate) => {
      if (cate) {
        setCatagory(cate);
      }
    },
    [cate]
  );

  // New filter states
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [minRating, setMinRating] = useState(0);

  // Get comparison state from URL
  const compareProducts = searchParams.get("compare");

  // Categories data
  const categories = {
    1: { name: "Computer" },
    2: { name: "Electronics" },
    6: { name: "Clothes" },
  };

  // Subcategories data
  const subcategories = {
    11: { name: "Keyboards", categoryId: 1 },
    12: { name: "Mice", categoryId: 1 },
    13: { name: "Monitors", categoryId: 1 },
    14: { name: "Laptops", categoryId: 1 },
    15: { name: "Desktops", categoryId: 1 },
    21: { name: "Smartphones", categoryId: 2 },
    22: { name: "Tablets", categoryId: 2 },
    61: { name: "Men's Clothing", categoryId: 6 },
  };

  const productsDataa = {
    11: [
      {
        id: 101,
        name: "Mechanical Gaming Keyboard RGB",
        price: 89.99,
        originalPrice: 129.99,
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["Full Size", "Compact"],
        colors: ["Black", "White", "RGB"],
        condition: "new",
        rating: 4.5,
      },
      {
        id: 102,
        name: "Wireless Compact Keyboard",
        price: 45.99,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["Compact"],
        colors: ["Black", "Silver"],
        condition: "new",
        rating: 4.2,
      },
      {
        id: 103,
        name: "Ergonomic Split Keyboard",
        price: 159.99,
        originalPrice: 199.99,
        image:
          "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop&crop=center",
        inStock: false,
        sizes: ["Full Size"],
        colors: ["Black", "White"],
        condition: "openBox",
        rating: 4.8,
      },
      {
        id: 104,
        name: "Membrane Office Keyboard",
        price: 24.99,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["Full Size"],
        colors: ["Black"],
        condition: "used",
        rating: 3.9,
      },
    ],
    12: [
      {
        id: 201,
        name: "Gaming Mouse with LED",
        price: 29.99,
        originalPrice: 39.99,
        image:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["Standard"],
        colors: ["Black", "Red", "Blue"],
        condition: "new",
        rating: 4.3,
      },
      {
        id: 202,
        name: "Wireless Office Mouse",
        price: 19.99,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1563297007-0686b7003af7?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["Standard"],
        colors: ["Black", "Silver", "White"],
        condition: "new",
        rating: 4.0,
      },
      {
        id: 203,
        name: "Ergonomic Vertical Mouse",
        price: 65.99,
        originalPrice: 85.99,
        image:
          "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["Large"],
        colors: ["Black", "Gray"],
        condition: "openBox",
        rating: 4.6,
      },
    ],
    61: [
      {
        id: 701,
        name: "Premium Cotton Dress Shirt",
        price: 89.99,
        originalPrice: 129.99,
        image:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Blue", "Black"],
        condition: "new",
        rating: 4.7,
      },
      {
        id: 702,
        name: "Casual Denim Jeans",
        price: 69.99,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["Blue", "Black", "Gray"],
        condition: "new",
        rating: 4.4,
      },
      {
        id: 703,
        name: "Wool Blend Suit Jacket",
        price: 299.99,
        originalPrice: 399.99,
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Navy", "Charcoal", "Black"],
        condition: "used",
        rating: 4.8,
      },
      {
        id: 704,
        name: "Casual Polo Shirt",
        price: 39.99,
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&crop=center",
        inStock: true,
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Navy", "Red", "Green"],
        condition: "new",
        rating: 4.1,
      },
    ],
  };

  const category = catagory;
  const subcategory = detail;
  const products = product || [];

  // Get unique filter options from products
  const filterOptions = useMemo(() => {
    const sizes = [...new Set(products.flatMap((p) => p.sizes || []))];
    const colors = [...new Set(products.flatMap((p) => p.colors || []))];
    const conditions = [
      ...new Set(products.map((p) => p.condition).filter(Boolean)),
    ];

    return { sizes, colors, conditions };
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by stock
    if (filterInStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Filter by price range
    if (priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(priceRange.min)
      );
    }
    if (priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(priceRange.max)
      );
    }

    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.sizes &&
          product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.colors &&
          product.colors.some((color) => selectedColors.includes(color))
      );
    }

    // Filter by condition
    if (selectedCondition) {
      filtered = filtered.filter(
        (product) => product.condition === selectedCondition
      );
    }

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(
        (product) => (product.rating || 0) >= minRating
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [
    products,
    sortBy,
    filterInStock,
    searchTerm,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedCondition,
    minRating,
  ]);

  const handleBackToSubcategories = () => {
    if (compareProducts) {
      navigate(`/shop/category/${categoryId}?compare=${compareProducts}`);
    } else {
      navigate(`/shop/category/${categoryId}`);
    }
  };

  const handleProductClick = (productId) => {
    if (compareProducts) {
      navigate(`/shop/product/${productId}?compare=${compareProducts}`);
    } else {
      navigate(`/shop/product/${productId}`);
    }
  };

  const handleSearch = () => {
    // Search is already handled by the useMemo dependency on searchTerm
  };

  const clearFilters = () => {
    setPriceRange({ min: "", max: "" });
    setFilterInStock(false);
    setSearchTerm("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCondition("");
    setMinRating(0);
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "star filled" : "star"}
        fill={i < rating ? "currentColor" : "none"}
      />
    ));
  };

  const getConditionTranslation = (condition) => {
    switch (condition) {
      case "new":
        return t("shop.productsList.conditions.new");
      case "used":
        return t("shop.productsList.conditions.used");
      case "openBox":
        return t("shop.productsList.conditions.openBox");
      case "refurbished":
        return t("shop.productsList.conditions.refurbished");
      default:
        return condition;
    }
  };

  if (!subcategory && productpercategory) {
    return (
      <div className="shop-page">
        <div className="sidebar">
          <ProductsOnSale compareProducts={compareProducts} />
          <FeaturedProducts compareProducts={compareProducts} />
        </div>
        <div className="main-content">
          <div className="error-message">
            <h2>{t("shop.productsList.results.comingSoon")}</h2>
            <button onClick={handleBackToSubcategories}>
              {t("shop.productsList.navigation.backTo", {
                categoryName: "Categories",
              })}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="sidebar">
        <ProductsOnSale compareProducts={compareProducts} />
        <FeaturedProducts compareProducts={compareProducts} />
      </div>
      <div className="main-content">
        <div className="shop-products-section">
          <button className="back-button" onClick={handleBackToSubcategories}>
            <ChevronLeft size={16} />
            {t("shop.productsList.navigation.backTo", {
              categoryName: category?.name,
            })}
          </button>

          <h2 className="section-title">{subcategory.name}</h2>

          {/* Show comparison status if active */}
          {compareProducts && (
            <div className="comparison-status">
              <p>
                {t("shop.productsList.comparison.status", {
                  count: compareProducts.split(",").length,
                })}{" "}
                <button
                  onClick={() =>
                    navigate(`/compare?products=${compareProducts}`)
                  }
                  style={{
                    color: "#FEF3C7",
                    textDecoration: "underline",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                >
                  {t("shop.productsList.comparison.viewComparison")}
                </button>
              </p>
            </div>
          )}

          {/* Filter Bar */}
          <div className="filter-bar">
            <div className="search-container">
              <input
                type="text"
                placeholder={t("shop.productsList.search.placeholder")}
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button" onClick={handleSearch}>
                <Search size={16} />
              </button>
            </div>

            <div className="filter-controls">
              <div className="sort-dropdown">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="name">
                    {t("shop.productsList.sorting.default")}
                  </option>
                  <option value="price-low">
                    {t("shop.productsList.sorting.priceLowToHigh")}
                  </option>
                  <option value="price-high">
                    {t("shop.productsList.sorting.priceHighToLow")}
                  </option>
                  <option value="rating">
                    {t("shop.productsList.sorting.ratingHighToLow")}
                  </option>
                </select>
              </div>
              <button
                className="filter-button"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                {t("shop.productsList.filters.button")}
              </button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="advanced-filters">
              <h3 className="filters-title">
                {t("shop.productsList.filters.title")}
              </h3>

              <div className="filter-grid">
                {/* Price Range */}
                <div className="filter-group">
                  <label className="filter-label">
                    {t("shop.productsList.filters.price.label")}
                  </label>
                  <div className="price-range">
                    <input
                      type="number"
                      placeholder={t(
                        "shop.productsList.filters.price.minPlaceholder"
                      )}
                      className="price-input"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                    />
                    <span className="price-separator">
                      {t("shop.productsList.filters.price.separator")}
                    </span>
                    <input
                      type="number"
                      placeholder={t(
                        "shop.productsList.filters.price.maxPlaceholder"
                      )}
                      className="price-input"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Size Filter */}
                {filterOptions.sizes.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">
                      {t("shop.productsList.filters.size.label")}
                    </label>
                    <div className="size-options">
                      {filterOptions.sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-option ${
                            selectedSizes.includes(size) ? "selected" : ""
                          }`}
                          onClick={() => handleSizeToggle(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Filter */}
                {filterOptions.colors.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">
                      {t("shop.productsList.filters.color.label")}
                    </label>
                    <div className="color-options">
                      {filterOptions.colors.map((color) => (
                        <button
                          key={color}
                          className={`color-option ${
                            selectedColors.includes(color) ? "selected" : ""
                          }`}
                          onClick={() => handleColorToggle(color)}
                        >
                          <span
                            className={`color-swatch color-${color.toLowerCase()}`}
                          ></span>
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Condition Filter */}
                {filterOptions.conditions.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">
                      {t("shop.productsList.filters.condition.label")}
                    </label>
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="condition-select"
                    >
                      <option value="">
                        {t("shop.productsList.filters.condition.allConditions")}
                      </option>
                      {filterOptions.conditions.map((condition) => (
                        <option key={condition} value={condition}>
                          {getConditionTranslation(condition)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Rating Filter */}
                <div className="filter-group">
                  <label className="filter-label">
                    {t("shop.productsList.filters.rating.label")}
                  </label>
                  <div className="rating-options">
                    {[4, 3, 2, 1].map((rating) => (
                      <button
                        key={rating}
                        className={`rating-option ${
                          minRating === rating ? "selected" : ""
                        }`}
                        onClick={() =>
                          setMinRating(minRating === rating ? 0 : rating)
                        }
                      >
                        <div className="stars">{renderStars(4)}</div>
                        <span>
                          {t("shop.productsList.filters.rating.andUp")}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="filter-group">
                  <div className="stock-filter">
                    <input
                      type="checkbox"
                      id="inStock"
                      className="stock-checkbox"
                      checked={filterInStock}
                      onChange={(e) => setFilterInStock(e.target.checked)}
                    />
                    <label htmlFor="inStock" className="stock-label">
                      {t("shop.productsList.filters.stock.label")}
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="filter-group">
                  <button className="clear-filters-btn" onClick={clearFilters}>
                    {t("shop.productsList.filters.clear")}
                  </button>
                </div>
              </div>
            </div>
          )}

          {products.length === 0 && productsData ? (
            <div className="no-products">
              <p>{t("shop.productsList.results.noProducts")}</p>
            </div>
          ) : (
            <>
              <div className="results-info">
                <span>
                  {t("shop.productsList.results.showing", {
                    filtered: filteredAndSortedProducts.length,
                    total: products.length,
                  })}
                </span>
              </div>

              <div className="products-grid">
                {isLoading
                  ? "Loading..."
                  : filteredAndSortedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="product-image">
                          <img
                            src={
                              product.productgallers
                                ? media_url +
                                  product.productgallers[0]?.image_url
                                : "placeholder.png"
                            }
                            alt={product.name}
                          />
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>

                          {product.rating && (
                            <div className="product-rating">
                              <div className="stars">
                                {renderStars(4)}
                              </div>
                              <span className="rating-text">
                                {t("shop.productsList.product.rating", {
                                  rating: product.rating,
                                })}
                              </span>
                            </div>
                          )}

                          <div className="product-price">
                            {product.is_on_sale ? (
                              <>
                                <span className="original-price">
                                  ${product.regular_price}
                                </span>
                                <span className="current-price">
                                  ${product.on_sale_price}
                                </span>
                              </>
                            ) : (
                              <span className="current-price">
                                ${product.regular_price}
                              </span>
                            )}
                          </div>

                          {product.condition && product.condition !== "new" && (
                            <div className="product-condition">
                              {getConditionTranslation(product.condition)}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
