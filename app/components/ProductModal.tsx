import React, { useState } from "react";

const ProdcutModal: React.FC<{
  isOpen: boolean;
  toggleModal: () => void;
  productTitles: string[];
  sendDataToParentToSearchValues:(data:string) => void;
}> = ({ isOpen, toggleModal, productTitles,sendDataToParentToSearchValues }) => {
  const [searchValue , setSearchValue] = useState("")
  console.log(productTitles, "data in modal");



  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    sendDataToParentToSearchValues(event.target.value); 

  }

  return (
    <div className="parent_model">
      <div className={`modal ${isOpen ? "open" : "closed"}`}>
        <div className="flex flex-col rounded-lg shadow-sm bg-[color:var(--p-color-bg-surface)] max-w-[620px]">
          <div className="justify-center py-3 pr-3 pl-4 text-sm leading-5 border-b border-solid bg-[color:var(--p-color-surface-tertiary)] border-neutral-200 font-[650] text-[color:var(--p-color-text)] max-md:max-w-full">
            Select products to import
          </div>
          <div className="flex flex-col items-start self-center px-5 mt-4 w-full text-sm leading-5 rounded-xl max-w-[628px] max-md:max-w-full">
            <div className="flex gap-1 self-stretch max-md:flex-wrap">
              <div
                className="flex gap-1 px-3 py-1.5 whitespace-nowrap bg-white border border-solid border-zinc-500 font-[450] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text-secondary)] max-md:flex-wrap"
                style={{ width: "74%", borderRadius: "10px" }}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e4a1b0c13fb249d11f4e19cda011d281e3460ad21e2eb935e99bdf9a0cd87b2?"
                  className="shrink-0 w-5 aspect-square"
                  alt=""
                />
                <input
                  type="text"
                  className="text-ellipsi modal_input"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-0.5 justify-center px-3 py-1.5 shadow-sm bg-[color:var(--p-color-bg-fill)] font-[550] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text)]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/53a28fdab9bcb208d45fcf699a0e4716ecf152e2e5d485f24c2277277929c386?"
                  className="shrink-0 my-auto w-4 aspect-square"
                  alt=""
                />
                <div>Most popular</div>
              </div>
            </div>
            <div className="mt-3 font-[450] text-[color:var(--p-color-text)]">
              Available products
            </div>
            {/* Mapping through productTitles array */}
            {productTitles.map((title, index) => (
              <div
                key={index}
                className="flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)]"
              >
                <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                 <input type="checkbox"/>
                 <label htmlFor="checkbox"></label>
                </div>
                <div>{title?.node?.title}</div>
              </div>
            ))}
          </div>
          <div className="modal_control_btn flex gap-2 p-4 mt-4 w-full border-t border-solid bg-[color:var(--p-color-bg-surface)] border-neutral-200 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
            <div
              className="cursor-pointer cancel_btn justify-center px-3 py-1.5 text-xs leading-4 whitespace-nowrap shadow-sm bg-[color:var(--p-color-bg-fill)] font-[550] rounded-[var(--p-border-radius-button)] text-[color:var(--p-color-text)]"
              onClick={toggleModal}
            >
              Cancel
            </div>
            <div className="cursor-pointer done_btn flex flex-col justify-center px-3 py-1.5 bg-[color:var(--p-color-bg-fill-brand)] rounded-[var(--p-border-radius-button)]">
              <div className="shrink-0 h-7 shadow-sm bg-[linear-gradient(180deg,)] rounded-[var(--p-border-radius-button)]">
                Done
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdcutModal;
