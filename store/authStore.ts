import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import customFetch from "../utils/axios";
import { GoogleUserInfo } from "../types";

interface UserState {
  userProfile: GoogleUserInfo | null;
  addUser: (user: GoogleUserInfo) => void;
  removeUser: () => void;
}

const useAuthStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        userProfile: null,
        addUser: (user) => set((state) => ({ userProfile: user })),
        removeUser: () => set((state) => ({ userProfile: null })),
      }),
      { name: "auth" }
    )
  )
);

export default useAuthStore;
