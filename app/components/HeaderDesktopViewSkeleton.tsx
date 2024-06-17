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
function HeaderDesktopViewSkeleton() {
    return (
        <div className='header_desktop_view_skeleton'>
            <div style={{ marginBottom: "20px" }}>
                <Layout>
                    <Layout.Section>
                        <LegacyCard sectioned>
                            <div className="header_skelton">
                                <SkeletonTabs count={5} />
                                <SkeletonTabs count={1} />
                            </div>
                        </LegacyCard>
                    </Layout.Section>
                </Layout>
            </div>
        </div>
    )
}

export default HeaderDesktopViewSkeleton
