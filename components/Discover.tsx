import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const {
    query: { topic },
  } = router;

  const [activeCategory, setActiveCategory] = useState("");
  useEffect(() => {
    if (!topic) {
      setActiveCategory("");
    }
  }, [topic]);

  const basicStyle =
    "xl:border-2 hover:bg-primary px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer";
  const activeTopicStyle = `${basicStyle} xl:border-[var(--primary-color)] text-[var(--primary-color)]`;
  const topicStyle = `${basicStyle} xl:border-gray-300 text-black`;

  return (
    <div className="xl:border-b-2 xl:border-fray-200 pb-6">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap justify-center xl:justify-start">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={
                activeCategory === item.name ? activeTopicStyle : topicStyle
              }
              onClick={() => setActiveCategory(item.name)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium hidden xl:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
