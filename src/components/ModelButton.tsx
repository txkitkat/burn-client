import React, { useEffect, useState } from 'react';
import './ModelButton.css';
import { ModelStage } from '../enums/modelStage';

interface ModelButtonProps {
  startModel: () => void;
  currentStage?: ModelStage;
}

export default function ModelButton(props: ModelButtonProps) {
  const [buttonText, setButtonText] = useState("Predict Prescribed Fire Spread");

  const handleClick = () => {
    props.startModel();
  };

  useEffect(() => {
    console.log("Clicked!");
    setButtonText(getButtonLabel());
  }, [props.currentStage]);

  const getButtonLabel: () => string = () => {
    switch (props.currentStage) {
      case (ModelStage.SelectingLocation):
      case (ModelStage.SelectingDate):
      case (ModelStage.Result):
        return "Restart Predictor";
      case (ModelStage.Loading):
        return "Loading...";
      default:
        return "Predict Prescribed Fire Spread"
    }
  }

  return (
    <button className="model-button" onClick={handleClick}>
      {buttonText}
    </button>
  );
};
