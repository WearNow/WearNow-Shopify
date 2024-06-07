import gql from "graphql-tag";
import client from "~/services/ApolloClient";

export const fetchNotificationSettings = async (store_id: string) => {
   return await client
    .query({
      query: gql`query MyQuery($store_id:uuid){
        notification_setting(where: {store_id: {_eq: $store_id} } ) {
          product_photo_updates
          renewal_due
          tryonusage_update
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
      return result.data.notification_setting[0];
    });
};

export const updateNotificationSettings = async (   
  store_id: string,  
  updates: {  
    product_photo_updates?: boolean;  
    renewal_due?: boolean;  
    tryonusage_update?: boolean;  
  }  
 ) => {  
  // 创建一个变量对象，只包含非null的更新项  
  const variables = {  
    store_id,  
    _set: {} as Record<string, boolean | undefined>, // 使用Record来确保_set的类型是确定的  
  };  
  
  // 遍历updates对象，将非null的值添加到_set对象中  
  for (const [key, value] of Object.entries(updates)) {  
    if (value !== null) {  
      (variables._set as Record<string, boolean>)[key] = value;  
    }  
  }  
  
  // 如果_set对象为空，则不发送mutation（或者根据需求处理）  
  if (Object.keys(variables._set).length === 0) {  
    // 没有需要更新的字段，可以返回一个默认值或抛出错误  
    return 0; // 或者 throw new Error('No updates provided');  
  }  
  
  // 发送mutation请求  
  return await client  
    .mutate({  
      mutation: gql`  
        mutation MyMutation($store_id: uuid!, $_set: notification_setting_set_input!) {  
          update_notification_setting(where: {store_id: {_eq: $store_id}}, _set: $_set) {  
            affected_rows  
          }  
        }  
      `,  
      variables,  
    })  
    .then((result) => {  
      console.log("apollo client result: :::", result);  
      return result.data.update_notification_setting.affected_rows;  
    })  
    .catch((error) => {  
      // 处理错误  
      console.error("Error updating notification settings:", error);  
      throw error;  
    });  
};  