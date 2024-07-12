import React, { useState, useEffect, useCallback } from "react";
import { Link } from "@remix-run/react";
import CustomSlider from "./CustomSilder";
import SelectOnboarding from "./SelectOnboarding";
import SelectedOnbording from "./SelectedOnbording";
import FadedOnboarding from "./FadedOnboarding";
import client from "../services/ApolloClient";
import gql from "graphql-tag";
import { Checkbox, Select, Spinner } from '@shopify/polaris';

const SecondHeader: React.FC<{ sessionData: any, onActivate: any }> = ({ sessionData, onActivate }) => {

  const [products, setProducts] = useState<any[]>([]);
  const [dataLimit, setDataLimit] = useState({ start: 0, end: 3 });
  const [checkedProduct, setCheckedProduct] = useState<string>();
  const [models, setModels] = useState<any>();
  const [backgrounds, setBackgrounds] = useState<any>();
  const [poses, setPoses] = useState<any>();
  const [model, setModel] = useState<string>();
  const [modelName, setModelName] = useState<string>("");
  const [background, setBackground] = useState<string>();
  const [pose, setPose] = useState<string>();
  const [tmpModel, setTmpModel] = useState<string>();
  const [tmpBackground, setTmpBackground] = useState<string>();
  const [tmpPose, setTmpPose] = useState<string>();
  const [stylehide, setStylehide] = useState({ opacity: 0.3, pointerEvents: "none" });
  const [currentStep, setCurrentStep] = useState(1);
  const [active, setActive] = useState();
  const [save, setSave] = useState<string>("yes");
  const [loader, setLoader] = useState("no");
  const stepModel = "02";
  const textModel = "Select a Model";
  const stepBackground = "03";
  const textBackground = "Select a Background";
  const stepPose = "04";
  const textPose = "Select a Pose";
  const images: string[] = [
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img2.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img1.png?v=1713943107",
    "https://cdn.shopify.com/s/files/1/0843/1642/2421/files/onboardin_img3.png?v=1713943106",
  ];
  const [selected, setSelected] = useState('1');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const getPosesByModel = async (name: string) => {
    const GET_POSES_BY_MODEL = gql`query getPosesByModel($name: String) {
      pretrained_models(where: {name: {_eq: $name}}, limit: 3) {
        uuid
        cover_image
        name
        featured
      }
    }
    `
    const { data, errors } = await client.query({
      query: GET_POSES_BY_MODEL,
      variables: { name }
    })
    if (errors?.length! > 0) {
      console!.log("errors: ", errors)
      throw Error(`Error getting model poses: ${e}`)
    }
    return data
  }
  useEffect(() => {
    const MyMutationn = gql`
    mutation MyMutation3 ($photo_per_product:String!,$uuid:uuid!){
        update_stores(where: {uuid: {_eq: $uuid}}, _set: {photo_per_product: $photo_per_product}) {
          returning {
            store_id
            uuid
            name
            virtual_enabled
          }
        }
      }
   `;

    const result = client.mutate({
      mutation: MyMutationn,
      variables: {
        photo_per_product: selected,
        uuid: sessionData.authWithShop.store_id
      },
    });

    console.log('Mutation result:', result);
  }, [selected])

  useEffect(() => {
    client
      .query({
        query: gql`
         query MyQuery6($store_id:uuid) {
         store_subscription(where: {store_id: {_eq: $store_id},status:{_eq:"active"}}) {
           store {
             name
             uuid
           }
           package {
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
           status
           created_at
         }
       }`,
        fetchPolicy: "network-only",
        variables: {
          store_id: sessionData?.store_id,
        }
      })
      .then((result) => {
        let store_subscription = result.data.store_subscription;

        let planname = sessionData?.authWithShop?.planShop?.shop?.plan_name;

        if (planname == "partner_test") {
          // Clone the package object to avoid modifying the read-only properties
          let newPackage = {
            ...store_subscription[0].package,
            number_of_products: 500,
            pro_models: 500,
            product_photo_limit: 500,
            vto_limit: 500
          };

          // Clone the store_subscription array and replace the package in the cloned object
          let newStoreSubscription = [...store_subscription];
          newStoreSubscription[0] = {
            ...newStoreSubscription[0],
            package: newPackage
          };

          // Update the original store_subscription variable with the modified array
          store_subscription = newStoreSubscription;
        }

        console.log(store_subscription[0].package, "store_subscription[0].package");

        // Set the active package to the updated one
        setActive(store_subscription[0].package);
      });
  }, []);
  async function getAllImages() {
    await client
      .query({
        query: gql`
      query MyQuery4 {
        default_pose(where:{featured: {_eq: true}},limit: 3) {
          name
          image
          featured
          active
          created_at
          uuid
        }
        default_background(where:{featured: {_eq: true}},limit: 3) {
          active
          created_at
          featured
          image
          name
          uuid
        }
        pretrained_models(where:{featured: {_eq: true}},limit: 3) {
          cover_image
          created_at
          description
          featured
          name
          uuid
        }
      }`,
        variables: {
          storeid: sessionData.authWithShop.store_id,
        },
      })
      .then((result) => {

        console.log("Result images: model,background,pose :::", result);
        setModels(result.data.pretrained_models);
        setBackgrounds(result.data.default_background);
        // setPoses(result.data.default_pose);
      });
  }
  useEffect(() => {
    getAllImages();


  }, []);
  const fetchProducts = async () => {

    await client
      .query({
        query: gql`
    query MyQuery3($storeid: uuid!) {
    store_products(limit: 50, where: {store_id: {_eq: $storeid}}) {
      store_id
      title
      uuid
      variant_id
      product_id
      images
      price
      sku
    }
  }
  `,
        variables: {
          storeid: sessionData.authWithShop.store_id,
        },
      })
      .then((result) => {
        var store_products = result.data.store_products;
        // Map over store_products to create a new array with the added 'image' property
        const updatedStoreProducts = store_products.map((sp: any, index: number) => {
          // Assuming sp.images is already a JSON string that needs to be parsed
          let images = sp.images.replace("[{'url': '", '');
          images = images.replace("'}]", '');
          console.log("images: :::", images);
          return {
            ...sp, // Spread the existing properties of the product
            image: images // Add the new image property
          };
        });

        setProducts(updatedStoreProducts);
        console.log("apollo client store id: :::", updatedStoreProducts);
      });


  };
  useEffect(() => {
    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, []);

  console.log(products, "Second Header products");

  const handleCheckboxChange = (productId: string) => {
    console.log(productId, ":::::is the product checked");
    setCheckedProduct(productId);
    if (pose) {
      setStylehide({ opacity: 1, pointerEvents: "unset" });
    }
  };
  const handlePrev = () => {
    if (dataLimit.start > 0) {
      setDataLimit(prevLimit => ({
        start: prevLimit.start - 3,
        end: prevLimit.end - 3
      }));
    }
  };

  const handleNext = () => {
    if (dataLimit.end < products.length) {
      setDataLimit(prevLimit => ({
        start: prevLimit.start + 3,
        end: prevLimit.end + 3
      }));
    }
  };
  const handleSelection = async (id: string, type: string) => {
    console.log("handleSelection ::", id, type);
    switch (type) {
      case 'model':
        setModel(id);
        setModelName(models.filter((m: any) => id == m.uuid)[0].name)
        setCurrentStep(2);
        if (pose) {
          setStylehide({ opacity: 1, pointerEvents: "unset" });
        }
        break;
      case 'background':
        setBackground(id);
        setCurrentStep(3);
        if (pose) {
          setStylehide({ opacity: 1, pointerEvents: "unset" });
        }
        break;
      case 'pose':
        setCurrentStep(4);
        setPose(id);
        console.log("setting pose: ", id)
        setStylehide({ opacity: 1, pointerEvents: "unset" });
        break;
    }

    console.log("model id: " + id)
  };
  const handleButtonNext = async () => {
    if (checkedProduct && currentStep == 1) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    }
    if (model && currentStep == 2) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      }
    }
    if (background && currentStep == 3) {
      if (currentStep < 4) {
        const related_poses = await getPosesByModel(modelName)
        setPoses(related_poses.pretrained_models)
        setCurrentStep(currentStep + 1)
        console.log("poses linked: ", related_poses)
      }
    }

    if (tmpModel) { setModel(tmpModel); setModelName(models.filter((m: any) => tmpModel == m.uuid)[0].name) }
    if (tmpPose) { setPose(tmpPose); }
    if (tmpBackground) { setBackground(tmpBackground); }
    if (pose) {
      setStylehide({ opacity: 1, pointerEvents: "unset" });
    }
  }

  const handleEdit = (step: string) => {
    switch (step) {
      case '01':
        setCurrentStep(1);
        if (tmpModel) {
          setModel(tmpModel); setModelName(models.filter((m: any) => tmpModel == m.uuid)[0].name)
        }
        if (tmpPose) { setPose(tmpPose); }
        if (tmpBackground) { setBackground(tmpBackground); }
        setStylehide({ opacity: 0.3, pointerEvents: "none" });
        break;
      case '02':
        console.log("we are in second step", model);
        setTmpModel(model);
        setModel(undefined);
        if (tmpPose) { setPose(tmpPose); }
        if (tmpBackground) { setBackground(tmpBackground); }
        setCurrentStep(2);
        setStylehide({ opacity: 0.3, pointerEvents: "none" });
        break;
      case '03':
        console.log("we are in third step", background);
        setTmpBackground(background);
        setBackground(undefined);
        if (tmpModel) { setModel(tmpModel); setModelName(models.filter((m: any) => tmpModel == m.uuid)[0].name) }
        if (tmpPose) { setPose(tmpPose); }
        setCurrentStep(3);
        setStylehide({ opacity: 0.3, pointerEvents: "none" });
        break;
      case '04':
        console.log("we are in forth step", pose);
        setTmpPose(pose);
        setPose(undefined);
        if (tmpModel) { setModel(tmpModel); setModelName(models.filter((m: any) => tmpModel == m.uuid)[0].name) }
        if (tmpBackground) { setBackground(tmpBackground); }
        setCurrentStep(4);
        setStylehide({ opacity: 0.3, pointerEvents: "none" });
        break;
    }
  };
  const handleSave = async () => {
    setLoader("yes");
    let count = 0;
    const query = gql`query MyQuery7 ($storeID:uuid!) {
      store_products_aggregate(limit: 10, where: {store_id: {_eq: $storeID}}) {
        aggregate {
          count(columns: product_id)
        }
      }
    }`;
    try {
      const result = await client.query({
        query: query,
        variables: {
          storeID: sessionData.authWithShop.store_id,
        },
      });

      console.log('Mutation result:', result);
      count = result?.data?.store_products_aggregate?.aggregate?.count ? result?.data?.store_products_aggregate?.aggregate?.count : 0;
    } catch (error) {
      console.error('Error executing mutation:', error);
    }
    if (!active?.product_photo_limit || active?.product_photo_limit >= count) {
      const MyMutation = gql`
    mutation MyMutation($background: String!, $model: String!, $pose: String!, $store_id: String!, $productId: String!){
      generateSingleStoreProduct(input:{
        background:$background,
        model:$model,
        pose:$pose,
        store_id:$store_id,
        store_product_id: $productId
      }){
        success
        tracking
      }
    } `;

      try {
        const result = await client.mutate({
          mutation: MyMutation,
          variables: {
            background: background,
            model: model,
            pose: pose,
            store_id: sessionData.authWithShop.store_id,
            productId: checkedProduct
          },
        });
        setSave("saved");
        console.log('Mutation result:', result);

      } catch (error) {
        console.error('Error executing mutation:', error);
      }
    }

  }
  console.log(currentStep);
  const options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
  ];
  return (
    <div className="self-stretch second_header">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className='flex flex-col w-6/12 max-md:ml-0 max-md:w-full'>
          <div className='flex w-full flex-col gap-[16px] items-start shrink-0 flex-nowrap relative z-[1]'>
            <span className="virtual_try_on_title h-[45px]  font-['SF_Pro_Display'] text-[36px] font-medium leading-[45px] text-[#1d2127] relative text-left  z-[2]">
              Create Your First Product Photo
            </span>
            <span className="flex w-full h-full justify-start items-start font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#52575d] relative text-left z-[3]">
              Take your product photos to the next level in just 4 easy steps!
            </span>
          </div>


          <div className='flex  flex-col items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
            {currentStep == 1 && (
              <>
                <div className='flex pt-[8px] pr-0 pb-[8px] pl-0 flex-col gap-[24px] justify-center items-start self-stretch shrink-0 flex-nowrap relative z-[5]'>
                  <div className='after_border flex w-full  flex-col items-start shrink-0 flex-nowrap rounded-[12px]  top-[56px] left-[48px]  z-[14]'>
                    <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[15]'>
                      <div className='flex w-full flex-col items-start grow shrink-0 basis-0 flex-nowrap relative z-[44]'>
                        <div className='flex w-[188px] gap-[12px] items-center shrink-0 flex-nowrap relative z-[8]'>
                          <button className='flex w-[36px] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#fff] rounded-[100px] border-dashed border border-[#000] relative overflow-hidden z-[9] pointer'>
                            <span className="flex w-[17px] h-[20px] justify-center items-start shrink-0 basis-auto font-['SF_Pro'] text-[14px] font-bold leading-[20px] text-[#141718] relative text-center whitespace-nowrap z-10">
                              01
                            </span>
                          </button>
                          <span className="h-[30px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[20px] font-medium leading-[30px] text-[rgba(0,0,0)] relative text-left whitespace-nowrap z-[11]">
                            Select 1 Product
                          </span>
                        </div>
                        <div style={{ position: "relative", left: "50px", top: "22px", width: "calc(100% - 50px)" }} className="border_onboarding">

                          {products.slice(dataLimit.start, dataLimit.end).map((product, index) => (
                            <>
                              <div key={product.uuid} className='flex gap-3 pr-[8px]  pl-[0px] items-center self-stretch shrink-0  flex-nowrap bg-[#fff] border-solid border-t border-t-[#ebebeb] relative overflow-hidden z-[45]'>
                                <div className='flex w-[29px] pt-[18px]  pb-[18px] pl-[12px] items-center shrink-0 flex-nowrap bg-[#fff]   relative  z-[29]'>
                                  <div className='flex w-[16px] flex-col justify-center items-start shrink-0 flex-nowrap relative z-30'>
                                    <div className='flex w-[16px] gap-[8px] items-center shrink-0 flex-nowrap relative z-[31]'>
                                      <div className='flex w-[16px] gap-[8px] items-start shrink-0 flex-nowrap rounded-[4px] relative z-[32]'>

                                        <Checkbox
                                          label=""
                                          checked={checkedProduct == product.uuid ? true : false} // Check if the product is checked
                                          onChange={() => handleCheckboxChange(product.uuid)} // Handle checkbox change
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className='w-[40px] h-[40px] shrink-0  bg-cover bg-no-repeat relative z-[43]' >
                                  <img height="100%" width="100%"
                                    src={product.image != undefined ? product.image + "&height=40" : ''}
                                  />
                                </div>


                                <span className="h-[20px] grow shrink-0 basis-auto font-['Inter'] text-[13px] font-[550] leading-[20px] text-[#303030] relative text-left whitespace-nowrap z-[46]">
                                  {product.title}
                                </span>
                              </div>
                            </>
                          ))}
                          <div className='flex pt-[6px] pr-[8px] pb-[6px] pl-[12px] items-center self-stretch shrink-0 flex-nowrap bg-[#f7f7f7] relative z-[51]'>
                            <div className='flex justify-end items-center grow shrink-0 basis-0 flex-nowrap relative z-[52]'>
                              <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-[8px] rounded-tr-none rounded-br-none rounded-bl-[8px] relative z-[53]'>
                                <div className='w-[20px] h-[20px] shrink-0 relative z-[54]'>
                                  <div onClick={() => handlePrev()} className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronLeft.png?v=1714384767)] bg-cover bg-no-repeat relative z-[55]  mr-0 mb-0 ml-[6.5px]' />
                                </div>
                              </div>
                              <div className='flex w-[28px] pt-[4px] pr-[4px] pb-[4px] pl-[4px] items-start shrink-0 flex-nowrap rounded-tl-none rounded-tr-[8px] rounded-br-[8px] rounded-bl-none relative z-[56]'>
                                <div className='w-[20px] h-[20px] shrink-0 relative z-[57]'>
                                  <div onClick={() => handleNext()} className='w-[20px] h-[20px] bg-[url(https://cdn.shopify.com/s/files/1/0843/1642/2421/files/ChevronRight.png?v=1714384785)] bg-cover bg-no-repeat relative z-[58]  mr-0 mb-0 ml-[7.5px]' />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className='flex w-full h-full flex-col gap-[6px] items-start ' style={{ marginLeft: "50px", marginTop: "20px", width: "calc(100% - 50px)" }}>

                    <Select
                      label="Please select the number of photos you would like to create"
                      options={options}
                      onChange={handleSelectChange}
                      value={selected}
                    />

                    <span className="h-[18px] self-stretch font-['SF_Pro_Display'] text-[14px] font-normal leading-[17.5px] text-[#475466] relative text-left  z-[69]">
                      All the photos in a creation request will have very minor
                      changes between them
                    </span>
                  </div>
                </div>
                {!model ?
                  <FadedOnboarding step={stepModel} sectionText={textModel} />
                  :
                  <>
                    {models.filter((m: any) => model == m.uuid).map((m: any) => (
                      <SelectedOnbording save={save} step={stepModel} data={m.name} image={m.cover_image} handleEdit={handleEdit} />
                    ))}
                  </>
                }
                {!background ?
                  <FadedOnboarding step={stepBackground} sectionText={textBackground} />
                  :
                  <>
                    {backgrounds.filter((b: any) => background == b.uuid).map((b: any) => (
                      <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                    ))}
                  </>
                }
                {!pose ?
                  <FadedOnboarding step={stepPose} sectionText={textPose} />
                  :
                  <>
                    {poses.filter((p: any) => pose == p.uuid).map((p: any) => (
                      <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                    ))}
                  </>
                }


              </>
            )}
            {currentStep == 2 && (
              <>
                {products.filter((product: any) => checkedProduct?.includes(product.uuid)).map((product, index) => (

                  <SelectedOnbording save={save} step="01" value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} handleSelectChange={handleSelectChange} selected={selected} />
                ))}


                {!model ?
                  <SelectOnboarding step={stepModel} value={tmpModel} selectLoop={models} handleSelection={handleSelection} type='model' />
                  :
                  <>
                    {models.filter((m: any) => model == m.uuid).map((m: any) => (
                      <SelectedOnbording save={save} step={stepModel} data={m.name} image={m.cover_image} handleEdit={handleEdit} />
                    ))}
                  </>
                }
                {!background ?
                  <FadedOnboarding step={stepBackground} sectionText={textBackground} />
                  :
                  <>
                    {backgrounds.filter((b: any) => background == b.uuid).map((b: any) => (
                      <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                    ))}
                  </>
                }
                {!pose ?
                  <FadedOnboarding step={stepPose} sectionText={textPose} />
                  :
                  <>
                    {poses.filter((p: any) => pose == p.uuid).map((p: any) => (
                      <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                    ))}
                  </>
                }

              </>
            )}
            {currentStep == 3 && (
              <>
                {products.filter((product: any) => checkedProduct?.includes(product.uuid)).map((product, index) => (

                  <SelectedOnbording save={save} step="01" value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} handleSelectChange={handleSelectChange} selected={selected} />
                ))}



                {models.filter((m: any) => model == m.uuid).map((m: any) => (
                  <SelectedOnbording save={save} step={stepModel} data={m.name} image={m.cover_image} handleEdit={handleEdit} />
                ))}
                {!background ?
                  <SelectOnboarding step={stepBackground} value={tmpBackground} selectLoop={backgrounds} handleSelection={handleSelection} type='background' />
                  :
                  <>
                    {backgrounds.filter((b: any) => background == b.uuid).map((b: any) => (
                      <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                    ))}
                  </>
                }

                {!pose ?
                  <FadedOnboarding step={stepPose} sectionText={textPose} />
                  :
                  <>
                    {poses.filter((p: any) => pose == p.uuid).map((p: any) => (
                      <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.image} handleEdit={handleEdit} />
                    ))}
                  </>
                }

              </>
            )}
            {currentStep == 4 && (
              <>
                {products.filter((product: any) => checkedProduct?.includes(product.uuid)).map((product, index) => (

                  <SelectedOnbording save={save} step="01" value={checkedProduct} data={product.title} image={product.image} handleEdit={handleEdit} handleSelectChange={handleSelectChange} selected={selected} />
                ))}
                {model && background && !pose && (
                  <>
                    {models.filter((m: any) => model == m.uuid).map((m: any) => (
                      <SelectedOnbording save={save} step={stepModel} data={m.name} image={m.cover_image} handleEdit={handleEdit} />
                    ))}
                    {backgrounds.filter((b: any) => background == b.uuid).map((b: any) => (
                      <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                    ))}
                    <SelectOnboarding step={stepPose} value={tmpPose} selectLoop={poses} handleSelection={handleSelection} type='pose' />
                  </>
                )}
                {model && background && pose && (
                  <>
                    {models.filter((m: any) => model == m.uuid).map((m: any) => (
                      <SelectedOnbording save={save} step={stepModel} data={m.name} image={m.cover_image} handleEdit={handleEdit} />
                    ))}
                    {backgrounds.filter((b: any) => background == b.uuid).map((b: any) => (
                      <SelectedOnbording save={save} step={stepBackground} data={b.name} image={b.image} handleEdit={handleEdit} />
                    ))}
                    {poses.filter((p: any) => pose == p.uuid).map((p: any) => (
                      <SelectedOnbording save={save} step={stepPose} data={p.name} image={p.cover_image} handleEdit={handleEdit} />
                    ))}

                  </>
                )}
              </>
            )}









            <div className='flex  h-[44px] gap-[20px] items-start shrink-0 flex-nowrap  top-[535px] left-0 z-[82]' style={{ marginTop: "20px" }}>
              {stylehide.opacity != 1 ? (
                <button onClick={handleButtonNext} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer'>
                  <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                    <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left whitespace-nowrap z-[85]">
                      Next
                    </span>
                    <div className='w-[5px] h-[9px] shrink-0 relative z-[86]'>
                      <div className='w-[5.308px] h-[9px] bg-[url(../assets/images/91099684-9e2c-41ac-8500-9a0d3c52b427.png)] bg-[length:100%_100%] bg-no-repeat relative z-[87] mt-[0.5px] mr-0 mb-0 ml-0' />
                    </div>
                  </div>
                </button>
              ) : (
                <>
                  {save == "saved" ? (

                    <div className='flex w-full h-[102px] pt-[16px] pr-[16px] pb-[16px] pl-[16px] gap-[12px] items-center flex-nowrap bg-[#e8f6e9] rounded-[8px] mx-auto my-0'>
                      <div className='flex flex-col gap-[12px] items-start grow shrink-0 basis-0 flex-nowrap relative'>
                        <div className='flex flex-col gap-[6px] items-start self-stretch shrink-0 flex-nowrap relative z-[1]'>
                          <div className='flex gap-[8px] items-center self-stretch shrink-0 flex-nowrap relative z-[2]'>
                            <div className='w-[18px] h-[18px] shrink-0 relative overflow-hidden z-[3]'>
                              <div className='w-[15px] h-[15px] bg-no-repeat relative z-[4] mr-0 mb-0 ml-[1.5px]' >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
                                  <path d="M9 1.55664C7.51664 1.55664 6.06659 1.99651 4.83323 2.82062C3.59986 3.64473 2.63856 4.81607 2.07091 6.18651C1.50325 7.55696 1.35472 9.06496 1.64411 10.5198C1.9335 11.9747 2.64781 13.311 3.6967 14.3599C4.7456 15.4088 6.08197 16.1231 7.53683 16.4125C8.99168 16.7019 10.4997 16.5534 11.8701 15.9857C13.2406 15.4181 14.4119 14.4568 15.236 13.2234C16.0601 11.99 16.5 10.54 16.5 9.05664C16.4978 7.06819 15.7069 5.1618 14.3009 3.75575C12.8948 2.3497 10.9885 1.55882 9 1.55664ZM9 12.8066C8.85167 12.8066 8.70666 12.7627 8.58332 12.6802C8.45999 12.5978 8.36386 12.4807 8.30709 12.3436C8.25033 12.2066 8.23547 12.0558 8.26441 11.9103C8.29335 11.7648 8.36478 11.6312 8.46967 11.5263C8.57456 11.4214 8.7082 11.35 8.85368 11.321C8.99917 11.2921 9.14997 11.307 9.28701 11.3637C9.42406 11.4205 9.54119 11.5166 9.6236 11.64C9.70602 11.7633 9.75 11.9083 9.75 12.0566C9.75 12.2555 9.67098 12.4463 9.53033 12.587C9.38968 12.7276 9.19891 12.8066 9 12.8066ZM9.75 9.80664C9.75 10.0056 9.67098 10.1963 9.53033 10.337C9.38968 10.4776 9.19891 10.5566 9 10.5566C8.80109 10.5566 8.61032 10.4776 8.46967 10.337C8.32902 10.1963 8.25 10.0056 8.25 9.80664V6.05664C8.25 5.85773 8.32902 5.66696 8.46967 5.52631C8.61032 5.38566 8.80109 5.30664 9 5.30664C9.19891 5.30664 9.38968 5.38566 9.53033 5.52631C9.67098 5.66696 9.75 5.85773 9.75 6.05664V9.80664Z" fill="#03543F" />
                                </svg>
                              </div>
                            </div>
                            <span className="h-[24px] grow shrink-0 basis-auto font-['SF_Pro_Rounded'] text-[16px] font-normal leading-[24px] text-[#046c4e] relative text-left whitespace-nowrap z-[5]">
                              Your photo is being created! This usually takes 5-10 mins the
                              first time.
                            </span>
                          </div>
                        </div>
                        <Link to="/app/dashboard" className="w-full">
                          <button className='w-full flex gap-[8px] justify-center items-center self-stretch shrink-0 flex-nowrap rounded-[24px] border-none relative z-[6] pointer'>
                            <div className='flex pt-[8px] pr-[12px] pb-[8px] pl-[12px] justify-between items-center grow shrink-0 basis-0 flex-nowrap bg-[#10741b] rounded-[999px] relative overflow-hidden z-[7]'>
                              <span className="h-[18px] grow shrink-0 basis-auto font-['SF_Pro_Display'] text-[14px] font-medium leading-[17.5px] text-[#fff] relative text-left whitespace-nowrap z-[8]">
                                Explore our Dashboard
                              </span>
                              <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[9]'>
                                <div className='w-[5.333px] h-[9.333px]  bg-no-repeat relative z-10  mr-0 mb-0 ml-[5.334px]'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                                    <path d="M10.2567 7.11996L6.45604 3.56929C6.18738 3.31863 5.76471 3.33196 5.51404 3.60129C5.26271 3.87063 5.27671 4.29263 5.54538 4.54396L9.30604 8.05663L5.54538 11.5693C5.27671 11.8206 5.26204 12.2426 5.51338 12.512C5.64471 12.6526 5.82204 12.7233 6.00071 12.7233C6.16404 12.7233 6.32738 12.664 6.45604 12.544L10.2567 8.99329C10.5214 8.74529 10.6674 8.41329 10.6674 8.05663C10.6674 7.69996 10.5214 7.36796 10.2567 7.11996Z" fill="white" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      {loader == 'yes' ? (
                        <button style={{ pointerEvents: "unset", opacity: 0.3 }} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' >
                          <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                            <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                              <Spinner accessibilityLabel="Small spinner example" size="small" />
                            </span>
                          </div>
                        </button>
                      ) : (
                        <button onClick={handleSave} className='flex w-[82px] justify-center items-end shrink-0 flex-nowrap border-none relative z-[83] pointer' >
                          <div className='flex w-[82px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap bg-[#047ac6] rounded-[999px] relative overflow-hidden z-[84]'>
                            <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#fff] relative text-left z-[85]">
                              Save
                            </span>
                          </div>
                        </button>
                      )}
                      <Link to="/app/dashboard" className="flex justify-center items-end">
                        <div className='flex w-[134px] justify-center items-end shrink-0 flex-nowrap relative z-[88]'>
                          <div className='flex w-[134px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] gap-[8px] justify-center items-center shrink-0 flex-nowrap rounded-[999px] relative overflow-hidden z-[89]'>
                            <span className="h-[24px] shrink-0 basis-auto font-['SF_Pro_Display'] text-[16px] font-medium leading-[24px] text-[#4b5059] relative text-left whitespace-nowrap z-[90]">
                              I’ll do this later
                            </span>
                          </div>
                        </div>
                      </Link>
                    </>
                  )}
                </>
              )}

            </div>
          </div>



        </div>
        <div className="custom_slider_content flex flex-col  w-6/12 max-md:ml-0 max-md:w-full">
          <CustomSlider images={images} />
        </div>
      </div>
    </div >

  );
};

export default SecondHeader;
