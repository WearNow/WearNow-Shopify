import React, { useState } from 'react';


const MultipleSearchSelection: React.FC<{options:any}> = ({ options }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showOptions, setShowOptions] = useState<boolean>(false);

    console.log(options,"options");
    const handleSelectOption = (option: string) => {
        setSelectedOptions([...selectedOptions, option]);
        setSearchTerm(''); // Clear search term after selection
        setShowOptions(false); // Hide options after selection
    };

    const handleRemoveOption = (option: string) => {
        setSelectedOptions(selectedOptions.filter((item) => item.uuid !== option));
    };

    const filteredOptions = options;

    return (
        <div className="flex flex-col w-full ">
            <div className="relative border border-gray-300 rounded"style={{border:"1px solid #858585",borderRadius:"10px"}}>
            <svg className="search_icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z" stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
                <div className=" selected_items">
                    {selectedOptions.map((option) => (
                        <div key={option} className="flex items-center mb-1 rounded-lg border border-solid border-gray-300" style={{padding:"0px 10px"}}>
                            <img src="https://cdn.shopify.com/s/files/1/0843/1642/2421/files/poseImage.png?v=1715341732" alt="" />
                            <span className="px-2 py-1 mr-2 text-sm">
                                {option}
                            </span>
                            <button
                                onClick={() => handleRemoveOption(option)}
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
                <input
                   style={{borderRadius:"10px"}}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowOptions(!!e.target.value); // Show options when there's a search term
                    }}
                    onFocus={() => setShowOptions(!!searchTerm)} // Show options when input is focused and there's a search term
                    className="pl-[40px] pt-[5px] pb-[5px] w-full focus:outline-none"
                />
                {showOptions && (
                    <ul className="absolute z-10 bg-white w-full border border-gray-300 rounded mt-1 overflow-y-auto max-h-48">
                        {filteredOptions.map((option) => (
                            <li
                                key={option?.uuid}
                                onClick={() => handleSelectOption(option.uuid)}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {option?.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MultipleSearchSelection;
 