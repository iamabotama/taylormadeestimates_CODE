import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Portal from "./pages/Portal";
import Admin from "./pages/Admin";

// Redirects unauthenticated users to /login
function ProtectedRoute({ component: Component, adminOnly = false }: { component: React.ComponentType; adminOnly?: boolean }) {
  const { user, isAdmin, loading } = useAuth();
  const [, navigate] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f2eb] flex items-center justify-center">
        <div className="text-[#2d5016] font-['Outfit']">Loading…</div>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  if (adminOnly && !isAdmin) {
    navigate('/portal');
    return null;
  }

  return <Component />;
}

function Router() {
  const { user, isAdmin, loading } = useAuth();
  const [, navigate] = useLocation();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login">
        {() => {
          // If already logged in, redirect to appropriate portal
          if (!loading && user) {
            navigate(isAdmin ? '/admin' : '/portal');
            return null;
          }
          return <Auth />;
        }}
      </Route>
      <Route path="/portal">
        {() => <ProtectedRoute component={Portal} />}
      </Route>
      <Route path="/admin">
        {() => <ProtectedRoute component={Admin} adminOnly />}
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster position="top-right" richColors />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
