import SWExtra from "@/lib/model/swExtra"
import User from "@/lib/model/userModel"
import dbConnect from "@/lib/mongoose"


export default async function handler(req:any,res:any){
    //get database connection
    await dbConnect()

    const {userId} = req.body
    try{
        const user = await SWExtra.findOne({userId})
        res.json(user.subscription)
    }catch(err:any){
        console.log(err)
        res.json({errMsg:err.message})
    }
    
    
    
}