import { Outlet, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { useTheme } from './ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  CircleUser,
  Menu,
  Package2,
  ShoppingCart,
  Sun,
  Moon,
} from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Footer from './Footer';
import { Skeleton } from './ui/skeleton';

export default function MainLayout() {
  const { user, profile, signOut, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const { cart } = useCart();

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">E-commerce</span>
          </Link>
          <NavLink to="/" className={({ isActive }) => `transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => `transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Products
          </NavLink>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">E-commerce</span>
              </Link>
              <NavLink to="/" className={({ isActive }) => `transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                Home
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => `transition-colors hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                Products
              </NavLink>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <Button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              variant="outline"
              size="icon"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cart.length}
              </span>
            )}
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                {profile?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
