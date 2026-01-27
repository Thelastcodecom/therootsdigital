"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Calendar,
  ShoppingCart,
  Users,
  DollarSign,
  Activity,
  MoreVertical,
  LucideIcon,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// --- Types & Interfaces ---
interface RealTimeData {
  time: string;
  shopify: number;
  ebay: number;
  amazon: number;
  walmart: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

interface CategoryData {
  name: string;
  value: number;
}

interface StorePerformance {
  store: string;
  revenue: string;
  orders: string;
  conversion: string;
  aov: string;
  status: string;
}

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: LucideIcon;
}

interface PlatformMetric {
  label: string;
  value: string;
}

interface PlatformStatProps {
  platform: string;
  metrics: PlatformMetric[];
}

// --- Initial Data ---
const initialRealTimeData: RealTimeData[] = [
  { time: "00:00", shopify: 88000, ebay: 70000, amazon: 82000, walmart: 85000 },
  { time: "04:00", shopify: 82000, ebay: 71000, amazon: 61000, walmart: 63000 },
  { time: "08:00", shopify: 72000, ebay: 72000, amazon: 89000, walmart: 62000 },
  { time: "12:00", shopify: 89000, ebay: 78000, amazon: 72000, walmart: 70000 },
  { time: "16:00", shopify: 79000, ebay: 85000, amazon: 60000, walmart: 86000 },
  { time: "20:00", shopify: 75000, ebay: 70000, amazon: 62000, walmart: 63000 },
  { time: "24:00", shopify: 68000, ebay: 65000, amazon: 64000, walmart: 89000 },
];

const pieData: PieData[] = [
  { name: "eBay", value: 4500, color: "#4ADE80" },
  { name: "Shopify", value: 3800, color: "#C5EF16" },
  { name: "Amazon", value: 3100, color: "#60A5FA" },
  { name: "Walmart", value: 2500, color: "#F472B6" },
  { name: "Etsy", value: 1800, color: "#FFB800" },
];

const categoryData: CategoryData[] = [
  { name: "Apparel", value: 220000 },
  { name: "Electronics", value: 180000 },
  { name: "Home & Garden", value: 150000 },
  { name: "Sports", value: 120000 },
  { name: "Toys", value: 90000 },
  { name: "Beauty", value: 75000 },
];

const tableData: StorePerformance[] = [
  {
    store: "Shopify Store",
    revenue: "$225,615",
    orders: "4,152",
    conversion: "3.2%",
    aov: "$54.36",
    status: "Active",
  },
  {
    store: "eBay Store",
    revenue: "$191,397",
    orders: "3,847",
    conversion: "2.9%",
    aov: "$49.75",
    status: "Active",
  },
  {
    store: "Amazon Store",
    revenue: "$276,543",
    orders: "5,128",
    conversion: "3.5%",
    aov: "$53.94",
    status: "Active",
  },
  {
    store: "Walmart Store",
    revenue: "$142,876",
    orders: "2,736",
    conversion: "2.6%",
    aov: "$52.23",
    status: "Active",
  },
  {
    store: "Etsy Store",
    revenue: "$98,432",
    orders: "1,943",
    conversion: "2.3%",
    aov: "$50.66",
    status: "Active",
  },
];

