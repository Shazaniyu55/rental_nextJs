import { CardHeader, Box } from "@mui/material";
import { BlackTypography } from "../card/ClientJobDetailsCard";

export default function SMNKBankDetails() {
  return (
    <Box mb={5} minWidth={"100%"}>
      <CardHeader subheader="Rentals Bank Details" />
      <BlackTypography label="Account Name" value=" Gbadamosi Shazaniyu" />
      <BlackTypography label="Account Number" value="0812601495" />
      <BlackTypography label="Bank Name" value="Access Bank" />
    </Box>
  );
}
