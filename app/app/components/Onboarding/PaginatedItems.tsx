import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './PaginatedItems.css';

// Sample JSON data with image URLs and titles
const jsonData: { id: number; imageUrl: string; title: string }[] = [
  { id: 1, imageUrl: 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_2.png?v=1714052434', title: 'Black Top' },
  { id: 2, imageUrl: 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_1.png?v=1714052433', title: 'White Dress' },
  { id: 3, imageUrl: 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433', title: 'Red Top' },
  { id: 4, imageUrl: 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_2.png?v=1714052434', title: 'Black Top11' },
  { id: 5, imageUrl: 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image_1.png?v=1714052433', title: 'White Dress22' },
  { id: 6, imageUrl: 'https://cdn.shopify.com/s/files/1/0843/1642/2421/files/Image.png?v=1714052433', title: 'Red Top' }
];

interface PaginatedItemsProps {
  itemsPerPage: number;
}

const PaginatedItems: React.FC<PaginatedItemsProps> = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = jsonData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jsonData.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div className='product_pagination'>
        {currentItems.map((item) => (
          <div className="item-container" key={item.id}>
            <input type="checkbox" id={`checkbox${item.id}`} />
            <label htmlFor={`checkbox${item.id}`}>
              <img className="item-image" src={item.imageUrl} alt="Image" />
              <span className="item-title">{item.title}</span>
            </label>
          </div>
        ))}
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          className='pagination_controlled'
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default PaginatedItems;
