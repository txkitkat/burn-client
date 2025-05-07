import React, { useEffect, useState } from 'react';
import './ModelButton.css';
import { ModelStage } from '../enums/modelStage';
import IFeatureType from '../types/featureType';

interface ModelButtonProps {
  startModel: () => void;
  resubmitModel: () => void;
  currentStage: ModelStage;
  errorFields: boolean;
}

export default function ModelButton(props: ModelButtonProps) {
  const [buttonText, setButtonText] = useState("Predict Prescribed Fire Spread");

  const handleClick = () => {
    if (props.currentStage === ModelStage.MissingFeatures) {
      props.resubmitModel();
    }
    else {
      props.startModel();
    }
  };

  useEffect(() => {
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
      case (ModelStage.MissingFeatures):
        return "Re-Submit Features";
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
