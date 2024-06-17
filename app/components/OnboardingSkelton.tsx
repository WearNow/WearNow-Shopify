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
function OnboardingSkelton() {
    return (
        <>
            <Page fullWidth>
                <Layout>
                    <Layout.Section variant="oneThird">
                        <LegacyCard.Section>
                            <TextContainer>
                                <SkeletonDisplayText size="small" />
                                <div className="onboarding_step_skelton">
                                    <SkeletonBodyText lines={1} />
                                    <SkeletonBodyText lines={1} />
                                </div>
                            </TextContainer>
                        </LegacyCard.Section>
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
        </>
    )
}

export default OnboardingSkelton
