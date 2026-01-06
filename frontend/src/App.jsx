import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { Home, Problems } from "./pages";

function App() {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/problems"
          element={isSignedIn ? <Problems /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
