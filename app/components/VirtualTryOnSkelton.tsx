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
function VirtualTryOnSkelton() {
    return (
        <div className='virtual_try_on_skeleton_container'>
            <Page fullWidth>
                <HeaderDesktopViewSkeleton/>
                <HeaderMobileViewSkeleton/>
            <div className='vartual_try_on_container_skeleton'>
                <Layout>
                    <Layout.Section>
                   <div className="feature_title_skelton">
                    <SkeletonDisplayText size="small" />
                    <SkeletonBodyText lines={1}/>
                    </div>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="number_of_skeleton">
                                <SkeletonDisplayText size="small" />
                                <div className="number_of_skeleton_content">
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2}/>
                                </div>
                                </div>
                            </TextContainer>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="number_of_skeleton">
                                <SkeletonDisplayText size="small" />
                                <div className="number_of_skeleton_content">
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2}/>
                                </div>
                                </div>
                            </TextContainer>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="number_of_skeleton">
                                <SkeletonDisplayText size="small" />
                                <div className="number_of_skeleton_content">
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2}/>
                                </div>
                                </div>
                            </TextContainer>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="number_of_skeleton">
                                <SkeletonDisplayText size="small" />
                                <div className="number_of_skeleton_content">
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2}/>
                                </div>
                                </div>
                            </TextContainer>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="number_of_skeleton">
                                <SkeletonDisplayText size="small" />
                                <div className="number_of_skeleton_content">
                                <SkeletonDisplayText size="small" />
                                <SkeletonBodyText lines={2}/>
                                </div>
                                </div>
                            </TextContainer>
                        </LegacyCard>
                    </Layout.Section>
                </Layout>
                </div>
            </Page>
        </div>
    )
}

export default VirtualTryOnSkelton
