import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import './OurNews.scss';
import laptop from '../../../assets/images/home/ourNews/laptop.jpg';
import room from '../../../assets/images/home/ourNews/room.jpg';
import man from '../../../assets/images/home/ourNews/man.jpg';
import { useSelector } from 'react-redux';
import { useGetNewsQuery } from '../../../stores/apiSlice';

const OurNews = () => {
    const { t, isRTL } = useLanguage();
    const {media_url} = useSelector((state) => state.auth);
    const {data:news,isLoading:loadingnews,isError:errorfetching} = useGetNewsQuery();
    const [newsDatas,setNewsData] = useState([]);
    useEffect(()=>{
        if(news?.data){
            setNewsData(news?.data);
        }
    },[news?.data])
   console.log("News",newsDatas);
    // This data will come from backend later - keeping as is
    const newsData = [
        {
            id: newsDatas[0]?.id,
            image: `${media_url}${newsDatas[0]?.image}`,
            description: newsDatas[0]?.description
        },
        {
            id: newsDatas[1]?.id,
            image: `${media_url}${newsDatas[1]?.image}`,
            description: newsDatas[1]?.description
        },
        {
            id: newsDatas[2]?.id,
            image: `${media_url}${newsDatas[2]?.image}`,
            description: newsDatas[2]?.description
        }
    ];

    return (
        <section className={`our-news-section ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="container">
                <h2 className="section-title">{t('home.ourNews.title')}</h2>
                <div className="news-cards">
                    {newsData.map((news) => (
                        <div key={news.id} className="news-card">
                            <div className="card-image">
                                <img src={news.image} alt={news.description} />
                            </div>
                            <div className="card-content">
                                <p className="card-description">{news.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurNews;