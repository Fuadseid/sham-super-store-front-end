import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import './Categories.scss';
import { useGetCategoriesQuery } from '../../../stores/apiSlice';
import { useSelector } from 'react-redux';

const Categories = () => {
    const {data:categories,isLoading:loadingcategoris,isError} = useGetCategoriesQuery();
    const {media_url} = useSelector((state)=>state.auth);
    const [category, setCategory] = useState([]);
    const cate = categories?.data;
    useEffect(()=>{
        if(cate){
            setCategory(cate)
        }
    },[cate])
    console.log("catagory",cate)
    const { t, isRTL } = useLanguage();

    const categoriess = [
        // Row 1
        { id: 1, icon: 'computer-icon', name: t('home.categories.items.computers') },
        { id: 2, icon: 'headphones-icon', name: t('home.categories.items.electronics') },
        { id: 3, icon: 'smarthome-icon', name: t('home.categories.items.smartHome') },
        { id: 5, icon: 'furniture-icon', name: t('home.categories.items.furniture') },
        { id: 6, icon: 'clothes-icon', name: t('home.categories.items.clothes') },
        { id: 7, icon: 'shoes-icon', name: t('home.categories.items.shoes') },

        // Row 2
        { id: 4, icon: 'home-garden-icon', name: t('home.categories.items.homeGarden') },
        { id: 11, icon: 'sport-icon', name: t('home.categories.items.sport') },
        { id: 9, icon: 'teen-icon', name: t('home.categories.items.teen') },
        { id: 8, icon: 'babies-icon', name: t('home.categories.items.babies') },
        { id: 10, icon: 'beauty-icon', name: t('home.categories.items.beauty') },
        { id: 20, icon: 'bags-icon', name: t('home.categories.items.bags') },

        // Row 3
        { id: 14, icon: 'entertainment-icon', name: t('home.categories.items.entertainment') },
        { id: 15, icon: 'handmade-icon', name: t('home.categories.items.handmade') },
        { id: 16, icon: 'school-icon', name: t('home.categories.items.school') },
        { id: 13, icon: 'pets-icon', name: t('home.categories.items.pets') },
        { id: 18, icon: 'cars-icon', name: t('home.categories.items.cars') },
        { id: 17, icon: 'books-icon', name: t('home.categories.items.books') },
    ];

    return (
        <div className="categories-section">
            <div className={isRTL ? 'rtl' : 'ltr'}>
                <h2 className="section-title">{t('home.categories.title')}</h2>
            </div>

            <div className={`categories-grid ${isRTL ? 'rtl-grid' : ''}`}>
                
                {category.map((category) => (
                    <Link
                        key={category.id}
                        to={`/shop/category/${category.id}`}
                        className="category-item"
                        aria-label={t('home.categories.accessibility.categoryLink', { categoryName: category.name })}
                    >
                        <img src={media_url+category.image} className={`category-icon `}/>
                        <span className="category-name">{category.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;