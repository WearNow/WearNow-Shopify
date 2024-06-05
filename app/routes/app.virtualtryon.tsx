import DashboardHeader from "~/components/DashboardHeader";
import MultipleSearchSelection from "~/components/MultipleSearchSelection";
import { useActionData, useLoaderData, useNavigate } from "@remix-run/react";
import SidebarNavigation from "~/components/SidebarNavigation";
import { Select } from '@shopify/polaris';
import { useState, useCallback, useEffect, useMemo } from 'react';
import client from "../services/ApolloClient";
import gql from "graphql-tag";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import {LegacyStack, Tag, Autocomplete,Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const admin1 = await authenticate.admin(request);
    const { admin } = await authenticate.admin(request);
    const { shop } = admin1.session ?? null;
    let packages:any =[];    
      await client
        .query({
          query: gql`
              query MyQuery5 {
            packages(limit: 10,order_by: {price: asc}) {
              created_at
              customized_models
              cycle
              description
              hd_photos
              name
              number_of_products
              price
              pro_models
              product_photo_limit
              strike_amount
              support_text
              uuid
              vto_limit
            }
          }`,
          fetchPolicy: "network-only",
        })
        .then((result) => {
          packages = result.data.packages;
        });
  
        let auth_session={};
        await client
        .query({
          query: gql`
            query MyQuery2($shop: String!) {
              session(limit: 10, where: {shop_id: {_eq: $shop}}) {
                accessToken
                shop_id
                state
                scope
                isOnline
                expires
                store {
                  name
                  store_id
                  onboarding_status
                  uuid
                  virtual_enabled
                }
                store_id
                uuid
              }
            }
          `,
          fetchPolicy: "network-only",
          variables: {
            shop: shop,
          },
        })
        .then((result) => {
          auth_session=result?.data.session[0] ?? result?.data.session;
          //console.log(result.data.session, "apollo client");
        });

          return auth_session;
};
  

