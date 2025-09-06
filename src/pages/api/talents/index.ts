
import SWExtra from "@/lib/model/swExtra"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()
        try{
            const services = await SWExtra.find({},{services:true})
const options = services.map((serv)=>serv.services.flat().map((s:any)=> s.category))
                res.status(201).json(options)
        }catch(err){
            console.log(err)
            res.status(400).json({message:"Sorry an error occurred,please try again"})
        }
}


// import dbConnect from "@/lib/mongoose";
// import House from "@/lib/model/house";

// export default async function handler(req: any, res: any) {
//   await dbConnect();

//   try {
//     // Get all houses
//     const houses = await House.find({}, { details: 1, _id: 0 });
//     //console.log(houses);    

//     // Extract categories from houses
//     const houseCategories = houses.map((house: any) => house.details.category);

//     // console.log(houseCategories);
//     // Put in a Set for uniqueness
//     const uniqueCategories = [...new Set(houseCategories)];

//     res.status(200).json(uniqueCategories);
//   } catch (err) {
//     console.error("Error fetching house categories:", err);
//     res.status(500).json({
//       message: "Sorry, an error occurred. Please try again later.",
//     });
//   }
// }
