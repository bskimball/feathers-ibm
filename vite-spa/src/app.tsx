import { Outlet } from "react-router-dom";
import { AuthProvider } from "./components/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/header";
import Footer from "./components/footer";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 heropattern-tinycheckers-slate-100 dark:heropattern-tinycheckers-slate-800">
          <Header />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Outlet />
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
