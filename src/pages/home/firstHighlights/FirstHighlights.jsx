import "./FirstHighlights.scss";
import { useLanguage } from "../../../context/LanguageContext";
import home from "../../../assets/images/home/firstHighlights/home.png";
import bag from "../../../assets/images/home/firstHighlights/bag.png";
import art from "../../../assets/images/home/firstHighlights/art.png";
import { useGetFirstbannerQuery } from "../../../stores/apiSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FirstHighlights = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { media_url } = useSelector((state) => state.auth);
  const [firsthighlightsdata, setFirstHighlightsData] = useState([]);
  const {
    data: firstHighlights,
    isLoading: loadingfirstHighlights,
    isError: errorfirstHighlights,
  } = useGetFirstbannerQuery();
  const firstHighlightsBanners = firstHighlights?.data;
  useEffect(() => {
    if (firstHighlightsBanners) {
      setFirstHighlightsData(firstHighlightsBanners);
    }
  }, [firstHighlightsBanners]);
  return (
    <div className="firstHighlights-out-container">
      <div className="firstHighlights-container">
        {firsthighlightsdata.map((highlight) => (
          <div className="product-out-container">
            <div className="product-left-container">
              <h5>{highlight.short_description}</h5>
              <h3>{highlight.title}</h3>
              <button onClick={() => navigate(`${highlight.shop_link}`)}>
                {t("home.firstHighlights.button")}
              </button>
            </div>
            <div className="product-right-container">
              <img
                className="product-right-image"
                src={media_url + highlight.image_url}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
