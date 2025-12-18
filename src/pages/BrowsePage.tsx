import React, { useState, useMemo } from 'react';
import { products, type Product } from '../data/products';
import { cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Filter, Plus, Minus, Check } from 'lucide-react';

const trackEvent = (name: string, properties: Record<string, any>) => {
    const w = window as any;
    const FS = w.FS;

    // Most common: FS is a function (command queue)
    if (typeof FS === "function") {
        FS("trackEvent", { name, properties });
        return;
    }

    // Fallback: some environments expose a method
    if (FS && typeof FS.trackEvent === "function") {
        FS.trackEvent(name, properties);
    }
};


export const BrowsePage = () => {
    const { addItem } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

    const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const handleQuantityChange = (id: string, delta: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + delta),
        }));
    };

    const handleAddToCart = (product: Product) => {
        const qty = quantities[product.id] || 1;
        addItem(product, qty);

        // Show success feedback
        setAddedItems((prev) => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItems((prev) => ({ ...prev, [product.id]: false }));
        }, 2000);

        // Custom Event: critical action
        trackEvent("Item Added To Cart", {
            productId: product.id,          // string
            productName: product.name,      // string (bonus)
            quantity: qty,                  // number
            unitPrice: product.price,       // number (bonus)
        });
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Search Event: critical action
    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;

        const query = searchQuery.trim();
        trackEvent("Search Performed", {
            query: query,
            resultsCount: filteredProducts.length,
            category: selectedCategory,
        });
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="bg-surface border-b border-slate-800 py-12 mb-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Discover Future Skills
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">
                        Explore our curated collection of STEAM activities designed to inspire the next generation of innovators.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-end md:items-center justify-between">
                    <div className="w-full md:w-96 relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                            data-fs-element="Product Search Box"
                            placeholder="Search products..."
                            className="pl-10 h-10"
                            value={searchQuery}
                            onChange={handleSearch}
                            onKeyDown={handleSearchKeyDown}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-slate-400" />
                        <select
                            data-fs-element="Category Filter Dropdown"
                            className="h-10 bg-surface border border-slate-700 rounded-lg px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} glass className="flex flex-col h-full group transition-all hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
                            <div className="relative aspect-video overflow-hidden bg-slate-900 border-b border-white/5">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {!product.inStock && (
                                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                                        <span className="bg-danger text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            Out of Stock
                                        </span>
                                    </div>
                                )}
                                {/* Element Attribute */}
                                <div className="absolute top-2 right-2">
                                    <span className="bg-surface/90 backdrop-blur text-xs font-bold px-2 py-1 rounded border border-white/10 text-accent">
                                        {product.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-white mb-2 leading-tight">{product.name}</h3>
                                <p className="text-slate-400 text-sm mb-4 line-clamp-2 flex-grow">
                                    {product.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <span className="text-xl font-bold text-primary">
                                        ${product.price.toFixed(2)}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center bg-background rounded-lg border border-slate-700 h-9">
                                            <button
                                                data-fs-element="Quantity Decrease Button"
                                                className="px-2 text-slate-400 hover:text-white transition-colors"
                                                onClick={() => handleQuantityChange(product.id, -1)}
                                                disabled={!product.inStock}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">
                                                {quantities[product.id] || 1}
                                            </span>
                                            <button
                                                data-fs-element="Quantity Increase Button"
                                                className="px-2 text-slate-400 hover:text-white transition-colors"
                                                onClick={() => handleQuantityChange(product.id, 1)}
                                                disabled={!product.inStock}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>

                                        <Button
                                            data-fs-element="Add To Cart Button"

                                            data-product-id={product.id}
                                            data-unit-price={product.price}
                                            data-in-stock={product.inStock ? "true" : "false"}
                                            data-fs-properties-schema={JSON.stringify({
                                                "data-product-id": { type: "str", name: "productId" },
                                                "data-unit-price": { type: "real", name: "unitPrice" },
                                                "data-in-stock": { type: "bool", name: "inStock" },
                                            })}

                                            size="sm"
                                            disabled={!product.inStock}
                                            onClick={() => handleAddToCart(product)}
                                            variant={addedItems[product.id] ? "success" : "primary"}
                                            className={cn("min-w-[40px] px-0 w-10", addedItems[product.id] && "bg-success hover:bg-success text-white border-transparent")}
                                            title="Add to Cart"
                                        >
                                            {addedItems[product.id] ? (
                                                <Check className="h-4 w-4" />
                                            ) : (
                                                <Plus className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="bg-surface/50 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-slate-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
                        <p className="text-slate-400">Try adjusting your search or filter to find what you're looking for.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
