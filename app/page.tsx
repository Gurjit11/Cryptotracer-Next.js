import CoinSearch from "../components/CoinSearch";
import TrendingCoins from "../components/TrendingCoins";

const Home = () => {
  return (
    <div className="">
      <div className="w-full min-h-[600px] flex justify-center">
        <div className="max-w-[1150px] w-full rounded-xl">
          <CoinSearch />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-[1300px] rounded-xl">
          <TrendingCoins />
        </div>
      </div>
    </div>
  );
};

export default Home;
