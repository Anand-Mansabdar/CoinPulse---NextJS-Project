import React from "react";
import DataTable from "./DataTable";
import { TrendingDown, TrendingUp } from "lucide-react";

const CategoriesFallback = () => {
  // Create mock data for 10 categories
  const mockCategories = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    name: "",
    top_3_coins: ["", "", ""],
    market_cap_change_24h: 0,
    market_cap: 0,
    volume_24h: 0,
  }));

  const columns: DataTableColumn<(typeof mockCategories)[0]>[] = [
    {
      header: "Category",
      cellClassName: "category-cell",
      cell: () => <div className="category-skeleton skeleton rounded" />,
    },
    {
      header: "Top Gainers",
      cellClassName: "top-gainers-cell",
      cell: () => (
        <div className="flex gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="coin-skeleton skeleton rounded-full" />
          ))}
        </div>
      ),
    },
    {
      header: "24h Change",
      cellClassName: "change-header-cell",
      cell: () => {
        const isTrendingUp = Math.random() > 0.5;

        return (
          <div className="change-cell flex items-center gap-1">
            <div className="value-skeleton-md skeleton rounded" />
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} className="text-green-500" />
            ) : (
              <TrendingDown width={16} height={16} className="text-red-500" />
            )}
          </div>
        );
      },
    },
    {
      header: "Market Cap",
      cellClassName: "market-cap-cell",
      cell: () => <div className="value-skeleton-lg skeleton rounded" />,
    },
    {
      header: "24h Volume",
      cellClassName: "volume-cell",
      cell: () => <div className="value-skeleton-lg skeleton rounded" />,
    },
  ];

  return (
    <div id="categories" className="custom-scrollbar">
      <h4>Top Categories</h4>
      <DataTable
        columns={columns}
        data={mockCategories}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
};

export default CategoriesFallback;
