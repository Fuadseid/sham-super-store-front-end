import { useLanguage } from "../../../context/LanguageContext";
import "./FifthHighlights.scss";
import kitchen from "../../../assets/images/home/fifthHighlights/kitchen.png";
import DIY from "../../../assets/images/home/fifthHighlights/DIY.png";
import girl from "../../../assets/images/home/fifthHighlights/girl.png";
import { useSelector } from "react-redux";
import { useGetFifthbannerQuery } from "../../../stores/apiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FifthHighlights = () => {
  const { t, isRTL } = useLanguage();
  const { media_url } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [fifthhighlightsdata, setfifthHighlightsData] = useState([]);
  const {
    data: fifthHighlights,
    isLoading: loadingfirstHighlights,
    isError: errorfirstHighlights,
  } = useGetFifthbannerQuery();
  const fifthHighlightsBanners = fifthHighlights?.data;
  useEffect(() => {
    if (fifthHighlightsBanners) {
      setfifthHighlightsData(fifthHighlightsBanners);
    }
  }, [fifthHighlightsBanners]);
  // This data will come from backend later - keeping structure ready
  const highlightsData = {
    topLeft: {
      subtitle: fifthhighlightsdata[0]?.short_description,
      title: fifthhighlightsdata[0]?.title,
      image:  media_url + fifthhighlightsdata[0]?.image_url,
      alt: fifthhighlightsdata[0]?.short_description,
      shop_link: fifthhighlightsdata[0]?.shop_link,
    },
    bottomLeft: {
      subtitle: fifthhighlightsdata[1]?.short_description,
      title: fifthhighlightsdata[1]?.title,
      image: media_url + fifthhighlightsdata[1]?.image_url,
      alt: fifthhighlightsdata[1]?.short_description,
        shop_link: fifthhighlightsdata[1]?.shop_link,
    },
    rightLarge: {
      subtitle: fifthhighlightsdata[2]?.short_description,
      title: fifthhighlightsdata[2]?.title,
      image: media_url + fifthhighlightsdata[2]?.image_url,
      alt: fifthhighlightsdata[2]?.short_description,
        shop_link: fifthhighlightsdata[2]?.shop_link,
    },
  };

  return (
    <div className={`fifth-highlights-wrapper ${isRTL ? "rtl" : "ltr"}`}>
      <div className="fifth-highlights-main">
        <div className="fifth-left-column">
          <div className="fifth-card-container fifth-top-left">
            <div className="fifth-content-area">
              <h5>{highlightsData.topLeft.subtitle}</h5>
              <h3>{highlightsData.topLeft.title}</h3>
              <button
              onClick={()=>navigate(`${highlightsData.topLeft.shop_link}`)}
              >{t("home.fifthHighlights.shop")}</button>
            </div>
            <div className="fifth-image-area">
              <img
                src={highlightsData.topLeft.image}
                alt={highlightsData.topLeft.alt}
                className="fifth-product-image"
              />
            </div>
          </div>

          <div className="fifth-card-container fifth-bottom-left">
            <div className="fifth-content-area">
              <h5>{highlightsData.bottomLeft.subtitle}</h5>
              <h3>{highlightsData.bottomLeft.title}</h3>
              <button
              onClick={()=>navigate(`${highlightsData.bottomLeft.shop_link}`)}
              >{t("home.fifthHighlights.shop")}</button>
            </div>
            <div className="fifth-image-area">
              <img
                src={highlightsData.bottomLeft.image}
                alt={highlightsData.bottomLeft.alt}
                className="fifth-product-image"
              />
            </div>
          </div>
        </div>

        <div className="fifth-card-container fifth-right-large">
          <div className="fifth-content-area">
            <h5>{highlightsData.rightLarge.subtitle}</h5>
            <h3>{highlightsData.rightLarge.title}</h3>
            <button
            onClick={()=>navigate(`${highlightsData.rightLarge.shop_link}`)}
            >{t("home.fifthHighlights.shop")}</button>
          </div>
          <div className="fifth-image-area">
            <img
              src={highlightsData.rightLarge.image}
              alt={highlightsData.rightLarge.alt}
              className="fifth-product-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FifthHighlights;
