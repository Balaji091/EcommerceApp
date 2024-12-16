import './index.css'
import {BsSearch} from 'react-icons/bs'
function FiltersGroup(props)
{
   const {ratingList,categoryList,updateSearchInput,searchInput,categoryId,updatecategory,activeRatingId,updateRating,clearFilters}=props;
   const renderSearchInput=()=>{
    const onChangeSearch=(event)=>{
        updateSearchInput(event.target.value);
    }
    return(
        <div className='search-input-container'>
            <input type='search' placeholder='Search' className='search-input' value={searchInput}onChange={onChangeSearch}/>
            <BsSearch className="search-icon" />
        </div>
    )
   }
   const renderCategoriesList=()=>
    {
        return categoryList.map(item=>{
            const isActive=item.categoryId===categoryId;
            const className= isActive
            ? 'category-name active-category-name'
            : 'category-name'
            return(
                <li className='category-item' key={item.categoryId}>
                    <p className={className} onClick={()=>updatecategory(item.categoryId)}>{item.name}</p>
                </li>
            )
        })
    }
    const renderRatingList=()=>
    {   
        return ratingList.map(item=>{
            const isActive=item.ratingId===activeRatingId;
            const className=isActive?'active-rating':'';
            return(
                <li className='rating-item' key={item.ratingId} type="button" onClick={()=>updateRating(item.ratingId)}>
                    <img src={item.imageUrl} className='rating-image'/>
                    <p className={className}> &up</p>
                </li>
            )
        })
    }
    return(
        <div className="filters-group-container">
            {renderSearchInput()}
             <h1 className="category-heading">Category</h1>
             <ul className="categories-list">{renderCategoriesList()}</ul>
             <h1 className="rating-heading">Rating</h1>
             <ul className="ratings-list">{renderRatingList()}</ul>
             <button type="button"className="clear-filters-btn" onClick={()=>{updateRating('');updateSearchInput('');updatecategory('');}}>Clear Filters </button>
        </div>
    )
}
export default FiltersGroup