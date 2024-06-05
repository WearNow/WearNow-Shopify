type UsageProps = {
  progress: number;
  progressMax: number;
};

const UsageComponent: React.FC<UsageProps> = ({ progress, progressMax }) => {
  console.log(progress, progressMax, ":::------offset");
  const numericOffset =
    progress / progressMax > 1 ? 100 : (progress / progressMax) * 100;
  console.log(numericOffset, ":::numeric offset");

  let stepColor = "";
  if (numericOffset == undefined || numericOffset <= 75) {
    stepColor = "#047AC6";
  } else if (numericOffset > 75 && numericOffset < 100) {
    stepColor = "#E8A21A";
  } else {
    stepColor = "#E71837";
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="4"
        viewBox="0 0 100% 4"
        fill="none"
      >
        <rect width="100%" height="4" rx="2" style={{ fill: "#EBEBEB" }} />
        <rect
          width={`${numericOffset}%`}
          height="4"
          rx="2"
          style={{ fill: stepColor }}
        />
      </svg>
    </>
  );
};


export default UsageComponent;