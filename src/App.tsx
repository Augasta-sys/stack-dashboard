import { Navigate, Route, Routes } from "react-router-dom"

import ScrollToTop from "./components/ScrollToTop"
import Dashboard from "./pages/Dashboard"
import Favorites from "./pages/Favorites"
import ForgotPassword from "./pages/ForgotPassword"
import Inbox from "./pages/Inbox"
import OrderLists from "./pages/OrderLists"
import ProductStock from "./pages/ProductStock"
import Pricing from "./pages/Pricing"
import Calendar from "./pages/Calendar"
import Todo from "./pages/Todo"
import Contact from "./pages/Contact"
import Invoice from "./pages/Invoice"
import UIElements from "./pages/UIElements"
import Team from "./pages/Team"
import Table from "./pages/Table"
import Settings from "./pages/Settings"

import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Products from "./pages/Products"
import ResetPassword from "./pages/ResetPassword"
import SignUp from "./pages/SignUp"

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/inbox"
          element={<Inbox />}
        />

        <Route
          path="/order-lists"
          element={<OrderLists />}
        />

        <Route
          path="/product-stock"
          element={<ProductStock />}
        />

        <Route
          path="/pricing"
          element={<Pricing />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route
          path="/todo"
          element={<Todo />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/invoice"
          element={<Invoice />}
        />

        <Route
          path="/ui-elements"
          element={<UIElements />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/table"
          element={<Table />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/404"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  )
}