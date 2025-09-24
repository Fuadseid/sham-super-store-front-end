import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import "./SixthHighlights.scss";
import laptop from "../../../assets/images/home/sixthHighlights/laptop.png";
import homeMade from "../../../assets/images/home/sixthHighlights/homeMade.png";
import baby from "../../../assets/images/home/sixthHighlights/baby.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetsixthbannerQuery } from "../../../stores/apiSlice";

export const SixthHighlights = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const { media_url } = useSelector((state) => state.auth);

  const [sixthhighlightsdata, setsixthHighlightsData] = useState([]);
  const {
    data: sixthHighlights,
    isLoading: loadingfirstHighlights,
    isError: errorfirstHighlights,
  } = useGetsixthbannerQuery();
  const sixthHighlightsBanners = sixthHighlights?.data;
  useEffect(() => {
    if (sixthHighlightsBanners) {
      setsixthHighlightsData(sixthHighlightsBanners);
    }
  }, [sixthHighlightsBanners]);
  console.log("sixth", sixthhighlightsdata);
  // This data will come from backend later - keeping structure ready
  const highlightsData = [
    {
      id: 1,
      title: sixthhighlightsdata[0]?.title,
      image: media_url + sixthhighlightsdata[0]?.image_url,
      alt: sixthhighlightsdata[0]?.short_description,
      containerClass: "blue-container",
      shop_link: sixthhighlightsdata[0]?.shop_link,
    },
    {
      id: 2,
      title: sixthhighlightsdata[1]?.title,
      image: media_url + sixthhighlightsdata[1]?.image_url,
      alt: sixthhighlightsdata[1]?.short_description,
      containerClass: "orange-container",
      shop_link: sixthhighlightsdata[1]?.shop_link,
    },
    {
      id: 3,
      title: sixthhighlightsdata[2]?.title,
      image: media_url + sixthhighlightsdata[2]?.image_url,
      alt: sixthhighlightsdata[2]?.short_description,
      containerClass: "blue-container",
      shop_link: sixthhighlightsdata[2]?.shop_link,
    },
  ];

  return (
    <div className={`sixthHighlights-out-container ${isRTL ? "rtl" : "ltr"}`}>
      <div className="sixthHighlights-container">
        {highlightsData.map((item) => (
          <div
            key={item.id}
            className={`product-out-container ${item.containerClass}`}
          >
            <div className="product-left-container">
              <h3>{item.title}</h3>
              <button
              onClick={()=>navigate(`${item.shop_link}`)}
              >{t("home.sixthHighlights.shop")}</button>
            </div>
            <div className="product-right-container">
              <img
                className="product-right-image"
                src={item.image}
                alt={item.alt}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SixthHighlights;
