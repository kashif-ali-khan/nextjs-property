import connectToDB from "@/config/database";
import Property from "@/models/Property";
export const GET = async () => {

    try{
        await connectToDB();
        const properties = await Property.find({})
        return new Response(properties,{status: 200})
    }catch(error){
        return new Response('Something went wrong',{status: 500})

    }
    //await connectToDB();
    //const properties = await Property.find({})



    // return new Response(JSON.stringify({message: 'Hello world'}), {
    //     status: 200
    // })
};
