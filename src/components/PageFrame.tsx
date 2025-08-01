import '../styles/page-frame.css';
import React from 'react';
import corner from '../images/frame-corner.png';

export default function PageFrame() {
  return (
    <div aria-hidden className="page-frame">
      <img alt="" className="page-frame__corner tl" src={corner} />
      <img alt="" className="page-frame__corner tr" src={corner} />
      <img alt="" className="page-frame__corner bl" src={corner} />
      <img alt="" className="page-frame__corner br" src={corner} />
    </div>
  );
}
