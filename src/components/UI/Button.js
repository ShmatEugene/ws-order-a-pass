import React from 'react';

export default function Button(props) {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`button  ${props.type || 'button-green'}`}>
      {props.children}
    </button>
  );
}
