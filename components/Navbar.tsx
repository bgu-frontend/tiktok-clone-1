import Image from "next/image";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { Button } from "../components";

const Navbar = () => {
  const user = false;
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TikTik"
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }} />
        </div>
      </Link>
      {/* <div>SEARCH</div> */}
      <div>
        {/* Buttons for logged user */}
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            {/* Upload button */}
            <Link href="/upload">
              <Button className="flex items-center gap-2 border-2 px-2 md:px-4 font-semibold">
                <IoMdAdd className=" text-xl" />
                <span className="hidden md:block">Upload</span>
              </Button>
            </Link>
            {/* User Profile Image */}
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className=" cursor-pointer rounded-full"
                    src={userProfile.image}
                    alt="profile photo"
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                </>
              </Link>
            )}
            {/* Logout button */}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={28} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => {
              createOrGetUser(res, addUser);
            }}
            onError={() => console.error("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
