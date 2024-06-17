import React from 'react'
import {
    Page,
    Layout,
    LegacyCard,
    SkeletonBodyText,
    SkeletonTabs,
    SkeletonThumbnail,
    TextContainer,
    SkeletonDisplayText,
} from '@shopify/polaris';
import HeaderDesktopViewSkeleton from './HeaderDesktopViewSkeleton';
import HeaderMobileViewSkeleton from './HeaderMobileViewSkeleton';
function PhotoStudioSkeleten() {
    return (
        <div className='virtual_try_on_skeleton_container onbording_step_container'>
            <Page fullWidth>
                <HeaderDesktopViewSkeleton/>
                <HeaderMobileViewSkeleton/>
                <Layout>
                    <Layout.Section variant="oneThird">
                        <div className="onboarding_skalten_content">
                            <LegacyCard>
                                <LegacyCard.Section>
                                    <TextContainer>
                                        <SkeletonDisplayText size="small" />
                                        <SkeletonBodyText lines={1} />
                                    </TextContainer>
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <div className="add_product_skelton">
                                        <SkeletonDisplayText size="small" />
                                        <SkeletonDisplayText size="small" />
                                    </div>
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <SkeletonBodyText lines={5} />
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <div className="virtual_try_on_skelton">
                                        <SkeletonDisplayText size="large" />
                                    </div>
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <SkeletonTabs />
                                </LegacyCard.Section>
                            </LegacyCard>

                            <LegacyCard subdued>
                                <LegacyCard.Section>
                                    <div className="custom_slider_skelton">
                                        <SkeletonThumbnail size="large" />
                                    </div>
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <div className="custom_slider_skelton_content">
                                        <SkeletonBodyText lines={1} />
                                    </div>
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <div className="custom_slider_skelton_content_last">
                                        <SkeletonBodyText lines={1} />
                                    </div>
                                </LegacyCard.Section>
                                <LegacyCard.Section>
                                    <div className="custom_slider_skelton_dots">
                                        <SkeletonBodyText lines={1} />
                                    </div>
                                </LegacyCard.Section>
                            </LegacyCard>
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>

        </div>
    )
}

export default PhotoStudioSkeleten
