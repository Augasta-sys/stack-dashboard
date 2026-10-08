import type { ReactNode } from "react"
import { useState } from "react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Clock3,
  Package,
  Users,
} from "lucide-react"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

/* =========================================================
   SALES DETAILS DATA
========================================================= */

const salesDetailsData = [
  { x: 5000, y: 25 },
  { x: 6500, y: 26 },
  { x: 8500, y: 30 },
  { x: 10000, y: 48 },
  { x: 12000, y: 38 },
  { x: 13000, y: 51 },
  { x: 15000, y: 31 },
  { x: 16000, y: 39 },
  { x: 17000, y: 34 },
  { x: 18000, y: 45 },
  { x: 19500, y: 53 },
  { x: 20500, y: 42 },
  { x: 22000, y: 86 },
  { x: 23000, y: 34 },
  { x: 24000, y: 53 },
  { x: 26000, y: 45 },
  { x: 27000, y: 55 },
  { x: 29000, y: 42 },
  { x: 30000, y: 50 },
  { x: 31000, y: 61 },
  { x: 33000, y: 24 },
  { x: 35000, y: 27 },
  { x: 37000, y: 27 },
  { x: 39000, y: 45 },
  { x: 40000, y: 72 },
  { x: 41000, y: 58 },
  { x: 43000, y: 65 },
  { x: 45000, y: 58 },
  { x: 47000, y: 60 },
  { x: 49000, y: 58 },
  { x: 52000, y: 42 },
  { x: 54000, y: 57 },
  { x: 55000, y: 56 },
  { x: 57000, y: 57 },
  { x: 60000, y: 55 },
]

const salesTicks = [
  5000,
  10000,
  15000,
  20000,
  25000,
  30000,
  35000,
  40000,
  45000,
  50000,
  55000,
  60000,
]

/* =========================================================
   REVENUE DATA
========================================================= */

const revenueData = [
  {
    x: 5000,
    sales: 8,
    profit: 4,
  },
  {
    x: 10000,
    sales: 55,
    profit: 20,
  },
  {
    x: 15000,
    sales: 25,
    profit: 12,
  },
  {
    x: 20000,
    sales: 30,
    profit: 16,
  },
  {
    x: 25000,
    sales: 52,
    profit: 38,
  },
  {
    x: 30000,
    sales: 40,
    profit: 30,
  },
  {
    x: 35000,
    sales: 95,
    profit: 48,
  },
  {
    x: 40000,
    sales: 48,
    profit: 45,
  },
  {
    x: 45000,
    sales: 68,
    profit: 58,
  },
  {
    x: 50000,
    sales: 28,
    profit: 22,
  },
  {
    x: 55000,
    sales: 58,
    profit: 82,
  },
  {
    x: 60000,
    sales: 25,
    profit: 55,
  },
]

/* =========================================================
   SALES ANALYTICS
========================================================= */

const analyticsData = [
  {
    year: "2015",
    sales: 25,
    profit: 10,
  },
  {
    year: "2016",
    sales: 60,
    profit: 42,
  },
  {
    year: "2017",
    sales: 50,
    profit: 35,
  },
  {
    year: "2018",
    sales: 67,
    profit: 53,
  },
  {
    year: "2019",
    sales: 96,
    profit: 88,
  },
]

/* =========================================================
   CARD
========================================================= */

interface DashboardCardProps {
  children: ReactNode
  className?: string
}

