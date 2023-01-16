import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import customFetch from "../utils/axios";
import { client } from "../utils/client";

type Props = {};

const Upload: NextPage<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState();

  const uploadVideo: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {};

  return (
    <div className="flex w-full h-full">
      <div className=" bg-white rounded-lg">
        <div>
          <div>
            <p className=" text-2xl font-bold">Upload Video</p>
            <p className=" text-gray-400 mt-1">Post a video to your account </p>
          </div>
          <div className=" border-dashed rounded-xl border-2 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-50 transition ">
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div></div>
                ) : (
                  <label className="cursor-pointer">
                    <div className=" flex flex-col items-center justify-center h-full">
                      <div className="flex flex-col items-center justify-center ">
                        <p className=" font-bold text-xl">
                          <FaCloudUploadAlt className="text-gray-300 text-6xl" />
                        </p>
                        <p className=" text-xl font-semibold text-center">
                          Upload video
                        </p>
                      </div>
                      <p className=" text-gray-400 text-center mt-10 text-sm leading-7">
                        MP4 or WebM or ogg <br />
                        720*1280 or higher <br />
                        Up to 10 minutes <br />
                        Less than 2GB
                      </p>
                      <p
                        className=" bg-[var(--primary-color)] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none
                  "
                      >
                        Select file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="upload-video"
                      onChange={uploadVideo}
                      className="w-0 h-0"
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
