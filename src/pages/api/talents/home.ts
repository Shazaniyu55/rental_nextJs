import dbConnect from "@/lib/mongoose";
import House from "@/lib/model/house";

export default async function handler(req: any, res: any) {
  await dbConnect();

  try {
    // Get all houses
    const houses = await House.find({}, { details: 1, _id: 0 });

    // Extract categories from houses
    const houseCategories = houses.map((house: any) => house.details.category);

    // Put in a Set for uniqueness
    const uniqueCategories = [...new Set(houseCategories)];

    res.status(200).json(uniqueCategories);
  } catch (err) {
    console.error("Error fetching house categories:", err);
    res.status(500).json({
      message: "Sorry, an error occurred. Please try again later.",
    });
  }
}
