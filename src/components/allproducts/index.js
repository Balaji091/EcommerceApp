import './index.css';
import { BsSearch } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import ProductCard from '../productCard';
import ProductsHeader from '../productHeader';
import FiltersGroup from '../filterItem';
const sortbyOptions = [
  { optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)' },
  { optionId: 'PRICE_LOW', displayText: 'Price (Low-High)' },
];
const ratingsList = [
  { ratingId: '4', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png' },
  { ratingId: '3', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png' },
  { ratingId: '2', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png' },
  { ratingId: '1', imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png' },
];
const categoryOptions = [
  { name: 'Clothing', categoryId: '1' },
  { name: 'Electronics', categoryId: '2' },
  { name: 'Appliances', categoryId: '3' },
  { name: 'Grocery', categoryId: '4' },
  { name: 'Toys', categoryId: '5' },
];
const AllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [activeOptionId, setActiveOptionId] = useState(sortbyOptions[0].optionId);
  const [categoryId, setCategoryId] = useState('');
  const [activeRatingId, setActiveRatingId] = useState('');

const updateActiveOptionId = (value) => {
    setActiveOptionId(value);
  };

  const updateSearchInput = (value) => {
    setSearchInput(value);
  };

  const updateCategory = (id) => {
    setCategoryId(id);
  };

  const updateRating = (id) => {
    setActiveRatingId(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const jwtToken = Cookies.get('jwt_token');
        const url = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryId}&rating=${activeRatingId}`;
        const options = {
          method: 'GET',
          headers: { Authorization: `Bearer ${jwtToken}` },
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setProductList(data.products);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeOptionId, categoryId, activeRatingId]);

  const filteredData = productList.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return isLoading ? (
    <div className="loader-container">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  ) : (
    <div className="container">
      <FiltersGroup
        categoryList={categoryOptions}
        ratingList={ratingsList}
        updateSearchInput={updateSearchInput}
        searchInput={searchInput}
        updatecategory={updateCategory}
        categoryId={categoryId}
        updateRating={updateRating}
        activeRatingId={activeRatingId}
      />
      <div className="all">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          updateActiveOptionId={updateActiveOptionId}
        />
        <div className="all-products">
          {filteredData.length>0?(filteredData.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))):<img  className="not-found"src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"/>}
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
