import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, ChevronLeft, Star } from "lucide-react";
import ProductsOnSale from "../productsOnSale/ProductsOnSale";
import FeaturedProducts from "../featuredProducts/FeaturedProducts";
import { useLanguage } from "../../../context/LanguageContext";
import {
  useGetcategoryDetailQuery,
  useGetproductperCategoryQuery,
} from "../../../stores/apiSlice";
import { useSelector } from "react-redux";

export const ProductsList = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // State declarations
  const [sortBy, setSortBy] = useState("name");
  const [filterInStock, setFilterInStock] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [minRating, setMinRating] = useState(0);
  
  const { media_url } = useSelector((state) => state.auth);
  const { t } = useLanguage();

  // API Queries
  const {
    data: productpercategory,
    isLoading,
    isError,
  } = useGetproductperCategoryQuery(subcategoryId);
  
  const {
    data: categoryDetail,
    isLoading: categoryload,
    isError: categoryError,
  } = useGetcategoryDetailQuery(categoryId);

  // Local state management
  const [product, setProduct] = useState([]);
  const [detail, setDetail] = useState([]);
  const [category, setCategory] = useState(null);

  const productsData = productpercategory?.data?.data || [];
  const subcatdetail = categoryDetail?.data?.children || [];
  const categoryData = categoryDetail?.data;
  const compareProducts = searchParams.get("compare");
  const currentSubcategory = detail.find(sub => sub.id == subcategoryId);

  // Effects for data updates
  useEffect(() => {
    if (productsData) {
      setProduct(productsData);
    }
  }, [productsData]);

  useEffect(() => {
    if (subcatdetail) {
      setDetail(subcatdetail);
    }
  }, [subcatdetail]);

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
  }, [categoryData]);

  // Filter options
  const filterOptions = useMemo(() => {
    const sizes = [...new Set(product.flatMap((p) => p.sizes || []))];
    const colors = [...new Set(product.flatMap((p) => p.colors || []))];
    const conditions = [
      ...new Set(product.map((p) => p.condition).filter(Boolean)),
    ];

    return { sizes, colors, conditions };
  }, [product]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...product];

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by stock
    if (filterInStock) {
      filtered = filtered.filter((product) => product.in_stock);
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    // Filter by price range
    if (priceRange.min !== "") {
      filtered = filtered.filter(
        (product) => Number(product.regular_price) >= parseFloat(priceRange.min)
      );
    }
    if (priceRange.max !== "") {
      filtered = filtered.filter(
        (product) => Number(product.regular_price) <= parseFloat(priceRange.max)
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
        (product) => (product.average_rating || 0) >= minRating
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.regular_price) - Number(b.regular_price);
        case "price-high":
          return Number(b.regular_price) - Number(a.regular_price);
        case "rating":
          return (b.average_rating || 0) - (a.average_rating || 0);
        case "name":
        default:
          return a.name?.localeCompare(b.name);
      }
    });

    return filtered;
  }, [
    product,
    sortBy,
    filterInStock,
    statusFilter,
    searchTerm,
    priceRange,
    selectedSizes,
    selectedColors,
    selectedCondition,
    minRating,
  ]);

  // Event handlers
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
    setStatusFilter("all");
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

  // Loading state
  if (isLoading || categoryload) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-1/4">
              <ProductsOnSale compareProducts={compareProducts} />
              <FeaturedProducts compareProducts={compareProducts} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || categoryError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-1/4">
              <ProductsOnSale compareProducts={compareProducts} />
              <FeaturedProducts compareProducts={compareProducts} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Error loading products</h2>
                <p className="text-gray-600 mb-6">Failed to load products. Please try again.</p>
                <button 
                  onClick={handleBackToSubcategories}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No subcategory found
  if (!currentSubcategory && product.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-1/4">
              <ProductsOnSale compareProducts={compareProducts} />
              <FeaturedProducts compareProducts={compareProducts} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-yellow-500 text-6xl mb-4">📁</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h2>
                <p className="text-gray-600 mb-6">This category doesn't exist or has no products.</p>
                <button 
                  onClick={handleBackToSubcategories}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-1/4 space-y-6">
            <ProductsOnSale compareProducts={compareProducts} />
            <FeaturedProducts compareProducts={compareProducts} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Back button */}
              <button 
                onClick={handleBackToSubcategories}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
              >
                <ChevronLeft size={20} />
                Back to {category?.name || "Categories"}
              </button>

              {/* Section title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentSubcategory?.name || "Products"}
              </h1>

              {/* Comparison status */}
              {compareProducts && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="text-blue-800">
                    Comparing {compareProducts.split(",").length} products -{" "}
                    <button
                      onClick={() => navigate(`/compare?products=${compareProducts}`)}
                      className="text-blue-600 hover:text-blue-800 underline font-semibold"
                    >
                      View Comparison
                    </button>
                  </p>
                </div>
              )}

              {/*  */}

              {/* Advanced filters panel */}
              

              {/* No products found - Tailwind CSS Styled */}
              {filteredAndSortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="text-8xl mb-6 text-gray-400">📦</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 text-center max-w-md mb-8">
                    We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  
                  {(searchTerm || statusFilter !== 'all' || selectedSizes.length > 0 || selectedColors.length > 0 || selectedCondition || minRating > 0 || priceRange.min || priceRange.max || filterInStock) ? (
                    <div className="bg-gray-50 rounded-lg p-6 max-w-md w-full">
                      <p className="font-medium text-gray-900 mb-3 text-center">Suggestions:</p>
                      <ul className="text-sm text-gray-600 space-y-1 mb-6">
                        {searchTerm && <li className="flex items-center justify-center">• Try different search terms</li>}
                        {statusFilter !== 'all' && <li className="flex items-center justify-center">• Clear status filter</li>}
                        {(selectedSizes.length > 0 || selectedColors.length > 0 || selectedCondition || minRating > 0) && <li className="flex items-center justify-center">• Clear advanced filters</li>}
                        {(priceRange.min || priceRange.max) && <li className="flex items-center justify-center">• Adjust price range</li>}
                        {filterInStock && <li className="flex items-center justify-center">• Include out-of-stock items</li>}
                      </ul>
                      <button 
                        onClick={clearFilters}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  ) : product.length === 0 ? (
                    <div className="bg-gray-50 rounded-lg p-6 max-w-md w-full text-center">
                      <p className="text-gray-600 mb-4">This category currently has no products available.</p>
                      <button 
                        onClick={handleBackToSubcategories}
                        className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                      >
                        Back to Categories
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  {/* Results info */}
                  <div className="mb-6">
                    <p className="text-gray-600">
                      Showing {filteredAndSortedProducts.length} of {product.length} products
                    </p>
                  </div>

                  {/* Products grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                          <img
                            src={
                              product.productgallers && product.productgallers[0]?.image_url
                                ? media_url + product.productgallers[0].image_url
                                : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTEwLjQ4MSA3MCAxMTkgNjEuNDgxNCAxMTkgNTFDMTE5IDQwLjUxODYgMTEwLjQ4MSAzMiAxMDAgMzJDODkuNTE4NiAzMiA4MSA0MC41MTg2IDgxIDUxQzgxIDYxLjQ4MTQgODkuNTE4NiA3MCAxMDAgNzBaTTEwMCA4MEM4MC4xMTcgODAgNjQgODcuNDgwNSA2NCA5N0g1M0M1MyA4My44MjU0IDc0LjQyMiA3MyAxMDAgNzNIMTI1QzE1MC41NzggNzMgMTcyIDgzLjgyNTQgMTcyIDk3SDEzNkMxMzYgODcuNDgwNSAxMTkuODgzIDgwIDEwMCA4MFoiIGZpbGw9IiM4QTlBQUEiLz4KPC9zdmc+Cg=="
                            }
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNzBDMTEwLjQ4MSA3MCAxMTkgNjEuNDgxNCAxMTkgNTFDMTE5IDQwLjUxODYgMTEwLjQ4MSAzMiAxMDAgMzJDODkuNTE4NiAzMiA4MSA0MC41MTg2IDgxIDUxQzgxIDYxLjQ4MTQgODkuNTE4NiA3MCAxMDAgNzBaTTEwMCA4MEM4MC4xMTcgODAgNjQgODcuNDgwNSA2NCA5N0g1M0M1MyA4My44MjU0IDc0LjQyMiA3MyAxMDAgNzNIMTI1QzE1MC41NzggNzMgMTcyIDgzLjgyNTQgMTcyIDk3SDEzNkMxMzYgODcuNDgwNSAxMTkuODgzIDgwIDEwMCA4MFoiIGZpbGw9IiM4QTlBQUEiLz4KPC9zdmc+Cg==";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex text-yellow-400">
                              {renderStars(product.average_rating || 0)}
                            </div>
                            {product.total_reviews > 0 && (
                              <span className="text-sm text-gray-500">
                                ({product.total_reviews})
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            {product.is_on_sale ? (
                              <>
                                <span className="text-lg font-bold text-gray-900">
                                  ${Number(product.on_sale_price).toFixed(2)}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${Number(product.regular_price).toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="text-lg font-bold text-gray-900">
                                ${Number(product.regular_price).toFixed(2)}
                              </span>
                            )}
                          </div>

                          {product.condition && product.condition !== "new" && (
                            <div className="text-sm text-gray-500">
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
      </div>
    </div>
  );
};

export default ProductsList;