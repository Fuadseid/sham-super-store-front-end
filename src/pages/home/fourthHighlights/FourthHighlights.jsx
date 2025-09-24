import React, { useEffect, useState } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import "./FourthHighlights.scss";
import { useGetForthbannerQuery } from "../../../stores/apiSlice";
import { useSelector } from "react-redux";

export const FourthHighlights = () => {
  const { t, isRTL } = useLanguage();
  const { media_url } = useSelector((state) => state.auth);
  const [forthhighlightsdata, setforthHighlightsData] = useState([]);
  const {
    data: forthHighlights,
    isLoading: loadingfirstHighlights,
    isError: errorfirstHighlights,
  } = useGetForthbannerQuery();
  const forthHighlightsBanners = forthHighlights?.data;
  useEffect(() => {
    if (forthHighlightsBanners) {
      setforthHighlightsData(forthHighlightsBanners);
    }
  }, [forthHighlightsBanners]);
  // This data will come from backend later - keeping structure ready
  const highlightsData = {
    leftSection: {
      title: forthhighlightsdata[0]?.title,
      subtitle: forthhighlightsdata[0]?.short_description,
      backgroundImage: forthhighlightsdata[0]?.image_url, // This will be full URL from backend
    },
    rightSection: {
      title: forthhighlightsdata[1]?.title,
      subtitle: forthhighlightsdata[1]?.short_description,
      backgroundImage: forthhighlightsdata[1]?.image_url, // This will be full URL from backend
    },
  };

  return (
    <div className={`fourthHighlights-out-container ${isRTL ? "rtl" : "ltr"}`}>
      <div className="fourthHighlights-container">
        <div
          className="product-out-container left-section"
          style={{
            backgroundImage: `url(${
              media_url + highlightsData.leftSection.backgroundImage
            })`,
          }}
        >
          <div className="content-overlay left-content">
            <h2>{highlightsData.leftSection.title}</h2>
            <h3>{highlightsData.leftSection.subtitle}</h3>
            <button>{t("home.fourthHighlights.shopNow")}</button>
          </div>
        </div>
        <div className="product-out-container right-section">
          <div
            className="content-overlay right-content"
            style={{
              backgroundImage: `url(${
                media_url + highlightsData.rightSection.backgroundImage
              })`,
            }}
          >
            <h2>{highlightsData.rightSection.title}</h2>
            <h3>{highlightsData.rightSection.subtitle}</h3>
            <button>{t("home.fourthHighlights.shopNow")}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthHighlights;
