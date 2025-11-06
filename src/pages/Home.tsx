import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/contexts/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, LifeBuoy } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*").limit(4);
        if (error) {
          throw error;
        }
        setProducts(data || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <motion.section
        className="bg-muted/40 py-20 md:py-32"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            variants={fadeIn}
          >
            Discover Your Next Favorite Thing
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8"
            variants={fadeIn}
          >
            High-quality products curated just for you. Explore our collection and find what you've been looking for.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link to="/products">
              <Button size="lg" className="text-lg h-12 px-8">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-64 w-full rounded-xl" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-destructive">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                variants={fadeIn}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">Get your orders delivered to your doorstep in no time.</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              variants={fadeIn}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-muted-foreground">We stand by the quality of our products. Your satisfaction is our priority.</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              variants={fadeIn}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4">
                <LifeBuoy className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Our support team is always here to help you with any questions.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
