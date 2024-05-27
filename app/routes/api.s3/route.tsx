import { json } from "@remix-run/node";
import { cors } from "remix-utils/cors";
import aws from "aws-sdk";

aws.config.update({
    secretAccessKey: 'mU5UY3s3yxflJGa+N5Yw3Q5luHVY76SapJPkiAh/',
    accessKeyId: 'AKIAW3MEDQI3Y2TP4N3F',
    region: 'us-east-1'
});

const s3 = new aws.S3();

export const action = async ({ request }: ActionFunctionArgs) => {
    const body = await request.formData();


    const uploadedFile = body.get('file'); 
    const fileName = uploadedFile.name;
    const fileContent = Buffer.from(await uploadedFile.arrayBuffer()); 

  
    const params = {
        Bucket: 'wearnow-bucket',
        Key: fileName,
        Body: fileContent,
    };

   const data =  await s3.upload(params).promise();
    return cors(
        request,
        json({
            success: true,
            message: 'File uploaded successfully',
            imageUrl:data.Location,
            fileName:fileName
        })
    );
};
