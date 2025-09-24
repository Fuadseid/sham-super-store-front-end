import "./ThirdHighlights.scss";
import { useLanguage } from "../../../context/LanguageContext";
import shoes from "../../../assets/images/home/thirdHighlights/shoes.png";
import home from "../../../assets/images/home/thirdHighlights/home.png";
import laundry from "../../../assets/images/home/thirdHighlights/laundry.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetThirdbannerQuery } from "../../../stores/apiSlice";

export const ThirdHighlights = () => {
  const { t } = useLanguage();
  const { media_url } = useSelector((state) => state.auth);
  const [thirdhighlightsdata, setthirdHighlightsData] = useState([]);
  const {
    data: thirdHighlights,
    isLoading: loadingfirstHighlights,
    isError: errorfirstHighlights,
  } = useGetThirdbannerQuery();
  const thirdHighlightsBanners = thirdHighlights?.data;
  useEffect(() => {
    if (thirdHighlightsBanners) {
      setthirdHighlightsData(thirdHighlightsBanners);
    }
  }, [thirdHighlightsBanners]);
  return (
    <div className="thirdHighlights-out-container">
      <div className="thirdHighlights-container">
        {thirdhighlightsdata.map((highlight)  => (
          <div key={highlight.id} className="product-out-container">
            <div className="product-left-container">
              <h5>{highlight.short_description}</h5>
              <h3>{highlight.title}</h3>
              <button>{t("home.thirdHighlights.button")}</button>
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
