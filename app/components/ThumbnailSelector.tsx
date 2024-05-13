import { Badge, Bleed, BlockStack, InlineStack, Box, Button, Card, Image, InlineGrid, Pagination, Scrollable, Tag, Text, Icon } from '@shopify/polaris';
import { PlusIcon, UploadIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

import { LegacyCard, EmptyState } from '@shopify/polaris';

function EmptyStateExample() {
  return (
    <EmptyState
      heading="Upload Your Own model"
      action={{ content: 'Add transfer' }}
      secondaryAction={{
        content: 'Learn more',
        url: 'https://help.shopify.com'
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <p>15 Photos | Clear Face,No Accessories | this may take more time to create</p>
    </EmptyState>
  );
}

interface DataType {
  label: string;
  id: string;
  value: string;
  img: string;
  tags: string[];
}

const segments: DataType[] = [
  {
    label: 'Model 1',
    id: 'gid://shopify/CustomerSegment/1',
    value: '0',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_1.png?v=1715483175',
    tags: ['Dark skin', 'Small Size']
  },
  {
    label: 'Model 2',
    id: 'gid://shopify/CustomerSegment/2',
    value: '1',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_2.png?v=1715483175',
    tags: ['Pale skin', 'Medium Size']
  },
  {
    label: 'Model 3',
    id: 'gid://shopify/CustomerSegment/3',
    value: '2',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_3.png?v=1715483177',
    tags: ['Pale skin', 'Medium Size']
  },
  {
    label: 'Model 4',
    id: 'gid://shopify/CustomerSegment/4',
    value: '3',
    img: 'https://cdn.shopify.com/s/files/1/0641/2268/3542/files/Model_4.png?v=1715483175',
    tags: ['Pale skin', 'Medium Size']
  }
];

const lazyLoadSegments = Array.from(Array(10)).map((_, index) => {
  let tmp = { ...segments[index % segments.length] };
  tmp.id = `gid://shopify/CustomerSegment/${index + segments.length + 1}`;
  tmp.value = `${index + segments.length}`;
  return tmp;
});

segments.push(...lazyLoadSegments);

const ProductSelector: React.FC = ({}) => {
  const listboxItemMarkup = (seg: DataType) => (
    <div style={{ display: 'flex', height: '250px', justifyContent: 'space-around' }}>
      <Card>
        <Bleed marginInline="400" marginBlock="400">
          <Image source={seg.img} alt="a sheet with purple and orange stripes" />
          <Box padding="400">
            <div className="self-stretch justify-start items-center gap-2 inline-flex">
              <div style={{ width: 193, color: '#303030', fontSize: 13, fontFamily: 'Inter', fontWeight: '650', wordWrap: 'break-word' }}>{seg.label}</div>
            </div>
            <div className="pt-2 gap-2 flex">
              {seg.tags.map(tag => (
                <Badge size="large">{tag}</Badge>
              ))}
            </div>
          </Box>
        </Bleed>
      </Card>
    </div>
  );

  const SpacingBackground = ({ children, width = '100%' }: { children: React.ReactNode; width?: string }) => {
    return (
      <div
        style={{
          width,
          height: 'auto'
        }}
      >
        {children}
      </div>
    );
  };

  const listboxMarkup = (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <SpacingBackground>
          <InlineGrid gap="400" columns={2}>
            {segments.map(seg => listboxItemMarkup(seg))}
          </InlineGrid>
        </SpacingBackground>
      </div>
    </>
  );

  const textFieldMarkup = (
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

  const [tryOn, setTryOn] = useState(false);

  const switchTryOn = () => {
    setTryOn(tryOn => !tryOn);
  };

  return (
    <div
      style={{
        alignItems: 'stretch',
        borderTop: '1px solid #DFE3E8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      <BlockStack gap="200">
        <Card background="bg-surface-secondary">
          <div style={{ margin: 10 }}>
            <InlineStack blockAlign="start">
              <div>
                <Text as="h2" variant="headingSm">
                  Model Librayl
                </Text>
              </div>

              <div style={{ display: 'Flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 60 }}>
                <Text as="h2" variant="headingSm">
                  Male Models
                </Text>
                <div className="w-[36px] h-[28px] shrink-0 bg-[url(../assets/images/3cd34978-eac0-4005-a003-a90c6014efaf.png)] bg-cover bg-no-repeat relative z-[22]">
                  <div className="enabled_vartual_try_on try_on_active flex flex-col justify-center items-start p-1 my-auto rounded-xl">
                    <div className="switch">
                      <input type="checkbox" id="switchxxx" />
                      <label htmlFor="switchxxx">Toggle</label>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'block', clear: 'both' }}></div>
            </InlineStack>
          </div>

          <div
            style={{
              width: '100%',
              height: '125px',
              borderRadius: '12px',
              boxShadow: 'rgba(26, 26, 26, 0.07) 0px 1px 0px 0px',
              backgroundColor: 'white',
              border: '0px solid rgb(229, 231, 235)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <button style={{ border: '1px solid rgba(229, 231, 235)', borderRadius: 10, padding: 10 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="upload-cloud-02">
                  <path
                    id="Icon"
                    d="M6.66669 13.3333L10 10M10 10L13.3334 13.3333M10 10V17.5M16.6667 13.9524C17.6846 13.1117 18.3334 11.8399 18.3334 10.4167C18.3334 7.88536 16.2813 5.83333 13.75 5.83333C13.5679 5.83333 13.3976 5.73833 13.3051 5.58145C12.2184 3.73736 10.212 2.5 7.91669 2.5C4.46491 2.5 1.66669 5.29822 1.66669 8.75C1.66669 10.4718 2.36289 12.0309 3.48914 13.1613"
                    stroke="#475467"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>

              {/* <Icon
            source={UploadIcon}
            tone="base"
          /> */}
            </button>
            <div className="w-full h-5 justify-center items-center gap-1.5 inline-flex">
              <div className="text-sky-700 text-sm font-semibold font-['Inter'] leading-tight">Upload Your Own Model</div>
            </div>
            <div className="w-96 text-center text-slate-600 text-xs font-normal font-['Inter'] leading-none">15 Photos | Clear Face, No Accessories | This may take more time to create</div>
          </div>
          <Scrollable
            style={{
              position: 'relative',
              height: '715px',
              padding: 'var(--p-space-200) 0',
              borderBottomLeftRadius: 'var(--p-border-radius-200)',
              borderBottomRightRadius: 'var(--p-border-radius-200)'
            }}
            // onScrolledToBottom={handleLazyLoadSegments}
          >
            {listboxMarkup}
          </Scrollable>
        </Card>
      </BlockStack>
    </div>
  );
};

export default ProductSelector;
