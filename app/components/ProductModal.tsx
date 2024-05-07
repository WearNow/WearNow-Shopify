import React, { useState, useEffect } from "react";
import axios from "axios";
 import {apiURL} from "../services/Services"




const ProdcutModal: React.FC<{
  isOpen: boolean;
  toggleModal: () => void;
  sessionData: any;
  inputData: number;
  updateCheckedData: (data: any[]) => void; 
}> = ({ isOpen, toggleModal, sessionData, inputData,updateCheckedData }) => {
  const [getprodcuts, setGetprodcuts] = useState([]);
  const [inputQueryValue, setInputQueryValue] = useState("");
  const [checkedProducts, setCheckedProducts] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (inputData || inputQueryValue) {
      fetchProdctData();
    }
  }, [inputData, inputQueryValue]);

  const fetchProdctData = async () => {
    try {
      const data = JSON.stringify({
        queryfor: "product",
        first: 50,
        fields: "id,title,",
        pagination: "yes",
        shop: sessionData.auth_session.shop,
        searchQuery: inputQueryValue,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiURL}api/query`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          const getProdcutsTitle = response.data.response.data.products?.edges;
          setGetprodcuts(getProdcutsTitle);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const sendSelectedProdcut = async () => {
    try {
      // Get an array of selected product IDs
      const selectedProductIds = Object.keys(checkedProducts).filter(
        (productId) => checkedProducts[productId]
      );
  
      // Filter the products based on the selected IDs and map them to include titles
      const selectedProducts = getprodcuts
        .filter((product) => selectedProductIds.includes(product.node.id))
        .map((product) => ({
          id: product.node.id,
          title: product.node.title,
          image: product.node.images.nodes[0].src
        }));
  
      // Prepare the data to send
      const data = JSON.stringify({
        queryfor: "selectedProdctsData",
        selectedProdct: selectedProducts,
        shop: sessionData.auth_session.shop,
      });
  
      // Define the request configuration
      const config = {
        method: "post", 
        maxBodyLength: Infinity,
        url: `${apiURL}api/saveDataInDb`, // Use the apiURL constant
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
  
      // Send the request
      const response = await axios.request(config);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputQueryValue(event.target.value); // Update inputQueryValue on input change
  };

  const handleCheckboxChange = (productId: string) => {
    setCheckedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  const displayCheckedData = () => {
    const checkedData = getprodcuts.filter(
      (product) => checkedProducts[product.node.id]
    );
    console.log(checkedData, "selected data ");
    updateCheckedData(checkedData);
  };

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
                  value={inputQueryValue} // Use inputQueryValue as value
                  onChange={handleInputChange} // Handle input change
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
            {getprodcuts.map((product, index) => (
              <div
                key={index}
                className="flex gap-2 py-1 font-[450] text-[color:var(--p-color-text)]"
              >
                <div className="product_import shrink-0 my-auto w-4 h-4 bg-white border border-solid border-zinc-500 rounded-[var(--p-border-radius-100)]">
                  <input
                    type="checkbox"
                    checked={checkedProducts[product.node.id]} // Check if the product is checked
                    onChange={() => handleCheckboxChange(product.node.id)} // Handle checkbox change
                  />
                  <label htmlFor="checkbox"></label>
                </div>
                <div><img src={product.node.images.nodes[0].src + "&height=20"} /></div>
                <div>{product.node.title}</div>
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
            <div
               onClick={() => {
                // Close the modal if needed
                toggleModal();
                
                // Send selected product data to the API
                sendSelectedProdcut();
                
                // Display checked data in console
                displayCheckedData();
              }}
              className="cursor-pointer done_btn flex flex-col justify-center px-3 py-1.5 bg-[color:var(--p-color-bg-fill-brand)] rounded-[var(--p-border-radius-button)]"
            >
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
