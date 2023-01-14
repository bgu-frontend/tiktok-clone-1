import { CredentialResponse } from "@react-oauth/google";

import jwtDecode from "jwt-decode";
import { DecodedGoogleJWT, GoogleUserInfo } from "../types";
import customFetch from "./axios";

export const createOrGetUser = async (res: CredentialResponse) => {
  if (res.credential) {
    const decoded: DecodedGoogleJWT = jwtDecode(res.credential);

    const { name, picture, sub } = decoded;

    const user: GoogleUserInfo = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    await customFetch.post("/api/auth", user);
  }
};
