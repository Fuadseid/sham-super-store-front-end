import "./SecondHighlights.scss";
import { useLanguage } from "../../../context/LanguageContext";
import phone from "../../../assets/images/home/secondHighlights/phone.png";
import watch from "../../../assets/images/home/secondHighlights/watch.png";
import school from "../../../assets/images/home/secondHighlights/school.png";
import { useSelector } from "react-redux";
import { useGetSecondbannerQuery } from "../../../stores/apiSlice";
import { useEffect, useState } from "react";

export const SecondHighlights = () => {
  const { t } = useLanguage();
  const { media_url } = useSelector((state) => state.auth);
  const [secondhighlightsdata, setsecondHighlightsData] = useState([]);
  const {
    data: secondHighlights,
    isLoading: loadingfirstHighlights,
    isError: errorfirstHighlights,
  } = useGetSecondbannerQuery();
  const secondHighlightsBanners = secondHighlights?.data;
  useEffect(() => {
    if (secondHighlightsBanners) {
      setsecondHighlightsData(secondHighlightsBanners);
    }
  }, [secondHighlightsBanners]);

  return (
    <div className="secondHighlights-out-container">
      <div className="secondHighlights-container">
   

        {secondhighlightsdata.map((highlight) => (
          <div className="product-out-container">
            <div className="product-left-container">
              <h5>{highlight.short_description}</h5>
              <h3>{highlight.title}</h3>
              <button onClick={() => navigate(`${highlight.shop_link}`)}>
                {t("home.secondHighlights.button")}
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
