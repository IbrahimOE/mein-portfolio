import React, { useState } from "react";
import "./FlipCard.css"; // CSS kommt unten!

export default function FlipCard({ front, back }) {
  return (
    <div className="flip-card" tabIndex={0}>
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
}
