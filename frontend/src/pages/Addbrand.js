import React from 'react';
import CustomInput from '../components/CustomeInput';

const Addbrand = () => {
  return (
    <div>
        <h3 className='mb-4 title'> Add Brand</h3>
        <div>
            <form action=''>
                <CustomInput type='text' label="Enter brand" />
                <button className='btn btn-success border-0 rounded-3 my-5' type="Submit"> Add-Brand</button>
            </form>
        </div>
    </div>
  )
}

export default Addbrand;