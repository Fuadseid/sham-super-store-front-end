import { useSearchParams } from 'react-router-dom';
import Categories from "./categories/Categories";
import FeaturedProducts from "./featuredProducts/FeaturedProducts";
import ProductsOnSale from "./productsOnSale/ProductsOnSale";
import './Shop.scss'

const Shop = () => {
    const [searchParams] = useSearchParams();

    // Get comparison state from URL - this comes from the compare page when user clicks "Continue Shopping"
    const compareProducts = searchParams.get('compare');

    return (
        <div className="shop-page">
            <div className="sidebar">
                <ProductsOnSale compareProducts={compareProducts} />
                <FeaturedProducts compareProducts={compareProducts} />
            </div>
            <div className="main-content">
                <Categories compareProducts={compareProducts} />
            </div>
        </div>
    );
};

export default Shop;