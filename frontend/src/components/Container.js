import React from 'react'
import "../CSS/Admin.css"

const Container = (props) => {
  return (
    <section className={props.class1}>
      <div className='container-xxl'>{props.children}</div>
    </section>
  );
};

export default Container;