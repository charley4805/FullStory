
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

export const Navbar = () => {
    const { itemCount } = useCart();
    const location = useLocation();

    return (
        <nav className="border-b border-slate-800 bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primaryHover transition-colors">
                    <Package className="h-8 w-8" />
                    <span className="text-xl font-bold tracking-tight">STEAM Tracker</span>
                </Link>
                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            location.pathname === "/" ? "text-primary" : "text-slate-400"
                        )}
                    >
                        Browse
                    </Link>
                    <Link
                        to="/checkout"
                        className={cn(
                            "relative group flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                            location.pathname === "/checkout" ? "text-primary" : "text-slate-400"
                        )}
                    >
                        <div className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            {itemCount > 0 && (
                                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-accent text-white hover:bg-accent/90 text-[10px] font-bold flex items-center justify-center border border-background">
                                    {itemCount}
                                </span>
                            )}
                        </div>
                        <span>Checkout</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
