import React, { useState } from 'react';
import { Icon, Card, TextField, Listbox, AutoSelection, Scrollable, EmptySearchResult, Button, Pagination } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';

const actionValue = '__ACTION__';

const segments = [
  {
    label: 'Black Top',
    id: 'gid://shopify/CustomerSegment/1',
    value: '0',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/product_black.png?v=1715481859'
  },
  {
    label: 'White Dress',
    id: 'gid://shopify/CustomerSegment/2',
    value: '1',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/product_white.png?v=1715481859'
  },
  {
    label: 'Red Top',
    id: 'gid://shopify/CustomerSegment/3',
    value: '2',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/product_red.png?v=1715481859'
  }
];

const lazyLoadSegments = Array.from(Array(100)).map((_, index) => {
  let tmp = {...segments[(index%segments.length)]}
  tmp.id = `gid://shopify/CustomerSegment/${index + segments.length + 1}`
  tmp.value = `${index + segments.length}`
  return tmp
});

segments.push(...lazyLoadSegments);

// console.log(segments)

const interval = 25;

const ProductSelector: React.FC = ({ }) => {
  const [showFooterAction, setShowFooterAction] = useState(true);
  const [query, setQuery] = useState<string>('');
  const [lazyLoading, setLazyLoading] = useState(false);
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true);
  const [visibleOptionIndex, setVisibleOptionIndex] = useState(10);
  const [activeOptionId, setActiveOptionId] = useState(segments[0].id);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState(0);
  const [filteredSegments, setFilteredSegments] = useState<(typeof segments)[number][]>([]);

  const handleClickShowAll = () => {
    setShowFooterAction(false);
    setVisibleOptionIndex(segments.length);
  };

  const handleFilterSegments = (query: any) => {
    const nextFilteredSegments = segments.filter(segment => {
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
    if (segmentIndex === actionValue) {
      return handleClickShowAll();
    }

    setSelectedSegmentIndex(Number(segmentIndex));
  };

  const handleActiveOptionChange = (_: string, domId: string) => {
    setActiveOptionId(domId);
  };

  const handleLazyLoadSegments = () => {
    if (willLoadMoreResults && !showFooterAction) {
      setLazyLoading(true);

      const options = query ? filteredSegments : segments;

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

  const segmentOptions = query ? filteredSegments : segments;

  const segmentList =
    segmentOptions.length > 0
      ? segmentOptions.slice(0, visibleOptionIndex).map(({ label, id, value, img }) => {
          const selected = segments[selectedSegmentIndex].value === value;

          return (
            <Listbox.Option key={id} value={value} selected={selected}>
              <Listbox.TextOption selected={selected}>
                {/* <Thumbnail source={img} alt={label} />  */}
                <div style={{ display: 'inline-flex' }}>
                  <img className="w-10 h-10" src={img}></img>
                  <div className="w-96 leading-10 px-2 ">{label}</div>
                </div>
              </Listbox.TextOption>
            </Listbox.Option>
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
  );

  const paginationMarkup = (
    <div className="w-full absolute bottom-0 h-12 pl-3 pr-2 bg-neutral-100">
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
    <Card>
      <div
        style={{
          alignItems: 'stretch',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'stretch',
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
      >
        {textFieldMarkup}

        <Scrollable
          style={{
            position: 'relative',
            height: '715px',
            padding: 'var(--p-space-200) 0',
            borderBottomLeftRadius: 'var(--p-border-radius-200)',
            borderBottomRightRadius: 'var(--p-border-radius-200)'
          }}
          onScrolledToBottom={handleLazyLoadSegments}
        >
          {listboxMarkup}
          {paginationMarkup}
        </Scrollable>
      </div>
    </Card>
  );
};

export default ProductSelector;
