import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface House {
  title: string;
  location: string;
  price: number;
  details: {
    category: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
  };
  images?: string[];
}

export default function HouseDetailsAccordion({ houses }: { houses: House}){
  return (
    <Accordion sx={{ borderRadius: "12px", mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: "bold" }}>
          {houses.details.title} - {houses.location} - ${houses.details.price}   
        </Typography> 
      </AccordionSummary>
      <AccordionDetails>
        <Typography>🏷️ Category: {houses.details.category}</Typography>
        <Typography>🛏️ Bedrooms: {houses.details.bedrooms}</Typography>
        <Typography>🛁 Bathrooms: {houses.details.bathrooms}</Typography>
        <Typography sx={{ mt: 1 }}>
          📖 {houses.details.description}
        </Typography>
        {houses.images && houses.images.length > 0 && (
          <div className="flex gap-2 mt-2">
            {houses.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="house"
                className="w-24 h-24 rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
