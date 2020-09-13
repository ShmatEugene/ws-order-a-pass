import React from 'react';

export default function Button(props) {
  return (
    <button disabled={props.disabled} onClick={props.onClick} className="button button-green">
      {props.children}
    </button>
  );
}
