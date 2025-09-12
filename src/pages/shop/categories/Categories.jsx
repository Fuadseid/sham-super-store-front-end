import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../context/LanguageContext";
import "./Categories.scss";
import { useGetCategoriesQuery } from "../../../stores/apiSlice";
import { useSelector } from "react-redux";

export const Categories = ({ compareProducts }) => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const {media_url} = useSelector((state)=>state.auth)
  const {
    data: categories,
    isLoading: loadingcategoris,
    isError,
  } = useGetCategoriesQuery();
  const [category, setCategory] = useState([]);
  const cate = categories?.data;
  useEffect(() => {
    if (cate) {
      setCategory(cate);
    }
  }, [cate]);

  // This data will come from backend later - keeping as is
  const categoriess = [
    {
      id: 1,
      name: "Computer",
      image:
        "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 2,
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 3,
      name: "Smart Home",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 4,
      name: "Home - Garden",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 5,
      name: "Furniture",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 6,
      name: "Clothes",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 7,
      name: "Shoes",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 8,
      name: "Babies - Kids - Children Supplies",
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 9,
      name: "Teen Supplies",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 10,
      name: "Beauty - Health",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 11,
      name: "Sports - Outdoor Activities",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 12,
      name: "Food Grocery",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 13,
      name: "Pets Supplies",
      image:
        "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 14,
      name: "Entertainment",
      image:
        "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 15,
      name: "Handmade",
      image:
        "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 16,
      name: "School - Office Supplies",
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 17,
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 18,
      name: "Cars",
      image:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 19,
      name: "Industrial Scientific Materials",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=240&h=240&fit=crop&crop=center",
    },
    {
      id: 20,
      name: "Bags - Luggage",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=240&h=240&fit=crop&crop=center",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    // Preserve comparison state when navigating to categories
    if (compareProducts) {
      navigate(`/shop/category/${categoryId}?compare=${compareProducts}`);
    } else {
      navigate(`/shop/category/${categoryId}`);
    }
  };


  const compareCount = compareProducts ? compareProducts.split(",").length : 0;

  return (
    <div className={`shop-categories-section ${isRTL ? "rtl" : "ltr"}`}>
      <h2 className="section-title">{t("shop.categories.title")}</h2>
      {/* Show comparison status if active */}
      {compareProducts && (
        <div className="comparison-status">
          <p>
            🔍 {t("shop.categories.comparing", { count: compareCount })} -{" "}
            {t("shop.categories.continueShoppingToCompare")}
          </p>
        </div>
      )}
      {loadingcategoris?"Loading...":<div className="categories-grid">
        {category.map((category) => (
          <div
            key={category.id}
            className="category-item"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-image">
              <img src={category.image?media_url+category.image:"placeholder.png"} alt={category.name} />
            </div>
            <h3 className="category-name">{category.name}</h3>
            <button
              className="view-category-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick(category.id);
              }}
            >
              {t("shop.categories.viewCategory")}
            </button>
          </div>
        ))}
      </div>}
      
    </div>
  );
};

export default Categories;
