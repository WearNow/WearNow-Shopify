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
function SettingsSkeleton() {
    return (
        <div className='virtual_try_on_skeleton_container desktop_view_skeleton'>
            <Page fullWidth>
                <HeaderDesktopViewSkeleton />
                <HeaderMobileViewSkeleton />
                <Layout>
                    <Layout.Section>
                        <LegacyCard sectioned>
                            <SkeletonBodyText />
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="settings_title_skeleton_content">
                                <div className="settings_title_skeleton">
                                    <SkeletonDisplayText size="small" />
                                    <SkeletonBodyText lines={1}/>
                                </div>
                                {/* <SkeletonDisplayText size="small" /> */}
                                </div>
                            </TextContainer>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="settings_title_skeleton_content">
                                <div className="settings_title_skeleton">
                                <SkeletonBodyText lines={1}/>
                                </div>
                                <SkeletonDisplayText size="small" />
                                </div>
                            </TextContainer>
                        </LegacyCard>
                        <LegacyCard sectioned>
                            <TextContainer>
                                <div className="settings_title_skeleton_content">
                                <div className="settings_title_skeleton">
                                   <SkeletonBodyText lines={1}/>
                                </div>
                                <SkeletonDisplayText size="small" />
                                </div>
                            </TextContainer>
                        </LegacyCard>
                    </Layout.Section>
                    
                </Layout>
            </Page>
        </div>
    )
}

export default SettingsSkeleton
