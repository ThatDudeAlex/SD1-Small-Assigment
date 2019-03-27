import React from 'react';
import { whileStatement } from 'babel-types';
import './App.css';

const Annotation = (props) => {
  return (
    <div className="Annotation" >
      <p onClick={props.goInVid} className={props.vid}>{props.timestamp}</p>
    </div>
  )
};

export default Annotation;
