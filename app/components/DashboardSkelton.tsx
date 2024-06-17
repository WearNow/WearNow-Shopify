import React from 'react'
import {
    Layout,
    Page,
    LegacyCard,
    SkeletonBodyText,
    SkeletonThumbnail,
    SkeletonTabs,
    TextContainer,
    SkeletonDisplayText
} from "@shopify/polaris";
import HeaderDesktopViewSkeleton from './HeaderDesktopViewSkeleton';
import HeaderMobileViewSkeleton from './HeaderMobileViewSkeleton';
function DashboardSkelton() {
    return (
        <div className='virtual_try_on_skeleton_container desktop_view_skeleton'>
            <Page fullWidth>
                <HeaderDesktopViewSkeleton/>
                <HeaderMobileViewSkeleton/>
                <Layout>
                    <Layout.Section>
                        <LegacyCard sectioned>
                            <div className="banner_skelton">
                                <SkeletonThumbnail size="medium" />
                            </div>
                        </LegacyCard>
                        {/* <LegacyCard sectioned>
                            <div className="create_catalogue_skelton">
                                <TextContainer>
                                    <div className="create_catalogue_skelton_content">
                                        <SkeletonDisplayText size="small" />
                                        <SkeletonBodyText lines={1} />
                                    </div>
                                    <SkeletonDisplayText size="small" />
                                </TextContainer>
                            </div>
                        </LegacyCard> */}
                        <LegacyCard sectioned>
                            <div className="virtual_with_photo_skelton">
                                <TextContainer>
                                    <SkeletonThumbnail size="medium" />
                                    <div className="title_skeleton">
                                        <SkeletonDisplayText size="small" />
                                    </div>
                                    <SkeletonBodyText lines={2} />
                                    <div className="title_skeleton">
                                        <SkeletonDisplayText size="small" />
                                    </div>
                                </TextContainer>
                                <TextContainer>
                                    <SkeletonThumbnail size="medium" />
                                    <div className="title_skeleton">
                                        <SkeletonDisplayText size="small" />
                                    </div>
                                    <SkeletonBodyText lines={2} />
                                    <div className="title_skeleton">
                                        <SkeletonDisplayText size="small" />
                                    </div>
                                </TextContainer>
                            </div>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <div className="recommendetion_skelton">
                                <TextContainer>
                                    <SkeletonDisplayText size="small" />
                                    <SkeletonDisplayText size="small" />
                                    <SkeletonBodyText lines={1} />
                                </TextContainer>
                            </div>
                        </LegacyCard>
                    </Layout.Section>
                    <Layout.Section variant="oneThird">
                        <LegacyCard>
                            <LegacyCard.Section>
                                <TextContainer>
                                    <SkeletonDisplayText size="small" />
                                    <SkeletonBodyText lines={2} />
                                </TextContainer>
                            </LegacyCard.Section>
                            <LegacyCard.Section>
                                <SkeletonBodyText lines={1} />
                            </LegacyCard.Section>
                        </LegacyCard>
                        <LegacyCard subdued>
                            <LegacyCard.Section>
                                <TextContainer>
                                    <SkeletonDisplayText size="small" />
                                    <SkeletonBodyText lines={2} />
                                </TextContainer>
                            </LegacyCard.Section>
                            <LegacyCard.Section>
                                <SkeletonBodyText lines={2} />
                            </LegacyCard.Section>
                        </LegacyCard>
                        <LegacyCard subdued>
                            <LegacyCard.Section>
                                <TextContainer>
                                    <SkeletonDisplayText size="small" />
                                    <SkeletonBodyText lines={1} />
                                </TextContainer>
                            </LegacyCard.Section>
                            <LegacyCard.Section>
                                <div className="history_skelton">
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                    <SkeletonThumbnail size="medium" />
                                </div>
                            </LegacyCard.Section>
                        </LegacyCard>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    )
}

export default DashboardSkelton
