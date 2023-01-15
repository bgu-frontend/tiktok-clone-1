import { CredentialResponse } from "@react-oauth/google";

import jwtDecode from "jwt-decode";
import { DecodedGoogleJWT, GoogleUserInfo } from "../types";
import customFetch from "./axios";

// Get user info from google auth, save it to the store, post it to db
export const createOrGetUser = async (
  res: CredentialResponse,
  addUser: (user: GoogleUserInfo) => void
) => {
  if (res.credential) {
    const decoded: DecodedGoogleJWT = jwtDecode(res.credential);

    const { name, picture, sub } = decoded;

    const user: GoogleUserInfo = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };
    // adds to state.userProfile
    addUser(user);
    // createIfNotExists in sanity
    await customFetch.post("/api/auth", user);
  }
};
