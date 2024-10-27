/** @format */
import { useEffect } from "react";
import { AuthProvider } from "./components/context/Auth";
import AllRoutes from "./routes/AllRoutes";
import useAuthStore from "./modules/auth"; // Import Zustand auth store

const App = () => {
  return (
    <div className="flex flex-col">
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
