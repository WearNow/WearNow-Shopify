export const HistoryNoData: React.FC<{tips: string}> = ({tips}) => {

    return (
        <div className="flex justify-center w-full h-100">
          <div className="flex justify-center px-4 w-full h-full max-md:max-w-full">
            <div className="flex relative flex-col w-96 h-96 m-auto max-md:px-5">
              <img height="100%" width="100%"
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2247c0baaa7573ec4f1e566f1969427b33ab9daab3ae03d839a065e0e8221427?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                className="absolute inset-0 size-full aspect-square scale-150"
              />
              <div className="my-auto">
                <div className="flex relative justify-center items-center self-center px-8 bg-[linear-gradient(180deg,#F9FAFB_0%,#EDF0F3_100%)] h-28 rounded-[200px] w-28 mx-auto max-md:px-5">
                  <img height="100%" width="100%"
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/861df753d468235a4e7fce93d94eadaf367e5dbbaaa20a75f4da35ed036937ed?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&"
                    className="w-full shadow aspect-square"
                  />
                </div>
                <div className="absolute w-full flex justify-center items-center left-0 bottom-28 text-sm font-medium text-center text-gray-900">
                  <div>{tips}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}