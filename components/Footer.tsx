import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

type ListProps = { items: string[]; mt: boolean };

const List = ({ items, mt }: ListProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"} `}>
      {items.map((item) => (
        <p
          key={item}
          className="text-gray-400 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={footerList1} mt={false} />
      <List items={footerList2} mt />
      <List items={footerList3} mt />
      <p className="text-gray-400 text-small mt-5">2023 TikTik</p>
    </div>
  );
};

export default Footer;
