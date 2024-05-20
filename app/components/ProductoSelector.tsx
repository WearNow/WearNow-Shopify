import { AutoSelection, Button, Card, EmptySearchResult, Listbox, Pagination, Scrollable, TextField } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import React, { useState,useEffect } from 'react';
import client from '~/services/ApolloClient';
import gql from 'graphql-tag';

const actionValue = '__ACTION__';



const interval = 25;

const ProductSelector: React.FC <{ product: any,products:any, handleCheckboxChange:any }> = ({ product,products,handleCheckboxChange }) => {
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState<string>('');
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(12);
  const [activeOptionId, setActiveOptionId] = useState();
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState("");
  const [filteredSegments, setFilteredSegments] = useState<(typeof segments)[number][]>([]);


  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(products.length);
  };

  const handleFilterSegments = (query: any) => {
    const nextFilteredSegments = products.filter(segment => {
      return segment.label.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim());
    });

    setFilteredSegments(nextFilteredSegments);
  };

  const handleQueryChange = (query: any) => {
    setQuery(query);

    if (query.length >= 2) handleFilterSegments(query);
  };

  const handleQueryClear = () => {
    handleQueryChange('');
  };

  const handleSegmentSelect = (segmentIndex: string) => {
    console.log(segmentIndex,":::::::segment selected index");
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(String(segmentIndex));

    handleCheckboxChange(segmentIndex)
  };

  const handleActiveOptionChange = (_: string, domId: string) => {
    console.log("domId: " + domId);
    setActiveOptionId(domId);
  };

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults && !showFooterAction) {
      setLazyLoading(true);

      const options = query ? filteredSegments : products;

      setTimeout(() => {
        const remainingOptionCount = options.length - visibleOptionIndex;
        const nextVisibleOptionIndex = remainingOptionCount >= interval ? visibleOptionIndex + interval : visibleOptionIndex + remainingOptionCount;

        setLazyLoading(false);
        setVisibleOptionIndex(nextVisibleOptionIndex);

        if (remainingOptionCount <= interval) {
          setWillLoadMoreResults(false);
        }
      }, 1000);
    }
  };
  
  const listboxId = 'SearchableListbox';

  const textFieldMarkup = (
    <div style={{ padding: '12px' }}>
      <TextField
        focused={showFooterAction}
        clearButton
        labelHidden
        label="Customer segments"
        placeholder="Search By Name"
        autoComplete="off"
        value={query}
        connectedRight={<Button size="large" icon={SearchIcon}></Button>}
        ariaActiveDescendant={activeOptionId}
        ariaControls={listboxId}
        onChange={handleQueryChange}
        onClearButtonClick={handleQueryClear}
      />
    </div>
  );

  const segmentOptions = query ? filteredSegments : products;

  const segmentList =
    segmentOptions.length > 0
      ? segmentOptions.slice(0, visibleOptionIndex).map(({ title, uuid, image }) => {
       // console.log(title, uuid, images,"segmentList",products[selectedSegmentIndex])
          const selected = product==uuid?true:false;
          console.log(uuid,"product in product Selector: " + product)
          return (
            // <div className='border border-neutral-200'>
            // <div className="my-2" key={uuid} onClick={handleCheckboxChange(uuid)}>
            <div className="my-2" key={uuid}>
              <Listbox.Option key={uuid} value={uuid} selected={selected} >
                <Listbox.TextOption selected={selected}>
                  <div style={{ display: 'inline-flex' }}>
                    <img className="w-10 h-10" src={image}></img>
                    <div className="w-96 leading-10 px-2 ">{title}</div>
                  </div>
                </Listbox.TextOption>
              </Listbox.Option>
            </div>
          );
        })
      : null;

  const showAllMarkup = showFooterAction ? (
    <Listbox.Action value={actionValue}>
      <span style={{ color: 'var(--p-color-text-emphasis)' }}>Show all 111 segments</span>
    </Listbox.Action>
  ) : null;

  const lazyLoadingMarkup = lazyLoading ? <Listbox.Loading accessibilityLabel={`${query ? 'Filtering' : 'Loading'} customer segments`} /> : null;

  const noResultsMarkup = segmentOptions.length === 0 ? <EmptySearchResult title="" description={`No segments found matching "${query}"`} /> : null;
  const listboxMarkup = (
    // <div className='h-[642px] overflow-hidden'>
    <div>
      <Listbox
        enableKeyboardControl
        autoSelection={AutoSelection.FirstSelected}
        accessibilityLabel="Search for and select a customer segment"
        customListId={listboxId}
        onSelect={handleSegmentSelect}
        onActiveOptionChange={handleActiveOptionChange}
      >
        {segmentList}

        {/* {showAllMarkup} */}
        {noResultsMarkup}
        {/* {lazyLoadingMarkup} */}
      </Listbox>
    </div>
  );

  const paginationMarkup = (
    <div className="w-full mt-1 h-12 bg-neutral-100">
      <div className="grow shrink basis-0 h-12 justify-end items-center flex">
        <Pagination
          hasPrevious
          onPrevious={() => {
            console.log('Previous');
          }}
          hasNext
          onNext={() => {
            console.log('Next');
          }}
        />
      </div>
    </div>
  );

  return (
    <Card padding="0">
      <div
        style={{
          alignItems: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
          position: 'relative',
          width: '100%',
        }}
      >
        {textFieldMarkup}

        <Scrollable
          style={{
            height: "640px",
            overflowY: 'scroll',
            position: 'relative',
            padding: 'var(--p-space-200) 0',
            borderBottomLeftRadius: 'var(--p-border-radius-200)',
            borderBottomRightRadius: 'var(--p-border-radius-200)'
          }}
          onScrolledToBottom={handleLazyLoadSegments}
        >
          {listboxMarkup}
        </Scrollable>
        {paginationMarkup}
      </div>
    </Card>
  );
};

export default ProductSelector;
