// import * as React from "react";
// import {
//   Drawer,
//   Box,
//   TextField,
//   Autocomplete,
//   Container,
//   Typography,
//   Divider,
// } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
// import {
//   createSetFromArray,
//   fetchJobs,
//   fetchSearchJobs,
//   fetchTalents,
//   fetchUsers,
//   fetchHome
// } from "@/lib/search";
// import { styled } from "@mui/system";
// import CancelFloatingActionButtons from "../fab/Cancel";
// import { SmnkErrorBoundary } from "@/pages/_app";
// import LoadingAlert from "../alerts/Loading";
// import SWDetailsNoCollapse from "../card/SWDetailsNoCollapse";
// import SearchedJobDetailsAccordion from "../accordion/SearchedJobDetailsAccordion";
// export type SearchOption = { firstLetter: string; option: string };

// const searchOptionsList = async (searchOption: string) => {
//   switch (searchOption) {
//     case "Services": {
//       const data = await fetchHome();
//       return data;
//     }
//     case "Jobs": {
//       const data = await fetchHome();
//       return data;
//     }
//     default: {
//     }
//   }
// };

// export const GroupHeader = styled("div")(({ theme }) => ({
//   position: "sticky",
//   top: "-8px",
//   padding: "4px 10px",
//   //color: 'whitesmoke',
//   backgroundColor: "gray",
// }));

// export const GroupItems = styled("ul")({
//   padding: 0,
// });

// export const getSearchOptions = (searchOptions: string[]) => {
//   let options: SearchOption[] = [];
//   if (searchOptions.length > 0) {
//     options = searchOptions.map((option) => {
//       if (option) {
//         const firstLetter = option[0].toUpperCase();
//         return {
//           firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
//           option,
//         };
//       }
//       return { firstLetter: "", option: "" };
//     });
//   }
//   return options;
// };

// export default function SearchDrawer({
//   searchOption,
// }: {
//   searchOption: string;
// }) {
//   const [openJobDrawer, setOpenJobDrawer] = React.useState(false);
//   const [openServicesDrawer, setOpenServicesDrawer] = React.useState(false);
//   const [searchOptions, setSearchoptions] = React.useState<string[]>([]);
//   const [value, setValue] = React.useState<SearchOption | null>(null);
//   const [users, setUsers] = React.useState<any[]>([]);
//   const [jobs, setJobs] = React.useState<any[]>([]);
//   const [loadingJob, setLoadingJob] = React.useState(true);
//   const [loadingUser, setLoadingUser] = React.useState(true);

//   React.useEffect(() => {
//     (async () => {
//       const data = await searchOptionsList(searchOption);
//       if (Array.isArray(data)) {
//         setSearchoptions(createSetFromArray(data.flat()));
//       }
//     })();
//   }, [searchOption]);
//   return (
//     <Box mt={3} mb={3}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: ".5rem",
//         }}
//       >
//         <Autocomplete
//           id="grouped-demo"
//           value={value}
//           onChange={async (event: any, newValue: SearchOption | null) => {
//             setValue(newValue);
//             if (searchOption === "Services") {
//               const searchValue = newValue?.option as string;
//               if (searchValue) {
//                 setLoadingUser(true);
//                 setOpenServicesDrawer(true);

//                 const users = await fetchUsers(searchValue);
//                 setLoadingUser(false);
//                 setUsers(users);
//               }
//             } else {
//               const searchValue = newValue?.option as string;
//               if (searchValue) {
//                 setLoadingJob(true);
//                 setOpenJobDrawer(true);

//                 const { data } = await fetchSearchJobs(searchValue);
//                 setLoadingJob(false);
//                 setJobs(data);
//               }
//             }
//           }}
//           options={getSearchOptions(searchOptions).sort(
//             (a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter)
//           )}
//           groupBy={(option: any) => option.firstLetter}
//           getOptionLabel={(option: any) => option.option}
//           sx={{
//             minWidth: { xs: 300, sm: 400 },
//             maxWidth: { xs: 300, sm: 400 },
//           }}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//                 // label={`search Home by categories`}

//               label={`search ${searchOption.toLowerCase()} by categories`}
//               InputProps={{
//                 ...params.InputProps,
//                 type: "search",
//                 sx: {
//                   borderRadius: "30px",
//                   backgroundColor: "whitesmoke",
//                   height: 50,
//                 },

//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           )}
//           renderGroup={(params) => (
//             <li key={params.key}>
//               <GroupHeader>{params.group}</GroupHeader>
//               <GroupItems>{params.children}</GroupItems>
//             </li>
//           )}
//         />
//       </Box>

