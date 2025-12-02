import connectDB from "../../../config/database";
import Property from "../../../models/Property";
import { getSessionUser } from "../../../utils/getSessionUser";
import cloudinary from "../../../config/cloudinary";


  export const GET = async (request) => {
    try {
      await connectDB();
      const properties = await Property.find({});
      return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response("Somthing went Wrong", { status: 500 });
    }
  };

export const POST = async (request) => {
  try {
    await connectDB();
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        return new Response('Unauthorized',{status : 401})
    }

    const { userId} = sessionUser;
    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) => image.name !== '');
    //Create property object for database
    const propertyData = {
        type : formData.get('type'),
        name : formData.get('name'),
        description : formData.get('description'),
        location : {
            street : formData.get('location.street'),
            city : formData.get('location.city'),
            state : formData.get('location.state'),
            zipcode : formData.get('location.zipcode'),
        },
        beds : formData.get('beds'),
        baths : formData.get('baths'),
        square_feet : Number(formData.get('square_feet')),
        amenities,
        rates : {
            monthly : formData.get('rates.monthly'),
            weekly : formData.get('rates.weekly'),
            nightly : formData.get('rates.nightly'),
        },
        seller_info : {
            name : formData.get('seller_info.name'),
            email : formData.get('seller_info.email'),
            phone : formData.get('seller_info.phone'),
        },
        owner:userId,
    }
    //Upload images to cloudinary
    const imageUploadPromises = [];
    for(const image of images){
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
        //convert image to base64
        const imageBase64 = imageData.toString('base64');
        //make request to cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,{
            folder : 'PropertyPulse',
          }
        );
        imageUploadPromises.push(result.secure_url);

        //wait for all images to be uploaded
        const uploadedImages = await Promise.all(imageUploadPromises);
        //add uploaded images to property data
        propertyData.images = uploadedImages;

    }
    const newProperty = new Property(propertyData);
    await newProperty.save();
  
     
    console.log('hi');
    return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    // return new Response(JSON.stringify({message : "Success"}), { status: 200 });
  } catch (error) {
    return new Response("Failed to add Property", { status: 500 });
  }
};
 