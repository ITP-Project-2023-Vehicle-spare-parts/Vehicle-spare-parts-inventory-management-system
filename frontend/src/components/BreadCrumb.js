import React from 'react';
import "../CSS/Admin.css"

const BreadCrumb = (props) => {
    const { title } = props;
    return (
        <div className='breadcrumb mb-0 py-4'>
            <div className='container-xxl'>
                <div className='row'>
                    <div className='col-12'>
                        <p className='text-center'>
                            <a href="/" className='text-dark'>
                                Home &nbsp;
                            </a>
                            / {title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BreadCrumb;
