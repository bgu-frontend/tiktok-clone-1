import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import customFetch from "../utils/axios";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";
import { Button } from "../components";

type Props = {};

const Upload: NextPage<Props> = (props: Props) => {
  const { userProfile } = useAuthStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  // Video upload
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>();
  const [wrongFileType, setWrongFileType] = useState(false);

  const uploadVideo: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    setIsLoading(true);
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

  // Post upload form
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const handlePost: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (caption && videoAsset?._id) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: category,
      };

      await customFetch.post("/api/post", document);

      router.push("/");
    }
  };

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-gray-50 justify-center">
      <div className="flex gap-6 flex-wrap justify-between items-center bg-white rounded-lg xl:h-[80vh] w-[60%] p-14 pt-6">
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
                      {/* <Button filled>Select file</Button> */}
                      <p>Select file</p>
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
        {/* FORM for video description */}
        <div className="flex flex-col gap-3 pb-10">
          {/* Caption text input */}
          <label htmlFor="text" className="font-medium">
            Caption
          </label>
          <input
            type="text"
            id="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="rounded outline-none border-2 border-gray-200 lg:p-4 p-2"
          />
          {/* Video Category Select */}
          <label className="font-medium" htmlFor="select">
            Choose a Category
          </label>
          <select
            name="select"
            id="select"
            onChange={(e) => setCategory(e.target.value)}
            className="rounded outline-none border-2 border-gray-200 lg:p-4 p-2 cursor-pointer"
          >
            {topics.map((topic, idx) => (
              <option key={idx} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
          <div className=" flex gap-6 mt-10">
            <Button onClick={() => {}}>Discard</Button>
            <Button onClick={handlePost} filled>
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
