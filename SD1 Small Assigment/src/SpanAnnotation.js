import React from 'react';
import { whileStatement } from 'babel-types';
import './App.css';

const SpanAnnotation = (props) => {
  const styles = {
    color: 'white'
  }
  return (
    <div className="SpanAnnotation">
      <p>{props.startTimestamp}</p>
      <p>{props.endTimestamp}</p>
    </div>
  )
};

export default SpanAnnotation;
