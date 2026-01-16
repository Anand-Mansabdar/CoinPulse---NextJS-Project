import Image from "next/image";
import DataTable from "./components/DataTable";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";
import { Suspense } from "react";
import CoinOverview from "@/app/components/home/CoinOverview";
import TrendingCoins from "@/app/components/home/TrendingCoins";
import CoinOverviewFallback from "./components/CoinOverviewFallback";
import TrendingCoinsFallback from "./components/TrendingCoinsFallback";
import Categories from "./components/home/Categories";
import CategoriesFallback from "./components/CategoriesFallback";

const Page = async () => {
  const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
    dex_pair_format: "symbol",
  });

  const tendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
    "/search/trending",
    undefined,
    300
  );
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="w-full mt-7 space-y-4">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
