import React, { useState } from 'react';
import Helmet from 'react-helmet';
import ProductCard from '../components/ProductCard';
import Color from '../components/Color';

const Store = () => {
  const [grid, setGrid] = useState(4);

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Store</title>
    </Helmet>
    <div className='home-wrapper-2'>
      <center><h4><br/>.....STORE.....<br/><br/></h4></center>
    </div>

    <div className='store-wrapper home-wrapper-2 py-5'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-3'>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Shop By Category</h3>
              <div>
                <ul className='ps-0'>
                  <li>BAJAJ</li>
                  <li>HERO</li>
                  <li>YAMAHA</li>
                  <li>PLATINA</li>
                </ul>
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Filter By</h3>
              <div>
                <h5 className='sub-title'>Price (Rs.)</h5>
                <div className='d-flex align-items-center gap-10'>
                <div className="form-floating">
                  <input type="email" className="form-control" id="floatingInput" placeholder="From" />
                  <label htmlFor="floatingInput">From</label>
                </div>
                <div className="form-floating">
                  <input type="email" className="form-control" id="floatingInput1" placeholder="To"/>
                  <label htmlFor="floatingInput1">To</label>
                </div>
                </div>
                <h5 className='sub-title'>Colors</h5>
                <div>
                    <Color />
                </div>          
              </div>
            </div>
            <div className='filter-card mb-3'>
              <h3 className='filter-title'>Product tag</h3>
              <div>
                <div className='product-tags d-flex flex-wrap align-items-center gap-10'>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    CT100
                  </span>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    NS150
                  </span>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    NS200
                  </span>
                  <span className='badge bg-light text-secondary rounded-3 py-2 px-3'>
                    ZR100
                  </span>
                </div> 
              </div>
            </div>
          </div>
          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className='d-flex justify-content-between align-items-center gap-10'>
              <div className='d-flex align-items-center '>
                <p className='mb-0 d-block'>Sort_by: </p>
                <select name='' className='form-control form-select sort_style_backgrond' id=''>
                    <option value="manual">Featured</option>
                    <option value='best-selling' selected="selected">Best selling</option>
                    <option value='title-ascending' selected="selected">Alphabetically: A - Z</option>
                    <option value='title-descending' selected="selected">Alphabetically: Z - A</option>
                    <option value='price-ascending' selected="selected">Price: low to high</option>
                    <option value='price-descending' selected="selected">Price: high to low</option>
                </select>
              </div>
              <div className='d-flex align-items-center gap-10'>
                <p className='totalproducts'>Products</p>
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
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
              <ProductCard grid={grid} />
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