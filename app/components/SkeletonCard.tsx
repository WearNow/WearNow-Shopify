const SkeletonCard: FC = () => (
    <div
      style={{
        backgroundColor: "rgba(227, 227, 227, 1)",
      }}
      className={` flex-shrink-0 flex overflow-hidden relative flex-col justify-center rounded-lg p-2.5 aspect-square`}
    >
      <div
        style={{
          // height:'258px',
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
        className="flex flex-col h-full items-start py-5 px-5 rounded-lg border border-white border-solid  max-md:pr-5"
      >
        <div
          style={{ color: "rgba(0, 0, 0, 1)" }}
          className=" text-xl sm:text-md md:text-xl lg:text-base xl:text-2xl font-semibold"
        >
          Photo
        </div>
        <div
          style={{ backgroundColor: "rgba(227, 227, 227, 1)" }}
          className="mb-2 w-[60%] h-[1.5rem] rounded-lg mt-auto"
        ></div>
        <div
          style={{ backgroundColor: "rgba(227, 227, 227, 1)" }}
          className="mb-2 w-[90%] h-[1.5rem] rounded-lg"
        ></div>
      </div>
    </div>
  );

  export default SkeletonCard;