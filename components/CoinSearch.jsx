"use client";
import { useState, useEffect } from "react";
import CoinItem from "./CoinItem";
import axios from "axios";
import Image from "next/image";

const CoinSearch = () => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true";

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      // console.log(response.data)
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [url]);
  // console.trace(coins);
  if (isLoading) {
    return (
      <div className="rounded-xl w-full shadow-[0_5px_60px_5px_rgba(0,0,0,0.3)] md:p-10 mt-20  p-2">
        <div className="flex flex-col w-full md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
          <h1 className="font-bold text-xl my-2">Search Crypto</h1>
          <form>
            <input
              type="text"
              className="outline-none rounded-lg drop-shadow-sm shadow-xl p-2 border-slate-300 border"
              onChange={(e) => setText(e.target.value)}
              placeholder="Search a coin"
            />
          </form>
        </div>
        <div className="min-h-[300px] flex justify-center items-center">
          <Image
            src={"/coin-2-unscreen.gif"}
            height={500}
            width={500}
            alt="/"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="rounded-xl shadow-orange-100 shadow-[0_5px_60px_5px_rgba(0,0,0,0.3)]  md:p-10 mt-20 p-2">
        <div className="flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right">
          <h1 className="font-bold text-xl my-2">Search Crypto</h1>
          <form>
            <input
              type="text"
              className="outline-none rounded-lg drop-shadow-sm shadow-xl p-2 border-slate-300 border"
              onChange={(e) => setText(e.target.value)}
              placeholder="Search a coin"
            />
          </form>
        </div>
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b  ">
              <th></th>
              <th className="sm:px-4 w-[10%]">#</th>
              <th className="text-left w-[30%]">Coin</th>
              <th className="w-[10%]"></th>
              <th>Price</th>
              <th>24h</th>
              <th className="hidden md:table-cell">24h Volume</th>
              <th className="hidden md:table-cell">Mkt</th>
              <th className="w-[20%]">Last 7 Days</th>
            </tr>
          </thead>
          <tbody>
            {coins
              ?.filter((value) => {
                if (text === "") return value;
                else if (
                  value.name.toLowerCase().includes(text.toLowerCase())
                ) {
                  return value;
                }
                return false;
              })
              .map((coin) => {
                return <CoinItem key={coin.market_cap_rank} coin={coin} />;
              })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default CoinSearch;
