import React from 'react';
import './ModelButton.css';
import { ModelStage } from '../enums/modelStage';

interface ModelButtonProps {
  startModel: () => void;
}

const ModelButton: React.FC<ModelButtonProps> = ({ startModel }) => {
  const handleClick = () => {
    startModel();
    console.log("Model stage set to: SelectingLocation");
  };

  return (
    <button className="model-button" onClick={handleClick}>
      Start Location Selection
    </button>
  );
};

export default ModelButton;
