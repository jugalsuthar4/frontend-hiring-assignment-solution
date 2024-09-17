import { ShiftContextProvider } from "./context/shift";
import { Toaster } from "@/components/ui/toaster";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("@/screens/home/index"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
function App() {
  return (
    <ShiftContextProvider>
      <Suspense fallback={<h1>loading...</h1>}>
        <RouterProvider router={router} />
        <Toaster />
      </Suspense>
    </ShiftContextProvider>
  );
}

export default App;
