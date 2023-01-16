import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../store/authStore";
import customFetch from "../utils/axios";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";

type Props = {};

const Upload: NextPage<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();

  const [wrongFileType, setWrongFileType] = useState(false);

  const uploadVideo: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;

    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (files?.length) {
      const selectedFile = files[0];
      if (fileTypes.includes(selectedFile.type)) {
        const data = await client.assets.upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        });

        setVideoAsset(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setWrongFileType(true);
      }
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-gray-50 justify center">
      <div className=" bg-white rounded-lg">
        <div>
          {/* Header */}
          <div>
            <p className=" text-2xl font-bold">Upload Video</p>
            <p className=" text-gray-400 mt-1">Post a video to your account </p>
          </div>
          {/* Big input field for uploading video */}
          <div className=" border-dashed rounded-xl border-2 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-50 transition ">
            {isLoading ? (
              <p>Uploading</p>
            ) : (
              <div>
                {/* If user uploaded video — show it */}
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className="rounded-xl h-[450px] mt-16 bg-black"
                    ></video>
                  </div>
                ) : (
                  // else — show text inside input
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
                      {/* Select File btn */}
                      <p
                        className=" bg-[var(--primary-color)] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none
                  "
                      >
                        Select file
                      </p>
                    </div>
                    {/* hidden input */}
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
            {/* Warning message if user tried to upload video with wrong type */}
            {wrongFileType && (
              <p className="text-center text-red-400 font-semibold mt-4 w-[250px]">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        {/* FORM */}
        <div className="flex flex-col gap-3 pb-10">
          <label className="font-medium">Caption</label>
        </div>
      </div>
    </div>
  );
};

export default Upload;
