"use client";

import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Link from "next/link";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { UserAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";

const CoinItem = ({ coin }) => {
  const [savedCoin, setSavedCoin] = useState(false);
  const { user } = UserAuth();

  const coinPath = doc(db, "users", `${user?.email}`);
  const saveCoin = async () => {
    if (user?.email) {
      setSavedCoin(true);
      await updateDoc(coinPath, {
        watchList: arrayUnion({
          id: coin.id,
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank,
          symbol: coin.symbol,
          price: coin.current_price.toLocaleString(),
        }),
      });
    } else {
      alert("Please sign in to save a coin to your watch list");
    }
  };

  return (
    <tr className="h-[80px] overflow-hidden border-b">
      <td onClick={saveCoin} className="cursor-pointer">
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link href={`/coin/${coin.id}`}>
          <div className="flex items-center cursor-pointer hover:scale-105 hover:ease-in hover:duration-300">
            <img
              className="w-8 mr-2 rounded-full"
              src={coin.image}
              alt={coin.id}
            />
            <p className="font-semibold hidden sm:table-cell  ">{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h.toFixed(2) > 0 ? (
          <p className="text-green-600 md:mx-2">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        ) : (
          <p className="text-red-600 sm:mx-2">
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        )}
      </td>
      <td className="hidden md:table-cell md:mx-3">
        ${coin.total_volume.toLocaleString()}
      </td>
      <td className="hidden md:table-cell md:mx-3">
        ${coin.market_cap.toLocaleString()}
      </td>
      <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
          <SparklinesLine color="teal" />
        </Sparklines>
      </td>
    </tr>
  );
};

export default CoinItem;
