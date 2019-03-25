import React from 'react';
import { whileStatement } from 'babel-types';
import './App.css';

const Annotation = (props) => {
  const styles = {
    color: 'white'
  }
  return (
    <div className="Annotation">
      <p>{props.timestamp}</p>
    </div>
  )
};

export default Annotation;
