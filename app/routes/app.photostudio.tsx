import React, { useState } from "react";
import DashboardHeader from "~/components/DashboardHeader";
import MySetps from "~/components/MySteps";
import ProductSelector from "~/components/ProductoSelector";
import ThumbnailSelector from "~/components/ThumbnailSelector";

const LeftTop: React.FC = () => {
  return (
    <>
      <div className="w-full h-50 mb-6 flex-col justify-start items-start gap-4 inline-flex">
        <div className="text-neutral-800 text-4xl font-medium font-['SF Pro Display'] leading-normal">
          Create Product Photos
        </div>
        <div className="w-full text-zinc-600 text-base font-medium font-['SF Pro Display'] leading-normal">
          Take your product photos to the next level in just 4 easy steps!
        </div>
      </div>
    </>
  );
};

function App() {
  const description = "hhhh";

  const [items, setItmes] = React.useState([
    {
      title: "Select 1 Product",
      sutitle: (
        <>
          {/* subtitle */}
          <div className="w-full h-full pl-0.5 py-1 gap-1 ">
            <div className="text-zinc-600 text-sm font-medium font-['SF Pro Display'] leading-none">
              Select the number of photos you would like to create
            </div>
          </div>
          {/* input */}
          <div className="w-full h-20 flex-col justify-start items-start gap-1 inline-flex">
            <div className="self-stretch p-3 bg-white rounded-md border border-neutral-400 justify-start items-center inline-flex">
              <div className="w-2.5 justify-start items-center flex">
                <div className="text-neutral-400 text-base font-normal font-['SF Pro Display']">
                  4
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Select a model",
      sutitle: description,
    },
    {
      title: "Select a background",
      sutitle: description,
    },
    {
      title: "Select a pose",
      sutitle: description,
    },
  ]);

  const [currentStep, setCurrentStep] = useState<number>(0);

  const renderRight = () => {
    switch (currentStep) {
      case 0:
        return <ProductSelector />;
      case 1:
        return <ThumbnailSelector />;
      default:
        return <ThumbnailSelector />;
    }
  };
  return (
    <>
      <DashboardHeader />
      <div className="w-full flex justify-between items-start bg-white px-[60px] my-[40px]">
        <div className="h-full w-400">
          <LeftTop />
          <MySetps
            items={items}
            currentStep={currentStep}
            onNext={(step) => setCurrentStep(step + 1)}
          />
        </div>
        <div className="h-[720px] w-280">{renderRight()}</div>
      </div>
    </>
  );
}

export default App;
