import { Card } from '@shopify/polaris';

import React from 'react';

interface StepPropItem {
  status?: 'waiting' | 'processing' | 'completed';
  title: string;
  sutitle?: React.ReactNode | string | undefined;
  completedTitle?: React.ReactNode | string | undefined;
}
interface StepperProps {
  currentStep: number;
  items: StepPropItem[];
  onNext?: (step: number) => void;
}

const Stepper: React.FC<StepperProps> = (prop: StepperProps) => {
  const { currentStep, items } = prop;

  // waiting, processing, completed
  const isWaitingStep = (index: number) => index > currentStep;
  const isProcessingStep = (index: number) => index === currentStep;
  const isCompletedStep = (index: number) => index < currentStep;

  const circleColor = (index: number) => (isWaitingStep(index) ? 'border-gray' : isProcessingStep(index) ? 'border-dashed border-black' : isCompletedStep(index) ? 'border-green-600' : 'bg-gray-300');
  const circleTextColor = (index: number) => (isWaitingStep(index) ? 'text-gray-300' : isProcessingStep(index) ? 'text-black' : isCompletedStep(index) ? 'text-green-600' : 'text-gray-500');
  const titleColor = (index: number) => (isWaitingStep(index) ? 'text-gray-300' : 'text-black');
  const lineColor = (index: number) => (isWaitingStep(index) ? 'border-black' : 'bg-black');
  return (
    <div>
      {items.map((_, index) => (
        <div className="w-full flex items-start justify-start mb-2" key={index}>
          <React.Fragment key={index}>
            <div>
              {/* circle */}
              <div className="w-full flex items-center justify-start ">
                <div className={`w-9 h-9 bg-white rounded-full border justify-center items-center inline-flex ${circleColor(index)}`}>
                  <div className={`text-center text-sm font-bold font-['SF Pro'] leading-tight ${circleTextColor(index)}`}>0{index + 1}</div>
                </div>
              </div>
              {/* line */}
              {isWaitingStep(index) ? null : <div style={{ width: '2px', marginLeft: '17px' }} className={`h-20 ${lineColor(index)}`}></div>}
            </div>
            {/* input or img */}

            <div className="ml-2">
              {/* title */}
              <div className={`w-full h-9 text-black/opacity-20 text-xl font-medium font-['SF Pro Display'] leading-normal ${titleColor(index)}`}>{_.title}</div>
              {/* sutitle */}
              {isProcessingStep(index) ? <div className="w-full">{_.sutitle}</div> : null}
              {isCompletedStep(index) ? <div className="w-full">{_.completedTitle}</div> : null}
            </div>
          </React.Fragment>
        </div>
      ))}
    </div>
  );
};

const MySetps: React.FC<StepperProps> = (prop: StepperProps) => {
  const { currentStep, items, onNext: onStepChange } = prop;

  const NextButton = (
    <div
    // opacity-40
      className="w-20  justify-center items-end inline-flex"
      style={{ cursor: 'pointer' }}
      onClick={() => {
        if (onStepChange) onStepChange(currentStep);
      }}
    >
      <div className="px-4 py-2.5 bg-sky-600 rounded-full justify-center items-center gap-2 flex">
        <div className="text-white text-base font-medium font-['SF Pro Display'] leading-normal">Next</div>
        <div className="w-1 h-2 relative" />
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      <Stepper currentStep={currentStep} items={items} />
      {NextButton}
    </div>
  );
};

export default MySetps;