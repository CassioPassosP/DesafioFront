import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </div>
  );
}
