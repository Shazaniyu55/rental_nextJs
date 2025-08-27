import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import SubscribeToNewsLetter from "./SubscribeToNewsLetter";
const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-black  px-5 md:px-16 py-10 md:py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="text-3xl" >
              

              <p className="text-2xl text-white">RENTALS</p>
            </Link>
            <p className="max-w-xs mt-4 text-sm text-white">
              Quality Home At Its Best
            </p>
            <div className="flex mt-8 space-x-6 text-white">
              <Link
                href="https://www.facebook.com/share/1CEzGKZygx/"
                target="_blank"
              >
                <FacebookRoundedIcon />
              </Link>
             
              {/* <a
                href=""
                target="_blank"
              >
                <FaaedinIn size={20} className="hover:text-yellow hover:-translate-y-1 transition-all" />
              </a> */}
             
              <Link
                href="https://www.instagram.com/royalecleanersuk/?igsh=MWJvdGs1N2dvdWc2cQ%3D%3D#"
                target="_blank"
              >
                <InstagramIcon  />
              </Link>
            </div>

            <p className="leading-loose tracking-tighter  leading-normal mt-8 text-xs text-white">
            Rentals @2024 All rights reserved. <br />
        </p>
          </div>


        

          <div className="grid gap-8 lg:col-span-2 grid-cols-2 md:grid-cols-4 text-white">
            <div>
              <p className="font-medium">QUICK aS</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm">
              <Link
                  href="/"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Home
                </Link>


                <Link
                  href="/"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  About Us
                </Link>


                <Link
                  href="/"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Contact Us
                </Link>

              
              
                
                



                
              </nav>
            </div>
            <div>
              <p className="font-medium">SERVICES</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm ">
                <Link
                  href="/about"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Get Homes
                </Link>


                 <Link
                  href="/about"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Get Homes
                </Link>


                 <Link
                  href="/about"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Get Homes
                </Link>
                
               

               

               


                
               
              </nav>
            </div>
            
            


            <div>
              <p className="font-medium">POLICIES</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm">
                <Link
                  href="/privacy"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:opacity-75 hover:border-b hover:border-neutral-400 w-fit"
                >
                  Terms of Service
                </Link>
                
              </nav>

           </div>


           


          </div>
        </div>
        {/* <p className="mt-8 text-xs text-white">
        SPIC AND SPAN. Home & Office Cleaning is an online marketplace that matches private and commercial<br/>cushrefmers with experienced cleaners in Austria, Belgium, France, Germany, Italy, Luxembourg, Poland, Portugal,<br/> Spain, and Sweden. SPIC AND SPAN. Home & Office Cleaning is a registered trademark of A&K Ventures OÜ,<br/> a company founded in July 2016 by Karol Kaczmarek and Amadeusz Annissimo.
        </p> */}
      </div>

      <SubscribeToNewsLetter/>

      
    </footer>
  );
};

export default Footer;