function DashboardCard({
  children,
  className = "",
}: DashboardCardProps) {
  return (
    <section
      className={[
        "rounded-[14px]",
        "border border-[#B9B9B9]/20",
        "bg-white",
        "text-[#202224]",
        "shadow-[6px_6px_54px_rgba(0,0,0,0.05)]",
        "transition-all duration-200",
        "hover:shadow-[6px_10px_60px_rgba(0,0,0,0.08)]",
        "dark:border-[#313D4F]",
        "dark:bg-[#273142]",
        "dark:text-white",
        "dark:shadow-none",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  )
}

/* =========================================================
   STAT CARD
========================================================= */

interface StatCardProps {
  title: string
  value: string
  percentage: string
  description: string
  positive?: boolean
  icon: ReactNode
  iconClass: string
}

function StatCard({
  title,
  value,
  percentage,
  description,
  positive = true,
  icon,
  iconClass,
}: StatCardProps) {
  return (
    <DashboardCard className="min-h-[160px] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[#606060] dark:text-[#CBD5E1]">
            {title}
          </p>

          <h2 className="mt-3 truncate text-[27px] font-extrabold leading-none text-[#202224] dark:text-white sm:text-[29px]">
            {value}
          </h2>
        </div>

        <div
          className={[
            "flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[16px]",
            iconClass,
          ].join(" ")}
        >
          {icon}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-2 text-[13px]">
        {positive ? (
          <ArrowUpRight
            size={17}
            strokeWidth={2.5}
            className="text-[#00B69B]"
          />
        ) : (
          <ArrowDownRight
            size={17}
            strokeWidth={2.5}
            className="text-[#F93C65]"
          />
        )}

        <span
          className={
            positive
              ? "font-bold text-[#00B69B]"
              : "font-bold text-[#F93C65]"
          }
        >
          {percentage}
        </span>

        <span className="truncate text-[#606060] dark:text-[#CBD5E1]">
          {description}
        </span>
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   SALES DETAILS
========================================================= */

function SalesDetails() {
  const { t } = useLanguage()

  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-7">
        <h2 className="text-[21px] font-extrabold text-[#202224] dark:text-white sm:text-[23px]">
          {t.salesDetails}
        </h2>

        <select
          defaultValue="October"
          className="
            h-[32px]
            rounded-md
            border
            border-[#D5D5D5]
            bg-[#F1F4F9]
            px-3
            text-[12px]
            font-semibold
            text-[#202224]
            outline-none
            transition
            hover:border-[#4880FF]
            focus:border-[#4880FF]
            dark:border-[#4B5668]
            dark:bg-[#323D4E]
            dark:text-white
          "
        >
          <option>October</option>
          <option>September</option>
          <option>August</option>
        </select>
      </div>

      <div className="h-[340px] w-full px-3 pb-5 pt-5 sm:h-[390px] sm:px-5 sm:pb-6 sm:pt-7">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={salesDetailsData}
            margin={{
              top: 12,
              right: 12,
              left: 0,
              bottom: 12,
            }}
          >
            <defs>
              <linearGradient
                id="salesLightGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#4880FF"
                  stopOpacity={0.24}
                />

                <stop
                  offset="100%"
                  stopColor="#4880FF"
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E4E8EF"
              className="dark:stroke-[#344153]"
            />

            <XAxis
              type="number"
              dataKey="x"
              domain={[5000, 60000]}
              ticks={salesTicks}
              tickFormatter={(value) =>
                `${Number(value) / 1000}k`
              }
              tick={{
                fill: "#606060",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              className="dark:fill-[#CBD5E1]"
            />

            <YAxis
              type="number"
              domain={[20, 100]}
              ticks={[
                20,
                40,
                60,
                80,
                100,
              ]}
              tick={{
                fill: "#606060",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              width={38}
            />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #4880FF",
                borderRadius: 8,
                color: "#202224",
              }}
              labelStyle={{
                color: "#202224",
              }}
            />

            <Area
              type="linear"
              dataKey="y"
              stroke="#4880FF"
              strokeWidth={2.2}
              fill="url(#salesLightGradient)"
              dot={{
                r: 3.5,
                fill: "#FFFFFF",
                stroke: "#4880FF",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
                fill: "#4880FF",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   DEALS DETAILS
========================================================= */

function DealsDetails() {
  const { t } = useLanguage()

  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-7">
        <h2 className="text-[21px] font-extrabold text-[#202224] dark:text-white sm:text-[23px]">
          {t.dealsDetails}
        </h2>

        <select
          defaultValue="October"
          className="
            h-[32px]
            rounded-md
            border
            border-[#D5D5D5]
            bg-[#F1F4F9]
            px-3
            text-[12px]
            font-semibold
            text-[#202224]
            outline-none
            focus:border-[#4880FF]
            dark:border-[#4B5668]
            dark:bg-[#323D4E]
            dark:text-white
          "
        >
          <option>October</option>
          <option>September</option>
        </select>
      </div>

      <div className="mt-5 overflow-x-auto px-5 pb-6 sm:px-7">
        <table className="w-full min-w-[760px] border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#F1F4F9] dark:bg-[#323D4E]">
              <th className="rounded-l-[8px] px-5 py-3 text-left text-[12px] font-bold text-[#202224] dark:text-white">
                {t.productName}
              </th>

              <th className="px-5 py-3 text-left text-[12px] font-bold text-[#202224] dark:text-white">
                {t.location}
              </th>

              <th className="px-5 py-3 text-left text-[12px] font-bold text-[#202224] dark:text-white">
                {t.dateTime}
              </th>

              <th className="px-5 py-3 text-left text-[12px] font-bold text-[#202224] dark:text-white">
                {t.piece}
              </th>

              <th className="px-5 py-3 text-left text-[12px] font-bold text-[#202224] dark:text-white">
                {t.amount}
              </th>

              <th className="rounded-r-[8px] px-5 py-3 text-center text-[12px] font-bold text-[#202224] dark:text-white">
                {t.status}
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="transition-colors hover:bg-[#F8FAFD] dark:hover:bg-[#303B4D]">
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F1F4F9]">
                    <img
                      src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=80&q=80"
                      alt="Apple Watch"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="text-[13px] font-semibold text-[#202224] dark:text-white">
                    Apple Watch
                  </span>
                </div>
              </td>

              <td className="px-5 py-4 text-[13px] text-[#606060] dark:text-[#CBD5E1]">
                6096 Marjolaine Landing
              </td>

              <td className="px-5 py-4 text-[13px] text-[#606060] dark:text-[#CBD5E1]">
                12.09.2019 - 12.53 PM
              </td>

              <td className="px-5 py-4 text-[13px] text-[#606060] dark:text-[#CBD5E1]">
                423
              </td>

              <td className="px-5 py-4 text-[13px] font-semibold text-[#202224] dark:text-white">
                $34,295
              </td>

              <td className="px-5 py-4 text-center">
                <span className="inline-flex min-w-[95px] justify-center rounded-full bg-[#00B69B] px-4 py-2 text-[12px] font-bold text-white">
                  {t.delivered}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   REVENUE
========================================================= */

function Revenue() {
  const { t } = useLanguage()

  return (
    <DashboardCard className="overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-7">
        <h2 className="text-[21px] font-extrabold text-[#202224] dark:text-white sm:text-[23px]">
          {t.revenue}
        </h2>

        <select
          defaultValue="October"
          className="
            h-[32px]
            rounded-md
            border
            border-[#D5D5D5]
            bg-[#F1F4F9]
            px-3
            text-[12px]
            font-semibold
            text-[#202224]
            outline-none
            focus:border-[#4880FF]
            dark:border-[#4B5668]
            dark:bg-[#323D4E]
            dark:text-white
          "
        >
          <option>October</option>
          <option>September</option>
        </select>
      </div>

      <div className="h-[300px] px-3 pb-4 pt-5 sm:h-[330px] sm:px-5">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={revenueData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 8,
            }}
          >
            <defs>
              <linearGradient
                id="salesOrangeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#FF8A65"
                  stopOpacity={0.55}
                />

                <stop
                  offset="100%"
                  stopColor="#FF8A65"
                  stopOpacity={0.04}
                />
              </linearGradient>

              <linearGradient
                id="profitPurpleGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#B879D7"
                  stopOpacity={0.55}
                />

                <stop
                  offset="100%"
                  stopColor="#B879D7"
                  stopOpacity={0.04}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E4E8EF"
              className="dark:stroke-[#344153]"
            />

            <XAxis
              type="number"
              dataKey="x"
              domain={[5000, 60000]}
              ticks={salesTicks}
              tickFormatter={(value) =>
                `${Number(value) / 1000}k`
              }
              tick={{
                fill: "#606060",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[
                20,
                40,
                60,
                80,
                100,
              ]}
              tick={{
                fill: "#606060",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
              width={32}
            />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #D5D5D5",
                borderRadius: 8,
                color: "#202224",
              }}
            />

            <Area
              type="monotone"
              dataKey="sales"
              stroke="#FF8A65"
              strokeWidth={2.2}
              fill="url(#salesOrangeGradient)"
              dot={false}
            />

            <Area
              type="monotone"
              dataKey="profit"
              stroke="#B879D7"
              strokeWidth={2.2}
              fill="url(#profitPurpleGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-8 pb-5">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#202224] dark:text-white">
          <span className="h-3 w-3 rounded-full bg-[#FF8A65]" />
          {t.sales}
        </div>

        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#202224] dark:text-white">
          <span className="h-3 w-3 rounded-full bg-[#B879D7]" />
          {t.profit}
        </div>
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   CUSTOMERS
========================================================= */

function Customers() {
  const { t } = useLanguage()

  return (
    <DashboardCard className="min-h-[300px] p-5 sm:p-6">
      <h2 className="text-[20px] font-extrabold text-[#202224] dark:text-white">
        {t.customers}
      </h2>

      <div className="relative mx-auto mt-2 h-[165px] w-[165px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={49}
              outerRadius={61}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill="#D8E1EE" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* TOP */}
        <span className="absolute left-1/2 top-[21px] h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-[#4880FF]" />

        {/* RIGHT */}
        <span className="absolute right-[21px] top-1/2 h-[13px] w-[13px] -translate-y-1/2 rounded-full bg-[#4880FF]" />

        {/* BOTTOM */}
        <span className="absolute bottom-[21px] left-1/2 h-[13px] w-[13px] -translate-x-1/2 rounded-full bg-[#4880FF]" />

        {/* LEFT */}
        <span className="absolute left-[21px] top-1/2 h-[13px] w-[13px] -translate-y-1/2 rounded-full bg-[#4880FF]" />
      </div>

      <div className="mt-0 flex items-center justify-center">
        <div className="pr-6">
          <p className="text-[22px] font-extrabold text-[#202224] dark:text-white">
            34,249
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#4880FF]" />

            <span className="text-[12px] text-[#606060] dark:text-[#CBD5E1]">
              {t.newCustomers}
            </span>
          </div>
        </div>

        <div className="h-[45px] w-px bg-[#D5D5D5] dark:bg-[#4B5668]" />

        <div className="pl-6">
          <p className="text-[22px] font-extrabold text-[#202224] dark:text-white">
            1420
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#D8E1EE]" />

            <span className="text-[12px] text-[#606060] dark:text-[#CBD5E1]">
              {t.repeated}
            </span>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   FEATURED PRODUCT
========================================================= */

function FeaturedProduct() {
  const { t } = useLanguage()
  const products = [
    {
      name: t.beatsHeadphone,
      price: "$89.00",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=85",
    },
    {
      name: "Apple Watch",
      price: "$199.00",
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=85",
    },
    {
      name: "Camera",
      price: "$129.00",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=85",
    },
  ]
  const [currentProduct, setCurrentProduct] = useState(0)
  const previousProduct = () => {
    setCurrentProduct((current) => (current - 1 + products.length) % products.length)
  }
  const nextProduct = () => {
    setCurrentProduct((current) => (current + 1) % products.length)
  }
  const product = products[currentProduct]
  return (
    <DashboardCard className="min-h-[300px] p-5 sm:p-6">
      <h2 className="text-[20px] font-extrabold text-[#202224] dark:text-white">
        {t.featuredProduct}
      </h2>
      <div className="relative mt-2 flex h-[190px] items-center justify-center">
        <button
          type="button"
          aria-label="Previous product"
          onClick={previousProduct}
          className="
            absolute
            left-0
            top-1/2
            z-10
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#F1F4F9]
            text-[#202224]
            transition-all
            hover:scale-110
            hover:bg-[#4880FF]
            hover:text-white
            dark:bg-[#323D4E]
            dark:text-white
          "
        >
          <ArrowLeft size={17} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="
            h-[170px]
            w-[190px]
            object-contain
            mix-blend-multiply
            transition-transform
            duration-300
            hover:scale-105
            dark:mix-blend-normal
          "
        />
        <button
          type="button"
          aria-label="Next product"
          onClick={nextProduct}
          className="
            absolute
            right-0
            top-1/2
            z-10
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-[#F1F4F9]
            text-[#202224]
            transition-all
            hover:scale-110
            hover:bg-[#4880FF]
            hover:text-white
            dark:bg-[#323D4E]
            dark:text-white
          "
        >
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="text-center">
        <p className="text-[14px] font-bold text-[#202224] dark:text-white">
          {product.name}
        </p>
        <p className="mt-1 text-[14px] font-extrabold text-[#FF9500]">
          {product.price}
        </p>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        {products.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Show ${item.name}`}
            onClick={() => setCurrentProduct(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === currentProduct
                ? "w-5 bg-[#4880FF]"
                : "w-2.5 bg-[#D5D5D5] dark:bg-[#4B5668]"
            }`}
          />
        ))}
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   SALES ANALYTICS
========================================================= */

function SalesAnalytics() {
  const { t } = useLanguage()

  return (
    <DashboardCard className="min-h-[300px] p-5 sm:p-6">
      <h2 className="text-[20px] font-extrabold text-[#202224] dark:text-white">
        {t.salesAnalytics}
      </h2>

      <div className="mt-4 h-[220px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={analyticsData}
            margin={{
              top: 10,
              right: 8,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E4E8EF"
              className="dark:stroke-[#344153]"
            />

            <XAxis
              dataKey="year"
              tick={{
                fill: "#606060",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              ticks={[
                0,
                25,
                50,
                75,
                100,
              ]}
              tick={{
                fill: "#606060",
                fontSize: 10,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#FFFFFF",
                border: "1px solid #D5D5D5",
                borderRadius: 8,
                color: "#202224",
              }}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4880FF"
              strokeWidth={3}
              dot={{
                r: 3,
                fill: "#4880FF",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
              }}
            />

            <Line
              type="monotone"
              dataKey="profit"
              stroke="#00B69B"
              strokeWidth={2}
              dot={{
                r: 3,
                fill: "#00B69B",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  )
}

/* =========================================================
   DASHBOARD
========================================================= */

export default function Dashboard() {
  const { t } = useLanguage()

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* TITLE */}

        <div className="mb-6">
          <h1 className="text-[30px] font-extrabold leading-none text-[#202224] dark:text-white sm:text-[32px]">
            {t.dashboardTitle}
          </h1>
        </div>

        {/* KPI CARDS */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <StatCard
            title={t.totalUser}
            value="40,689"
            percentage="8.5%"
            description={t.upFromYesterday}
            icon={<Users size={31} />}
            iconClass="bg-[#8278F6] text-white"
          />

          <StatCard
            title={t.totalOrder}
            value="10293"
            percentage="1.3%"
            description={t.upFromPastWeek}
            icon={<Package size={31} />}
            iconClass="bg-[#FFBF3F] text-white"
          />

          <StatCard
            title={t.totalSales}
            value="$89,000"
            percentage="4.3%"
            description={t.downFromYesterday}
            positive={false}
            icon={<BarChart3 size={31} />}
            iconClass="bg-[#49D69A] text-white"
          />

          <StatCard
            title={t.totalPending}
            value="2040"
            percentage="1.8%"
            description={t.upFromYesterday}
            icon={<Clock3 size={31} />}
            iconClass="bg-[#FF8A68] text-white"
          />
        </div>

        {/* SALES DETAILS */}

        <div className="mt-6">
          <SalesDetails />
        </div>

        {/* DEALS DETAILS */}

        <div className="mt-6">
          <DealsDetails />
        </div>

        {/* REVENUE */}

        <div className="mt-6">
          <Revenue />
        </div>

        {/* BOTTOM THREE CARDS */}

        <div
          className="
            mt-6
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
            xl:grid-cols-3
          "
        >
          <Customers />

          <FeaturedProduct />

          <SalesAnalytics />
        </div>

        <div className="h-8" />
      </div>
    </DashboardLayout>
  )
}