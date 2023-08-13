import { Sparklines, SparklinesLine } from "@/components/Sparklines";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaFacebookF, FaTwitter, FaGithub } from "react-icons/fa";
import DOMPurify from "isomorphic-dompurify";

async function getData(id) {
  const url = `https://api.coingecko.com/api/v3/coins/${id}?localization=false&sparkline=true`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failure fetching");
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const coin = await getData(params.id);

  return {
    title: coin.name,
    description: coin.description,
  };
}

const Page = async ({ params }) => {
  const coin = await getData(params.id);
  //   console.log(coin);
  return (
    <div className="m-1 relative  md:m-6 md:p-3 p-1 rounded-xl shadow-2xl">
      <div className="bg-green-400 absolute text-white mt-24 px-3  right-[-45px] rotate-90">
        <span className="">Server Side</span>
      </div>
      <div className="flex pt-10">
        <img className="w-20" src={coin.image?.large} alt={coin?.name} />
        <div className="m-1 p-1">
          <p className="font-bold text-2xl">{coin?.name} price</p>
          <p className="text-sm">({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 mt-3 md:mx-3">
        <div>
          <div className="flex justify-between sm:mx-3">
            {coin.market_data?.current_price ? (
              <p className="font-bold text-xl">
                ${coin.market_data.current_price.usd.toLocaleString()}
              </p>
            ) : null}
            <p>7 Days</p>
          </div>
          <div className="">
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between sm:mx-3">
            <div>
              <p>Market Cap</p>
              {coin.market_data?.market_cap ? (
                <p className="font-bold">
                  ${coin.market_data.market_cap.usd.toLocaleString()}
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-right">Volume Cap</p>
              {coin.market_data?.market_cap ? (
                <p className="font-bold">
                  ${coin.market_data.total_volume.usd.toLocaleString()}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between sm:mx-3">
            <div>
              <p>24h High</p>
              {coin.market_data?.high_24h ? (
                <p className="font-bold">
                  ${coin.market_data.high_24h.usd.toLocaleString()}
                </p>
              ) : null}
            </div>
            <div>
              <p>24h Low</p>
              {coin.market_data?.low_24h ? (
                <p className="font-bold">
                  ${coin.market_data.low_24h.usd.toLocaleString()}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-2xl mx-3 mb-1 mt-3 md:mt-0">
            Market Stats
          </p>
          <div className="flex justify-between sm:mx-3 mt-2">
            <div>
              <p>Market Rank</p>
              <p className="font-bold">{coin.market_cap_rank}</p>
            </div>
            <div>
              <p>Hashing Algorithms</p>
              {coin.hashing_algorithm ? (
                <p className="font-bold">${coin.hashing_algorithm}</p>
              ) : null}
            </div>
            <div>
              <p>Trust Score</p>
              {coin.tickers ? (
                <p className="text-right font-bold">
                  {coin.liquidity_score.toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between sm:mx-3 mt-2">
            <div>
              <p>Price change (24h)</p>
              {coin.market_data ? (
                <p className="font-bold">
                  ${coin.market_data.price_change_percentage_24h.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p>Price change (7d)</p>
              {coin.market_data ? (
                <p className="font-bold">
                  ${coin.market_data.price_change_percentage_7d.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p>Price change (14d)</p>
              {coin.market_data ? (
                <p className="font-bold text-right">
                  ${coin.market_data.price_change_percentage_14d.toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between sm:mx-3 mt-2">
            <div>
              <p>Price change (30d)</p>
              {coin.market_data ? (
                <p className="font-bold">
                  ${coin.market_data.price_change_percentage_30d.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p>Price change (60d)</p>
              {coin.market_data ? (
                <p className="font-bold">
                  ${coin.market_data.price_change_percentage_60d.toFixed(2)}
                </p>
              ) : null}
            </div>
            <div>
              <p>Price change (1y)</p>
              {coin.market_data ? (
                <p className="font-bold text-right">
                  ${coin.market_data.price_change_percentage_1y.toFixed(2)}
                </p>
              ) : null}
            </div>
          </div>
          <div className=" text-blue-600 mx-6">
            <div className="flex justify-around  p-3  mt-6 text-xl cursor-pointer">
              <AiOutlineInstagram />
              <FaTwitter />
              <FaFacebookF />
              <FaGithub />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="md:p-6 p-1">
          <p className="mt-4 font-semibold">About {coin?.name}</p>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin?.description ? coin.description.en : ""
              ),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Page;
