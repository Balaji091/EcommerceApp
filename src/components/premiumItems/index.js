import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ThreeDots } from 'react-loader-spinner';
import ProductCard from '../productCard';
import './index.css';
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
};
function PrimeDealsSection() {
  const [primeDeals, setPrimeDeals] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  useEffect(() => {
    getPrimeDeals();
  }, []);
  const getPrimeDeals = async () => {
    setApiStatus(apiStatusConstants.progress);
    const jwtToken = Cookies.get('jwt_token');
    const apiUrl = 'https://apis.ccbp.in/prime-deals';
    const options = {
      headers: { Authorization: `Bearer ${jwtToken}` },
      method: 'GET',
    };

    try {
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const fetchedData = await response.json();
        setPrimeDeals(fetchedData. prime_deals);
        setApiStatus(apiStatusConstants.success);
        
      } else {
        setApiStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.error('Error fetching Prime Deals:', error);
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderPrimeDealsList = () => (
    <>
    <h1 className='primedeals-list-heading '>Exclusive Deals </h1>
    <div className="products-list-container">
      <ul className="products-list">
        {primeDeals.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </div>
    </>
  );

  const renderPrimeDealsFailureView = () => (
    <div className="failure-view">
      
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        alt="Register Prime"
        className="register-prime-image"
      />
    </div>
  );

  const renderLoadingView = () => (
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
  );

  const renderSwitchView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderPrimeDealsList();
      case apiStatusConstants.failure:
        return renderPrimeDealsFailureView();
      case apiStatusConstants.progress:
        return renderLoadingView();
      default:
        return null;
    }
  };
  return <div>{renderSwitchView()}</div>;
}
export default PrimeDealsSection;
