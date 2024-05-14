interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    onChange: (value: string) => void;
}

// while polaris'select has some issues, I have used a custom select component for now.
const MySelect: React.FC<SelectProps> = (props: SelectProps) => {
  const { label, options, onChange } = props;
  return (
    // <Select label="Select an option" options={options} onChange={value => {
    //     console.log(value)
    //     onChange(value)
    // }} />
    <>
      <div className="w-full h-full pl-0.5 py-1 gap-1 ">
        <div className="text-zinc-600 text-sm font-medium font-['SF Pro Display'] leading-none">{label}</div>
      </div>
      <div className="flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#cfd4dc] relative shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] z-[62]">
        <div className="flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[63]">
          <div className="flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[64]">
            <select
              onChange={event => onChange(event.target.value)}
              className="cstm_select h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[24px] text-[#667084] relative text-left overflow-hidden whitespace-nowrap z-[65]"
            >
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default MySelect;