// --- UI Components ---

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  icon: Icon,
}) => (
  <div className="bg-[#111111] border-l-2 border-l-[#C5EF16] border-y border-y-white/5 border-r border-r-white/5 p-5 rounded-xl shadow-2xl">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-white/40 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-[#C5EF16] tracking-tight">
          {value}
        </h3>
      </div>
      <div className="p-2 bg-white/5 rounded-lg text-white/20">
        <Icon size={18} />
      </div>
    </div>
    <div className="mt-4 flex items-center gap-1.5">
      <span className="flex items-center text-[#C5EF16] text-xs font-bold bg-[#C5EF16]/10 px-1.5 py-0.5 rounded">
        <ArrowUpRight size={12} /> {trend}
      </span>
      <span className="text-white/30 text-xs font-medium">from last month</span>
    </div>
  </div>
);

const PlatformStat: React.FC<PlatformStatProps> = ({ platform, metrics }) => (
  <div className="bg-[#111111] border-t-2 border-t-[#C3EE12] border-x border-x-white/5 border-b border-b-white/5 rounded-xl overflow-hidden shadow-2xl">
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h4 className="font-bold text-[#C5EF16]">{platform}</h4>
        <MoreVertical
          size={16}
          className="text-white/20 cursor-pointer hover:text-white"
        />
      </div>
      <div className="grid grid-cols-2 gap-y-5 gap-x-2">
        {metrics.map((m, i) => (
          <div key={i}>
            <p className="text-[10px] uppercase tracking-wider font-bold text-white/30 mb-0.5">
              {m.label}
            </p>
            <p className="text-sm font-bold text-white/80">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  const [chartData, setChartData] =
    useState<RealTimeData[]>(initialRealTimeData);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) =>
        prevData.map((item) => ({
          ...item,
          shopify: Math.max(
            50000,
            Math.min(90000, item.shopify + (Math.random() - 0.5) * 5000),
          ),
          ebay: Math.max(
            50000,
            Math.min(90000, item.ebay + (Math.random() - 0.5) * 5000),
          ),
          amazon: Math.max(
            50000,
            Math.min(90000, item.amazon + (Math.random() - 0.5) * 5000),
          ),
          walmart: Math.max(
            50000,
            Math.min(90000, item.walmart + (Math.random() - 0.5) * 5000),
          ),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased pb-12 mt-25">
      <main className="max-w-[1600px] mx-auto p-8 pt-12">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">
            E-Commerce Analytics Dashboard
          </h1>
          <p className="text-white/40 text-sm mt-1 flex items-center gap-2 font-medium">
            <Calendar size={14} className="text-[#C5EF16]" />
            January 27, 2026 at 1:45 AM
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Sales"
            value="$2,539,650"
            trend="0.1%"
            icon={DollarSign}
          />
          <StatCard
            title="Today's Orders"
            value="46,852"
            trend="3 units"
            icon={ShoppingCart}
          />
          <StatCard
            title="Average Order Value"
            value="$54.36"
            trend="0.3%"
            icon={Activity}
          />
          <StatCard
            title="Returning Customers"
            value="43%"
            trend="0.4%"
            icon={Users}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-[#111111] border border-white/5 p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-[#C5EF16] uppercase tracking-wider text-sm mb-10">
              REAL-TIME REVENUE STREAM
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="f1" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#C5EF16"
                        stopOpacity={0.15}
                      />
                      <stop offset="95%" stopColor="#C5EF16" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="f2" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#4ADE80"
                        stopOpacity={0.15}
                      />
                      <stop offset="95%" stopColor="#4ADE80" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="f3" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#60A5FA"
                        stopOpacity={0.15}
                      />
                      <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="f4" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#F472B6"
                        stopOpacity={0.15}
                      />
                      <stop offset="95%" stopColor="#F472B6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                    dy={15}
                  />
                  <YAxis
                    domain={[0, 95000]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                    tickFormatter={(v: number) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111111",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                  />
                  <Legend
                    verticalAlign="top"
                    align="center"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                      paddingBottom: "30px",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="shopify"
                    stroke="#C5EF16"
                    strokeWidth={3}
                    fill="url(#f1)"
                  />
                  <Area
                    type="monotone"
                    dataKey="ebay"
                    stroke="#4ADE80"
                    strokeWidth={3}
                    fill="url(#f2)"
                  />
                  <Area
                    type="monotone"
                    dataKey="amazon"
                    stroke="#60A5FA"
                    strokeWidth={3}
                    fill="url(#f3)"
                  />
                  <Area
                    type="monotone"
                    dataKey="walmart"
                    stroke="#F472B6"
                    strokeWidth={3}
                    fill="url(#f4)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111111] border border-white/5 p-6 rounded-xl shadow-sm flex flex-col items-center">
            <h3 className="font-bold text-[#C5EF16] uppercase tracking-wider text-xs mb-8">
              Platform Distribution
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ 
                        color: "#fff",            
                        fontSize: "12px", 
                        fontWeight: "bold" 
                      }}
                      labelStyle={{ 
                        color: "#fff"
                      }}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "10px", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl shadow-sm">
            <h3 className="font-bold text-[#C5EF16] uppercase tracking-widest text-sm mb-10">
              Top Categories
            </h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "rgba(255,255,255,0.6)",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                    interval={0}
                    dy={10}
                  />
                  <YAxis
                    domain={[0, 250000]}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "rgba(255,255,255,0.4)",
                      fontSize: 11,
                      fontWeight: "bold",
                    }}
                    tickFormatter={(v: number) => `$${v / 1000}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                    contentStyle={{
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#C5EF16"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl shadow-sm">
            <h3 className="font-bold text-[#C5EF16] uppercase tracking-widest text-sm mb-8">
              Store Performance Metrics
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-wider text-white/30">
                      Store
                    </th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-wider text-white/30 text-right">
                      Revenue
                    </th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-wider text-white/30 text-right">
                      Orders
                    </th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-wider text-white/30 text-right">
                      Conv.
                    </th>
                    <th className="pb-4 font-bold text-[10px] uppercase tracking-wider text-white/30 text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {tableData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="group hover:bg-white/2 transition-colors"
                    >
                      <td className="py-5 text-sm font-bold text-white group-hover:text-[#C5EF16] transition-colors">
                        {row.store}
                      </td>
                      <td className="py-5 text-sm font-bold text-white/80 text-right">
                        {row.revenue}
                      </td>
                      <td className="py-5 text-sm font-bold text-white/80 text-right">
                        {row.orders}
                      </td>
                      <td className="py-5 text-sm font-bold text-white/80 text-right">
                        {row.conversion}
                      </td>
                      <td className="py-5 text-sm font-bold text-[#C5EF16] text-right">
                        <span className="bg-[#C5EF16]/10 px-2 py-1 rounded text-[10px] uppercase">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-black text-white uppercase tracking-[0.2em]">
              Live Platform Sync
            </h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <PlatformStat
              platform="Shopify"
              metrics={[
                { label: "Today's Revenue", value: "$225,615" },
                { label: "Total Revenue", value: "$1.5M" },
                { label: "Orders", value: "4,152" },
                { label: "Rate", value: "3.2%" },
              ]}
            />
            <PlatformStat
              platform="eBay"
              metrics={[
                { label: "Total Views", value: "276" },
                { label: "Total Revenue", value: "$2.7M" },
                { label: "Listings", value: "1,842" },
                { label: "Bids", value: "627" },
              ]}
            />
            <PlatformStat
              platform="Walmart"
              metrics={[
                { label: "GMV", value: "$191,397" },
                { label: "Total Revenue", value: "$723k" },
                { label: "Orders", value: "3,847" },
                { label: "Sold", value: "7,623" },
              ]}
            />
            <PlatformStat
              platform="Amazon"
              metrics={[
                { label: "Top State", value: "CA" },
                { label: "Total Revenue", value: "$1.1M" },
                { label: "Orders", value: "5,128" },
                { label: "Prime", value: "3,876" },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
