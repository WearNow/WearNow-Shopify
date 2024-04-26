import React, { useState } from 'react';
import OnboardingStepFirst from './OnboardingStepFirst';
import OnboardinStepSecond from './OnboardinStepSecond';
const Onboarding = () => {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const [showSecondComponent, setShowSecondComponent] = useState(false);
  const [showFirstColor, setShowFirstColor] = useState("");
  const [showSecondColor, setShowSecondColor] = useState("");
  const [count, setCount] = useState(1);

  const handleFirstButtonClick = () => {
    setShowFirstComponent(true);
    setShowSecondComponent(false);
    setShowSecondColor("blue");
    setShowFirstColor("");
    setCount(1);
  };

  const handleSecondButtonClick = () => {
    setShowFirstComponent(false);
    setShowSecondComponent(true);
    setShowSecondColor("green");
    setShowFirstColor("blue");
    setCount(2);
  };
  return (
    <div className="container w-full	h-80 m-auto mt-2 px-4" style={{ maxWidth: "90%" }}>
      <h1 className="mb-2 onbording_step_title">Onboarding - {count} of 2 steps</h1>
      <div className="relative flex rounded-full overflow-hidden onboarding_steps" style={{ gap: "2px", height: "4.3px" }}>
        <button className='onbording_step_first' style={{ backgroundColor: showSecondColor }} onClick={handleFirstButtonClick} ></button>
        <button className='onbording_step_second' style={{ backgroundColor: showFirstColor }} onClick={handleSecondButtonClick} ></button>
      </div>
      {showFirstComponent && <OnboardingStepFirst />}
      {showSecondComponent && <OnboardinStepSecond />}
    </div>
  )
}

export default Onboarding
