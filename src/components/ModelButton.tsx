import React from 'react';
import './ModelButton.css';
import { ModelStage } from '../enums/modelStage';

interface ModelButtonProps {
  startModel: () => void;
}

export default function ModelButton(props: { startModel: () => void }) {
  const handleClick = () => {
    props.startModel();
    console.log("Model stage set to: SelectingLocation");
  };

  return (
    <button className="model-button" onClick={handleClick}>
      Start Location Selection
    </button>
  );
};
