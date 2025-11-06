import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
      <Link to={`/products/${product.id}`} className="block">
        <Card className="w-full h-full overflow-hidden group">
          <div className="overflow-hidden relative">
            <img
              src={product.image_url || 'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x400.png'}
              alt={product.name}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <CardContent className="p-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
            <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <Button onClick={handleAddToCart} className="w-full mt-auto">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
