import { Link } from 'react-router-dom';
import { Package2, Send, Twitter, Facebook, Instagram } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Package2 className="h-6 w-6" />
              <span>E-commerce</span>
            </Link>
            <p className="text-sm">
              Your one-stop shop for the best products online. Quality and customer satisfaction are our top priorities.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-sm hover:text-foreground">All Products</Link></li>
              <li><Link to="/products" className="text-sm hover:text-foreground">Featured</Link></li>
              <li><Link to="/products" className="text-sm hover:text-foreground">New Arrivals</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">About</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-sm hover:text-foreground">Our Story</Link></li>
              <li><Link to="#" className="text-sm hover:text-foreground">Careers</Link></li>
              <li><Link to="#" className="text-sm hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Subscribe</h4>
            <p className="text-sm">Get the latest updates on new products and upcoming sales.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your email" className="flex-1" />
              <Button type="submit" size="icon" aria-label="Subscribe">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between text-sm">
          <p>&copy; 2025 E-commerce, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link to="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
            <Link to="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
            <Link to="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
