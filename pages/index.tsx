import type { NextPage } from "next";
import { VideoPost } from "../types";
import customFetch from "../utils/axios";
import { NoResults, VideoCard } from "../components";

type Props = {
  videos: VideoPost[];
};

const Home: NextPage<Props> = ({ videos }: { videos: VideoPost[]}) => {
  const isVideos = !!videos.length;

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {isVideos ? (
        videos.map((video: VideoPost) => <VideoCard post={video} key={video._id} />)
      ) : (
        <NoResults text={"No Videos"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const response = await customFetch.get("/api/post");

  return {
    props: {
      videos: response.data,
    },
  };
};
export default Home;
