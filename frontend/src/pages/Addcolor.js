import React from 'react';
import CustomInput from '../components/CustomeInput';

const Addcolor = () => {
  return (
    <div>
        <h3 className='mb-4 title'> Add Color</h3>
        <div>
            <form action=''>
                <CustomInput type='color' label="Enter color" />
                <button className='btn btn-success border-0 rounded-3 my-5' type="Submit"> Add-Color</button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor;