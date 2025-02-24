import connectToDB from "@/config/database";
import Property from "@/models/Property";
export const GET = async (request, {params}) => {

    try{
        await connectToDB();
        const properties = await Property.findById(params.id)
        return new Response(properties,{status: 200})
    }catch(error){
        return new Response('Something went wrong',{status: 500})

    }
   
};
