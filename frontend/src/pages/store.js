import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
//import Color from '../components/Color';
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {useDispatch, useSelector} from "react-redux";
import { getProducts } from '../features/product/productSlice';
import {BsSearch} from 'react-icons/bs';
import { getCategories } from '../features/pcategory/pcategorySlice';

const Store = () => {
  const [grid, setGrid] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const productState = useSelector((state) => state.product.products);
  const pCategoryState = useSelector((state) => state.pcategory.pCategories);
  //const [selectedSortOption, setSelectedSortOption] = useState('best-selling');

  const filteredProducts = productState.filter((item) =>
  (item.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
  ((priceRange.from === '' || parseInt(item.price) >= parseInt(priceRange.from)) &&
  (priceRange.to === '' || parseInt(item.price) <= parseInt(priceRange.to)))
);

const filteredProductsByCategory = productState.filter((item) =>
  (item.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
  ((priceRange.from === '' || parseInt(item.price) >= parseInt(priceRange.from)) &&
  (priceRange.to === '' || parseInt(item.price) <= parseInt(priceRange.to)))
);

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
    dispatch(getCategories());
  },[dispatch]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === 'all' ? '' : category);
    setSearchQuery('');
  };

  return (
    <>
    <Meta title = {"Our Store"}/>
    <BreadCrumb title = "Our Store"/>
    <div className="col-6 container-xxl">
              <div class="input-group">
        <input
                  type="text"
                  class="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span class="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
      </div></div>
    <div className='store-wrapper home-wrapper-2 py-5'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Shop By Category</h3>
              <div>
                <ul className='ps-0'>
                {pCategoryState.map((category, index) => (
              <li key={index} onClick={() => handleCategoryClick(category.title)} value={category.title}>
                {category.title}
              </li>
            ))}
            <li>..................................................................</li>
            <li onClick={() => handleCategoryClick('all')}>All Products</li>
                </ul>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Filter By</h3>
              <div>
                <h5 className='sub-title'>Price (Rs.)</h5>
                <div className='d-flex align-items-center gap-10'>
                <div className="form-floating">
                <input
    type="text" 
    className="form-control"
    id="floatingInput"
    placeholder="From"
    value={priceRange.from}
    onChange={(e) => {
      const input = e.target.value;
      if (/^\d+$/.test(input)) {
        setPriceRange({ ...priceRange, from: input });
      }
    }}
  />
                  <label htmlFor="floatingInput">From</label>
                </div>
                <div className="form-floating">
                <input
    type="text"  
    className="form-control"
    id="floatingInput1"
    placeholder="To"
    value={priceRange.to}
    onChange={(e) => {
      const input = e.target.value;
      if (/^\d+$/.test(input)) {
        setPriceRange({ ...priceRange, to: input });
      }
    }}
  />
                  <label htmlFor="floatingInput1">To</label>
                </div>
                </div>      
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Product tag</h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    Original
                  </span>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    Local
                  </span>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    imported
                  </span>
                </div> 
              </div>
            </div>
          </div>
          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className='d-flex justify-content-between align-items-center gap-10'>
              <p className='totalproducts'>Products</p>
              {/* <div className='d-flex align-items-center '>
                <p className='mb-0 d-block'>Sort_by: </p>
                <select name='' className='form-control form-select sort_style_backgrond' id='' value={selectedSortOption}  onChange={(e) => setSelectedSortOption(e.target.value)}>
                    <option value="manual">Featured</option>
                    <option value='best-selling' selected="selected">Best selling</option>
                    <option value='title-ascending' selected="selected">Alphabetically: A - Z</option>
                    <option value='title-descending' selected="selected">Alphabetically: Z - A</option>
                    <option value='price-ascending' selected="selected">Price: low to high</option>
                    <option value='price-descending' selected="selected">Price: high to low</option>
                </select>
                </div> */}
              <div className='d-flex align-items-center gap-10'>
                
                <div className='d-flex gap-10 align-items-center grid'>
                  <img onClick={()=>{setGrid(3);}} src='/images/gr4.svg' className='d-block img-fluid' alt='grid' />
                  <img onClick={()=>{setGrid(4);}} src='/images/gr3.svg' className='d-block img-fluid' alt='grid' />
                  <img onClick={()=>{setGrid(6);}} src='/images/gr2.svg' className='d-block img-fluid' alt='grid' />
                  <img onClick={()=>{setGrid(12);}} src='/images/gr.svg' className='d-block img-fluid' alt='grid' />
                </div>
              </div>
              </div>
            </div>
            <div className='product-list pb-5'>
              <div className='d-flex gap-10 flex-wrap'>
              <ProductCard data={selectedCategory ? filteredProductsByCategory : filteredProducts} grid={grid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Store;