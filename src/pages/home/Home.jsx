import BestSellerBeauty from './bestSellerBeauty/BestSellerBeauty'
import BestSellerElectronics from './bestSellerElectronics/BestSellerElectronics'
import BestSellerFurniture from './bestSellerFurniture/bestSellerFurniture'
import BestSellerGardenSupplies from './bestSellerGardenSupplies/BestSellerGardenSupplies'
import BestSellerHomeRenovation from './bestSellerHomeRenovation/BestSellerHomeRenovation'
import BestSellerKitchen from './bestSellerKitchen/BestSellerKitchen'
import BestSellerMens from './bestSellerMens/BestSellerMens'
import BestSellerPhones from './bestSellerPhones/BestSellerPhones'
import BestSellerSchool from './bestSellerSchool/BestSellerSchool'
import BestSellerWomens from './bestSellerWomens/BestSellerWomens'
import Categories from './categories/Categories'
import FeaturedProducts from './featuredProducts/FeaturedProducts'
import FifthHighlight from './fifthHighlights/FifthHighlights'
import { FirstHighlights } from './firstHighlights/FirstHighlights'
import { FourthHighlights } from './fourthHighlights/FourthHighlights'
import { Intro } from './intro/Intro'
import NewProducts from './newProducts/NewProducts'
import OurNews from './ourNews/OurNews'
import { SecondHighlights } from './secondHighlights/SecondHighlights'
import { SixthHighlights } from './sixthHighlights/SixthHighlights'
import { ThirdHighlights } from './thirdHighlights/ThirdHighlights'
import TopRatedProducts from './topRatedProducts/TopRatedProducts'

export const Home = () => {
    return (
        <div>
            <Intro />
            <NewProducts />
            <Categories />
            <FirstHighlights />
            <BestSellerWomens />
            <BestSellerMens />
            <SecondHighlights />
            <BestSellerFurniture />
            <BestSellerKitchen />
            <ThirdHighlights />
            <BestSellerPhones />
            <BestSellerElectronics />
            <FourthHighlights />
            <BestSellerBeauty />
            <BestSellerSchool />
            <FifthHighlight />
            <BestSellerHomeRenovation />
            <BestSellerGardenSupplies />
            <SixthHighlights />
            <FeaturedProducts />
            <OurNews />
            <TopRatedProducts />
        </div>
    )
}
