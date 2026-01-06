import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { Home, Problems } from "./pages";

/**
 * Root application component that declares client-side routes and renders a global toaster.
 *
 * The "/" route renders the Home page. The "/problems" route renders the Problems page
 * when the user is signed in; otherwise it redirects to "/".
 *
 * @returns {JSX.Element} The root React element containing route definitions and a Toaster.
 */
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