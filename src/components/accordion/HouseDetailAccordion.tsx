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
  images?: {
    url: string;
    caption?: string;
  }[];
}

export default function HouseDetailsAccordion({ houses }: { houses: House }) {
  return (
    <Accordion sx={{ borderRadius: "12px", mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography sx={{ fontWeight: "bold" }}>
          {houses.details.title} - {houses.details.description} -{houses.details.price}$
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
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {houses.images.map((img, i) => (
              <div key={i} className="flex flex-col items-center">
                <img
                  src={img.url}
                  alt={img.caption || `house-${i}`}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                {img.caption && (
                  <p className="text-xs text-gray-500 mt-1">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
