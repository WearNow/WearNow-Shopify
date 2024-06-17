import React from 'react'
import {
    SkeletonBodyText,
    SkeletonTabs,
    Page,
    Layout,
    LegacyCard,
    TextContainer,
    SkeletonDisplayText,
  } from '@shopify/polaris';
function BillingSkelton() {
  return (
    <div className='billing_skelton_container'>
      <Page fullWidth>
            <Layout>
              <Layout.Section variant="oneThird">
                <span className="billing_skelton flex m-auto w-[325px] h-[45px] justify-center items-start shrink-0 basis-auto font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-center ">
                  <SkeletonBodyText lines={1} />
                  <SkeletonBodyText lines={1} />
                </span>
                <div className='flex m-auto	mt-5 w-[316px] h-[52px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] gap-[8px] items-start shrink-0 flex-nowrap bg-[rgba(116,116,128,0.08)] rounded-[100px]  top-[153px]  z-[3]'>
                  <SkeletonDisplayText size="small" />
                </div>
                <div className='skelton_billing_page'>
                  <LegacyCard subdued>
                    <LegacyCard.Section>
                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText lines={6} />
                      </TextContainer>
                    </LegacyCard.Section>
                    <LegacyCard.Section>
                      <SkeletonBodyText lines={6} />
                    </LegacyCard.Section>
                    <LegacyCard.Section>
                      <SkeletonDisplayText size="small" />
                    </LegacyCard.Section>
                  </LegacyCard>
                  <LegacyCard subdued>
                    <LegacyCard.Section>
                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText lines={6} />
                      </TextContainer>
                    </LegacyCard.Section>
                    <LegacyCard.Section>
                      <SkeletonBodyText lines={6} />
                    </LegacyCard.Section>
                    <LegacyCard.Section>
                      <SkeletonDisplayText size="small" />
                    </LegacyCard.Section>
                  </LegacyCard>
                  <LegacyCard subdued>
                    <LegacyCard.Section>
                      <TextContainer>
                        <SkeletonDisplayText size="small" />
                        <SkeletonBodyText lines={6} />
                      </TextContainer>
                    </LegacyCard.Section>
                    <LegacyCard.Section>
                      <SkeletonBodyText lines={6} />
                    </LegacyCard.Section>
                    <LegacyCard.Section>
                      <SkeletonDisplayText size="small" />
                    </LegacyCard.Section>
                  </LegacyCard>
                </div>
              </Layout.Section>
            </Layout>
          </Page>
    </div>
  )
}

export default BillingSkelton
