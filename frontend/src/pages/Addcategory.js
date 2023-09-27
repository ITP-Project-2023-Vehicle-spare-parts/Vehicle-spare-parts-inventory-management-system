import React from 'react';
import CustomInput from '../components/CustomeInput';

const Addcategory = () => {
  return (
    <div>
        <h3 className='mb-4 title'> Add Category</h3>
        <div>
            <form action=''>
                <CustomInput type='text' label="Enter category" />
                <button className='btn btn-success border-0 rounded-3 my-5' type="Submit"> Add-category</button>
            </form>
        </div>
    </div>
  )
}

export default Addcategory;