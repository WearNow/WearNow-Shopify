import gql from "graphql-tag";
import client from "~/services/ApolloClient";

function formatTimeWithAMPM(dateTimeString:string) {  
    // 解析日期时间字符串  
    const dateTime = new Date(dateTimeString);  

    // 提取小时和分钟  
    const hours = dateTime.getHours();  
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');  

    // 判断AM/PM并添加标记  
    const ampm = hours >= 12 ? 'PM' : 'AM';  
    const formattedHours = hours % 12 || 12; // 将24小时制转换为12小时制，并处理午夜的情况  

    // 格式化时间并返回  
    return `${formattedHours}:${minutes} ${ampm}`;   
}  

export const fetchHistoryData = async (store_id: string) => {
   return await client
      .query({
        query: gql`query MyQuery($store_id:uuid){
          product_photo_history(where: {request: {store_id: {_eq: $store_id}}}) {
            generated_image
            created_at
            uuid
            store_product {
              images
              product_id
              title
            }
            request {
              background {
                name
                image
              }
              pose {
                name
                image
              }
              model {
                name
                cover_image
              }
            }
          }
        }
        
        `,
        fetchPolicy: "network-only",
        variables: {
          store_id: store_id
        },
      })
      .then((result) => {
        console.log("apollo client result: :::", result);
        var product_photo_history = result.data.product_photo_history;
        // Map over store_products to create a new array with the added 'image' property

        const updatedStoreProducts = product_photo_history.map(
          (pph: any, index: number) => {
            //   // Assuming sp.images is already a JSON string that needs to be parsed
            return {
              src: JSON.parse(pph.generated_image).images[0],
              name: pph.store_product.title,
              photos: JSON.parse(pph.generated_image).images.length,
              images: JSON.parse(pph.generated_image).images.map((image: any) => {
                return {
                  src: image,
                  alt: pph.store_product.title,
                };
              }),
              date: pph.created_at.split("T")[0],
              time: formatTimeWithAMPM(pph.created_at),
              background: pph.request?.background,
              pose: pph.request?.pose,
              model: {
                name: pph.request?.model?.name,
                image: pph.request?.model?.cover_image,
              }
              // model_id: pph.request.model_id,
            };
          }
        );

        return updatedStoreProducts;
      });
};

export const fetchHistoryQueueData = async (store_id: string) => {
  return await client
    .query({
      query: gql`query MyQuery($store_id:uuid){
        product_image_generation_request(where: {store_id: {_eq: $store_id}, status: {_eq: "PENDING"}}) {
          store_product {
            title
            variant_id
            uuid
          }
          status
          results
          created_at
        }
      }
      `,
      fetchPolicy: "network-only",
      variables: {
        store_id: store_id
      },
    })
    .then((result) => {
      console.log("apollo client result: :::", result);
      var product_photo_history = result.data.product_image_generation_request;

      return product_photo_history.map(
        (pph: any, index: number) => {
          //   // Assuming sp.images is already a JSON string that needs to be parsed
          return {
            src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/41393cd4cd5332521a6a76c7311cd6bf12859d641f3850f2f131af1897cc1406?apiKey=f33f54c3e98c47d08e772cdbeee9d64d&',
            name: pph.store_product.title,
            photos: 'Creating',
            date: pph.created_at.split("T")[0],
            time: formatTimeWithAMPM(pph.created_at)
          };
        }
      );

    });
};