//       <Drawer
//         anchor="left"
//         open={openJobDrawer}
//         onClose={() => {
//           setOpenJobDrawer(false);
//         }}
//       >
//         {loadingJob ? (
//           <LoadingAlert />
//         ) : (
//           <Container sx={{ p: ".5rem", mt: "2rem" }}>
//             {jobs && jobs.length > 0 ? (
//               <>
//                 <Box
//                   display={"flex"}
//                   alignItems={"center"}
//                   justifyContent={"space-between"}
//                 >
//                   <Typography>
//                     All Jobs in <i>{value?.option}</i> Category
//                   </Typography>
//                   <CancelFloatingActionButtons
//                     handleClick={() => {
//                       setOpenJobDrawer(false);
//                     }}
//                   />
//                 </Box>
//                 {jobs.map((job, i) => (
//                   <SearchedJobDetailsAccordion job={job} key={i} />
//                 ))}
//               </>
//             ) : (
//               <Typography>
//                 No Jobs in <i>{value?.option} category</i>
//               </Typography>
//             )}
//           </Container>
//         )}
//       </Drawer>
//       <ServicesDrawer
//         openServicesDrawer={openServicesDrawer}
//         setOpenServicesDrawer={setOpenServicesDrawer}
//         searchedService={value?.option}
//         users={users}
//         loadingUser={loadingUser}
//       />
//     </Box>
//   );
// }

// export function ServicesDrawer({
//   searchedService,
//   users,
//   loadingUser,
//   openServicesDrawer,
//   setOpenServicesDrawer,
// }: {
//   searchedService: string | undefined;
//   users: any[];
//   loadingUser: boolean;
//   openServicesDrawer: boolean;
//   setOpenServicesDrawer: any;
// }) {
//   return (
//     <SmnkErrorBoundary>
//       <Drawer
//         anchor="right"
//         open={openServicesDrawer}
//         onClose={() => {
//           setOpenServicesDrawer(false);
//         }}
//       >
//         {loadingUser ? (
//           <LoadingAlert />
//         ) : (
//           <Container sx={{ p: ".5rem", mt: "2rem", maxWidth: "100%" }}>
//             {users && users.length > 0 ? (
//               <>
//                 <Box
//                   display={"flex"}
//                   alignItems={"center"}
//                   justifyContent={"space-between"}
//                 >
//                   <Typography>
//                     All Services in <i>{searchedService}</i> Category
//                   </Typography>
//                   <CancelFloatingActionButtons
//                     handleClick={() => {
//                       setOpenServicesDrawer(false);
//                     }}
//                   />
//                 </Box>
//                 {users.map((user, i) => (
//                   <>
//                     <SWDetailsNoCollapse
//                       userId={user.userId}
//                       forClient={true}
//                       key={i}
//                     />
//                     <Divider />
//                   </>
//                 ))}
//               </>
//             ) : (
//               <Typography>
//                 No Services in <i>{searchedService} category</i>
//               </Typography>
//             )}
//           </Container>
//         )}
//       </Drawer>
//     </SmnkErrorBoundary>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  Autocomplete,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HouseDetailsAccordion from "../accordion/HouseDetailAccordion";
import { fetchHome, fetchSearchHomes } from "@/lib/search";

interface SearchOption {
  option: string;
}

export default function SearchDrawer({ searchOption }: { searchOption: string }) {
  const [value, setValue] = useState<SearchOption | null>(null);
  const [options, setOptions] = useState<SearchOption[]>([]);
  const [loading, setLoading] = useState(false);

  const [homes, setHomes] = useState<any[]>([]);
  const [openHomeDrawer, setOpenHomeDrawer] = useState(false);
  const [loadingHome, setLoadingHome] = useState(false);


  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);

        if (searchOption === "Homes") {
          const houses = await fetchHome();

          // extract categories
          const categories = houses.map(
            (house: any) => house?.details?.category
          );

          // remove duplicates + null/undefined
          const uniqueCats = [...new Set(categories.filter(Boolean))];

          setOptions(uniqueCats.map((cat) => ({ option: cat })));
        } else {
          setOptions([]); // reset if not "Homes"
        }
      } catch (err) {
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [searchOption]);


  return (
    <>
      <Autocomplete
        id="search-bar"
        sx={{ width: "100%", maxWidth: 600 }}
        value={value}
        onChange={async (event, newValue) => {
          setValue(newValue);
          if (searchOption === "Homes" && newValue?.option) {
            setLoadingHome(true);
            setOpenHomeDrawer(true);
            const homes = await fetchSearchHomes(newValue.option);
            setHomes(homes);
            setLoadingHome(false);
          }
        }}
        options={options}
        getOptionLabel={(option) => option.option}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search homes by categories"
            InputProps={{
              ...params.InputProps,
              type: "search",
              sx: {
                borderRadius: "30px",
                backgroundColor: "whitesmoke",
                height: 50,
              },
              endAdornment: (
                <InputAdornment position="end">
                  {loading ? <CircularProgress size={20} /> : <SearchIcon />}
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Drawer for Homes */}
      <Drawer
        anchor="right"
        open={openHomeDrawer}
        onClose={() => setOpenHomeDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: 400, p: 2 } }}
      >
        {loadingHome ? (
          <p className="text-center">Loading homes...</p>
        ) : homes.length === 0 ? (
          <p className="text-center">No homes found for this category.</p>
        ) : (
          homes.map((house, i) => <HouseDetailsAccordion houses={house} key={i} />)
        )}
      </Drawer>
    </>
  );
}