export default function VirtualTryOnPage() {
    const sessionData = useLoaderData<typeof loader>();
    const [selectedSelfie, setSelectedSelfie] = useState<number>(1);
    const [selectedResolution, setSelectedResolution] = useState<string>("Standard Definition");
    const [selectedWaterMark, setSelectedWaterMark] = useState<boolean>(false);
    const [models, setModels] = useState<any>();
    const [backgrounds, setBackgrounds] = useState<any>();
    const [poses, setPoses] = useState<any>();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [selectedOptionsPose, setSelectedOptionsPose] = useState<string[]>([]);
    const deselectedOptions = useMemo(
        () =>{
            const opt: any[]=[];
            const backb: any[] | ((prevState: string[]) => string[])=[];
            backgrounds?.map((back:any)=>{
                var backg={value:back.uuid,label:back.name}
                opt.push(backg);
                if(back.featured==true){
                backb.push(back.uuid);
                }
            })
            setSelectedOptions(backb);
            console.log(selectedOptions,"selectedOptionsselectedOptionsselectedOptionsselectedOptions");
            return opt;
            },
        [backgrounds],
      );
      const deselectedOptionsPose = useMemo(
        () =>{
            const opt: any[]=[];
            const posep: any[] | ((prevState: string[]) => string[])=[];
            poses?.map((pp:any)=>{
                var ppp={value:pp.uuid,label:pp.name}
                opt.push(ppp);
                if(pp.featured==true){
                    posep.push(pp.uuid);
                   
                    }
            })
            setSelectedOptionsPose(posep);
            return opt;
            },
        [poses],
      );
    
    
    const [inputValue, setInputValue] = useState('');
    const [inputValuePose, setInputValuePose] = useState('');
    const [options, setOptions] = useState(deselectedOptions);
    const [optionsPose, setOptionsPose] = useState(deselectedOptionsPose);

    useEffect(() =>{
        setOptions(deselectedOptions);
        setOptionsPose(deselectedOptionsPose);
    },[deselectedOptions, deselectedOptionsPose]);
    const updateText = useCallback(
        (value: string) => {
          setInputValue(value);
    
          if (value === '') {
            setOptions(deselectedOptions);
            return;
          }
    
          const filterRegex = new RegExp(value, 'i');
          const resultOptions = deselectedOptions.filter((option) =>
            option.label.match(filterRegex),
          );
    
          setOptions(resultOptions);
        },
        [deselectedOptions],
      );
      const updateTextPose = useCallback(
        (value: string) => {
          setInputValuePose(value);
    
          if (value === '') {
            setOptionsPose(deselectedOptionsPose);
            return;
          }
    
          const filterRegex = new RegExp(value, 'i');
          const resultOptions = deselectedOptionsPose.filter((option) =>
            option.label.match(filterRegex),
          );
    
          setOptionsPose(resultOptions);
        },
        [deselectedOptionsPose],
      );
    
      const removeTag = useCallback(
        (tag: string) => async() => {
          const options = [...selectedOptions];
          options.splice(options.indexOf(tag), 1);
          setSelectedOptions(options);
          const Update_background = gql` mutation ($uuid:uuid!){
            update_default_background(where: {uuid: {_eq: $uuid}}, _set: {featured: false}) {
             returning {
               name
               uuid
             }
           }
          }`;

        const result = await client.mutate({
            mutation: Update_background,
            variables: {
                uuid: tag,
            },
        });
        console.log(result,"Featured background updated");
        },
        [selectedOptions],
      );
      const handleSelect = async(selected:string[]) => {
        console.log(selected,"selected");
        if (selected.length <= 3) {
            setSelectedOptions(selected);
            const Update_background = gql` mutation ($uuid:[uuid!]){
                update_default_background(where: {uuid: {_in: $uuid}}, _set: {featured: true, active: true}) {
                 returning {
                   name
                   uuid
                 }
               }
              }`;
        
            const result = await client.mutate({
                mutation: Update_background,
                variables: {
                    uuid: selected,
                },
            });
            console.log(result,"Featured background updated");
        }
    };
    const handleSelectPose = async(selected:string[]) => {
        if(selected.length <=3){
            setSelectedOptionsPose(selected);
            const Update_pose = gql` mutation ($uuid:[uuid!]){
                update_default_pose(where: {uuid: {_in: $uuid}}, _set: {featured: true, active: true}) {
                 returning {
                   name
                   uuid
                 }
               }
              }`;
        
            const result = await client.mutate({
                mutation: Update_pose,
                variables: {
                    uuid: selected,
                },
            });
            console.log(result,"Featured background updated");
        }
    }

      const removeTagPose = useCallback(
        (tag: string) => async() => {
            console.log("tag: " , tag);
          const optionsPose = [...selectedOptionsPose];
          optionsPose.splice(optionsPose.indexOf(tag), 1);
          setSelectedOptionsPose(optionsPose);
          const Update_pose = gql` mutation ($uuid:uuid!){
            update_default_pose(where: {uuid: {_eq: $uuid}}, _set: {featured: false}) {
             returning {
               name
               uuid
             }
           }
          }`;

        const result = await client.mutate({
            mutation: Update_pose,
            variables: {
                uuid: tag,
            },
        });
        console.log(result,"Featured background updated");
        },
        [selectedOptionsPose],
      );
    
      const verticalContentMarkup =
        selectedOptions.length > 0 ? (
          <LegacyStack spacing="extraTight" alignment="center">
            {selectedOptions?.map((option) => {
              let tagLabel = '';
              tagLabel = option.replace('_', ' ');
              tagLabel = titleCase(tagLabel);
              return (
                <Tag key={`option${option}`} onRemove={removeTag(option)}>
                  {tagLabel}
                </Tag>
              );
            })}
          </LegacyStack>
        ) : null;

        const verticalContentMarkupPose =
        selectedOptionsPose.length > 0 ? (
          <LegacyStack spacing="extraTight" alignment="center">
            {selectedOptionsPose?.map((option) => {
              let tagLabel = '';
              tagLabel = option.replace('_', ' ');
              tagLabel = titleCase(tagLabel);
              return (
                <Tag key={`option${option}`} onRemove={removeTagPose(option)}>
                  {tagLabel}
                </Tag>
              );
            })}
          </LegacyStack>
        ) : null;
    
      const textField = (
        <Autocomplete.TextField
          onChange={updateText}
          label="Background"
          value={inputValue}
          prefix={<Icon source={SearchIcon} tone="base" />}
          placeholder="Select Background"
          verticalContent={verticalContentMarkup}
          autoComplete="off"
        />
      );
    
      const textFieldPose = (
        <Autocomplete.TextField
          onChange={updateTextPose}
          label="Pose"
          value={inputValuePose}
          prefix={<Icon source={SearchIcon} tone="base" />}
          placeholder="Select Pose"
          verticalContent={verticalContentMarkupPose}
          autoComplete="off"
        />
      );
    

    const store_setting = async()=>{
       const store_setting=gql`query MyQuery8 ($uuid:uuid) {
            store_setting(where: {store_id: {_eq: $uuid}}) {
              uuid
              tryon_resolution
              tryon_per_product
              store_id
              selfies_count_per_user
              remove_watermark
              enable_button
              created_at
            }
          }`;
          const result = await client.query({
            query: store_setting,
            variables: {
                uuid: sessionData?.store_id
            },
        });
        if(result.data.store_setting.length == 0){
            const insert_store_setting=gql`mutation MyMutation13 ($tryon_resolution:String,$uuid:uuid,$selfies_count_per_user:bigint){
                insert_store_setting(objects: {tryon_resolution: $tryon_resolution, tryon_per_product: 0, store_id: $uuid, selfies_count_per_user: $selfies_count_per_user, remove_watermark: false,enable_button: false}) {
                  returning {
                    tryon_resolution
                    tryon_per_product
                    selfies_count_per_user
                    remove_watermark
                  }
                }
              }`;
              const insert = await client.mutate({
                mutation: insert_store_setting,
                variables: {
                    tryon_resolution:selectedResolution,
                    selfies_count_per_user:selectedSelfie,
                    uuid: sessionData?.store_id
                },
            });
        }
        else{
            setSelectedSelfie(result.data.store_setting[0].selfies_count_per_user);
            setSelectedResolution(result.data.store_setting[0].tryon_resolution);
            setSelectedWaterMark(result.data.store_setting[0].remove_watermark);
        }
        console.log(result,"query for store_setting");
    }
    async function getAllImages() {
        await client
          .query({
            query: gql`
          query MyQuery4 {
            default_pose(limit: 50) {
              name
              image
              featured
              active
              created_at
              uuid
            }
            default_background(limit: 50) {
              active
              created_at
              featured
              image
              name
              uuid
            }
            pretrained_models(limit: 50) {
              cover_image
              created_at
              description
              featured
              name
              uuid
            }
          }`
          })
          .then((result) => {
    
            console.log("Result images: model,background,pose :::", result);
            setModels(result.data.pretrained_models);
            setBackgrounds(result.data.default_background);
            setPoses(result.data.default_pose);
          });
      }
    useEffect(() => {
        store_setting();
        getAllImages();
    },[]);
    
    const handleSelfies = useCallback(async(value: number) =>{
        setSelectedSelfie(value);
        const Update_store = gql` mutation ($selfies_count_per_user:bigint,$uuid:uuid){
            update_store_setting(where:{
              store_id:{_eq:$uuid}
            },_set:{
              selfies_count_per_user:$selfies_count_per_user
            }){
              affected_rows
            }
          }`;
    
        const result = await client.mutate({
            mutation: Update_store,
            variables: {
                selfies_count_per_user: value,
                uuid: sessionData?.store_id
            },
        });
        console.log(result);
    },[]);
    const handleResolution = useCallback(async(value: string) =>{
        setSelectedResolution(value);
        const Update_store = gql` mutation ($tryon_resolution:String!,$uuid:uuid!){
            update_store_setting(where:{
              store_id:{_eq:$uuid}
            },_set:{
                tryon_resolution:$tryon_resolution
            }){
              affected_rows
            }
          }`;
    
        const result = await client.mutate({
            mutation: Update_store,
            variables: {
                tryon_resolution: value,
                uuid: sessionData?.store_id
            },
        });
        console.log(result);
    },[]);
    const handleWaterMark = useCallback(async(value: boolean) =>{
        setSelectedWaterMark(value);
        const Update_store = gql` mutation ($remove_watermark:Boolean!,$uuid:uuid!){
            update_store_setting(where:{
              store_id:{_eq:$uuid}
            },_set:{
                remove_watermark:$remove_watermark
            }){
              affected_rows
            }
          }`;
    
        const result = await client.mutate({
            mutation: Update_store,
            variables: {
                remove_watermark: value,
                uuid: sessionData?.store_id
            },
        });
        console.log(result);
    },[]);

    const optiondata1 =useMemo(
        () => [
        { label: '1 Selfies', value: "1" },
        { label: '2 Selfies', value: "2" },
        { label: '3 Selfies', value: "3" },
        { label: '4 Selfies', value: "4" },
    ],[]);
    const optiondata2 = useMemo(
        () =>[
        { label: 'Standard Definition', value: 'Standard Definition' },
        { label: 'HD', value: 'HD' },
    ],[]);
    const optiondata3 = useMemo(
        () =>[
        { label: 'No', value: "false" },
        { label: 'Yes', value: "true" },
    ],[]);
    return (
        <>
            <DashboardHeader />
            <SidebarNavigation />
            <div className="vartualtryon_container mt-20 pppp">
                <div className="vartualtryon_row" style={{ borderBottom: "1px solid var(--Colors-Border-border-secondary, #EAECF0)", paddingBottom: "30px" }}>
                    <div className=' flex w-full flex-col gap-[20px] items-start flex-nowrap relative mx-auto my-0'>
                        <div className='flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative'>
                            <div className='flex flex-col gap-[4px] justify-center items-start self-stretch grow shrink-0 basis-0 flex-nowrap relative'>
                                <span className="h-[27px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[18px] font-semibold leading-[27px] text-[#101828] relative text-left  ">
                                    Feature Settings
                                </span>
                                <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left overflow-hidden  z-[3]">
                                    Enable key features to enhance the try-on experience for your users
                                </span>
                            </div>
                        </div>
                        <div className='h-px self-stretch shrink-0 bg-[url(../assets/images/4b39ca50-ffd0-414b-a544-e51db0238030.png)] bg-cover bg-no-repeat relative z-[4]' />
                    </div>
                </div>
                <div className="vto_border" style={{ borderBottom: "1px solid var(--Colors-Border-border-secondary, #EAECF0)", paddingBottom: "30px" }}>
                    <div className=' flex w-[890px] vto_page gap-[32px] items-start flex-wrap relative  my-0 mt-10'>
                        <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                            <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                                Number of selfies uploaded by user
                            </span>
                        </div>
                        <div className='flex w-[512px] vto_page flex-col gap-[16px] items-end flex-nowrap relative '>
                            <div className='flex gap-[16px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
                                <div className='flex flex-col gap-[6px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[4]'>
                                    <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                                        <div className='w-full flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative '>
                                            <div className='select_option_polaries flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[8]'>
                                                <Select
                                                    label=""
                                                    options={optiondata1}
                                                    onChange={handleSelfies}
                                                    value={""+selectedSelfie}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <span className="flex w-[512px] vto_page h-[36px] justify-start items-start self-stretch shrink-0 font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475467] relative text-left z-[14]">
                                        More photos will increase the resemblance of the final output but
                                        may take longer to create
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vto_border" style={{ borderBottom: "1px solid var(--Colors-Border-border-secondary, #EAECF0)", paddingBottom: "30px" }}>
                    <div className=' flex w-[890px] vto_page gap-[32px] items-start flex-wrap relative my-0 mt-10'>
                        <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                            <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                                Resolution of created photos
                            </span>
                        </div>
                        <div className='flex w-[512px] vto_page flex-col gap-[6px] items-start flex-nowrap relative '>
                            <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative overflow-hidden z-[3]'>
                                <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff] relative'>
                                    <div className='w-full flex pt-[10px] pb-[10px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[5]'>
                                        <div className='select_option_polaries flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative z-[6]'>
                                            <Select
                                                label=""
                                                options={optiondata2}
                                                onChange={handleResolution}
                                                value={selectedResolution}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475467] relative text-left  z-[12]">
                                HD photos are only available on our Pro and Unlimited plans
                            </span>
                        </div>
                    </div>
                </div>
                <div className="vto_border" style={{ borderBottom: "1px solid var(--Colors-Border-border-secondary, #EAECF0)", paddingBottom: "30px" }}>
                    <div className=' flex w-[890px] vto_page gap-[32px] items-start flex-wrap relative my-0 mt-10'>
                        <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                            <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                                Remove WearNow watermark
                            </span>
                        </div>
                        <div className='flex w-[512px] vto_page flex-col gap-[6px] items-start flex-nowrap relative '>
                            <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[3]'>
                                <div className='flex items-start self-stretch shrink-0 flex-nowrap bg-[#fff]  relative  z-[4]'>
                                    <div className='flex pt-[10px] pb-[10px] gap-[8px] items-center grow shrink-0 basis-0 flex-nowrap relative z-[5]'>
                                        <div className='select_option_polaries flex gap-[8px] items-start grow shrink-0 basis-0 flex-nowrap relative overflow-hidden z-[6]'>
                                            <Select
                                                label=""
                                                options={optiondata3}
                                                onChange={handleWaterMark}
                                                value={""+selectedWaterMark}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left  z-[12]">
                                Photos created during your free trial are watermarked by default
                            </span>
                        </div>
                    </div>
                </div>
                <div className="vto_border" style={{ borderBottom: "1px solid var(--Colors-Border-border-secondary, #EAECF0)", paddingBottom: "30px" }}>
                    <div className='flex w-[853px] vto_page gap-[32px] items-start flex-wrap relative  my-0 mt-10'>
                        <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                            <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                                Choose default pose for photos
                            </span>
                        </div>
                        <div className='flex w-[480px] vto_page flex-col gap-[8px] items-start flex-nowrap relative '>
                            
                            <Autocomplete
                                    allowMultiple
                                    options={optionsPose}
                                    selected={selectedOptionsPose}
                                    textField={textFieldPose}
                                    onSelect={handleSelectPose}
                                    listTitle="Suggested Pose"
                                />
                            <span className="h-[20px] self-stretch shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left  ">
                                Depending on the number of photos created, poses will be randomised
                            </span>
                        </div>
                    </div>
                </div>
                <div className="vto_border" style={{ borderBottom: "0px solid var(--Colors-Border-border-secondary, #EAECF0)", paddingBottom: "30px" }}>
                    <div className=' flex w-[853px] vto_page gap-[32px] items-start flex-wrap relative my-0 mt-10 mb-10'>
                        <div className='flex flex-col items-start grow basis-0 flex-nowrap relative'>
                            <span className="h-[18px] self-stretch shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-semibold leading-[17.5px] text-[#344054] relative text-left ">
                                Choose default background for photos
                            </span>
                        </div>
                        <div className='flex w-[480px] vto_page flex-col gap-[8px] items-start flex-nowrap relative '>
                        <Autocomplete
                                allowMultiple
                                options={options}
                                selected={selectedOptions}
                                textField={textField}
                                onSelect={handleSelect}
                                listTitle="Suggested Background"
                            />
                            <span className="flex w-[480px] vto_page h-[40px] justify-start items-start self-stretch shrink-0 font-['Inter'] text-[14px] font-normal leading-[20px] text-[#475467] relative text-left ">
                                Depending on the number of photos created, backgrounds will be
                                randomised
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
    function titleCase(string: string) {
        return string
          .toLowerCase()
          .split(' ')
          .map((word) => word.replace(word[0], word[0].toUpperCase()))
          .join('');
      }
}
