import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Card } from '../components/ui/Card';
import { Button, buttonVariants } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Trash2, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Function to track custom events with FullStory
const trackEvent = (name: string, properties: Record<string, any>) => {
    const w = window as any;
    const FS = w.FS;

    if (typeof FS === "function") {
        FS("trackEvent", { name, properties });
        return;
    }
    if (FS && typeof FS.trackEvent === "function") {
        FS.trackEvent(name, properties);
    }
};

export const CheckoutPage = () => {
    const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subscribe: false,
    });
    const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors: { name?: string; email?: string } = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            // Custom Event: critical action
            trackEvent("Checkout Completed", {
                orderTotal: subtotal,
                itemCount: items.length,
                subscribe: formData.subscribe ? "true" : "false",
            });

            clearCart();
        }, 1500);

    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card glass className="max-w-md w-full p-8 text-center space-y-6">
                    <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto text-success">
                        <CheckCircle className="h-10 w-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Order Confirmed!</h2>
                    <p className="text-slate-400">
                        Thank you for your purchase, {formData.name}. We've sent a confirmation email to {formData.email}.
                    </p>
                    <Link to="/" className={buttonVariants({ className: "w-full" })}>
                        Continue Shopping
                    </Link>
                </Card>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-8 pb-20">
                <div className="container mx-auto px-4 text-center py-20">
                    <div className="bg-surface/50 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-10 w-10 text-slate-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
                    <p className="text-slate-400 mb-8">Looks like you haven't added anything yet.</p>
                    <Link to="/">
                        <Button variant="primary" size="lg">Start Browsing</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Summary */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Cart Items ({items.length})</h2>
                                <div className="space-y-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex flex-col sm:flex-row gap-4 items-center bg-surface/30 p-4 rounded-lg border border-slate-700/50">
                                            <div className="h-20 w-20 flex-shrink-0 bg-slate-800 rounded-md overflow-hidden">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            </div>

                                            <div className="flex-grow text-center sm:text-left">
                                                <h3 className="text-white font-medium">{item.name}</h3>
                                                <p className="text-slate-400 text-sm">{item.category}</p>
                                                <div className="text-primary font-bold mt-1">${item.price.toFixed(2)}</div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center bg-background rounded-lg border border-slate-700 h-9">
                                                    <button
                                                        className="px-3 text-slate-400 hover:text-white transition-colors"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        aria-label="Decrease quantity"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-medium w-6 text-center text-white">{item.quantity}</span>
                                                    <button
                                                        className="px-3 text-slate-400 hover:text-white transition-colors"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        aria-label="Increase quantity"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                {/* Element Attribute */}
                                                <Button
                                                    data-fs-element="Remove Item Button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-500 hover:text-danger hover:bg-danger/10"
                                                    aria-label="Remove item"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Checkout Form */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24">
                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                                {/* Element Attributes */}
                                <div className="space-y-4">
                                    <Input
                                        data-fs-element="Checkout Full Name Input"
                                        label="Full Name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        error={errors.name}
                                    />
                                    <input
                                        data-fs-element="Subscribe Checkbox"
                                        type="checkbox"
                                        checked={formData.subscribe}
                                        onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                                        className="form-checkbox h-4 w-4 text-primary rounded border-slate-700 bg-surface focus:ring-primary focus:ring-offset-background"
                                    />

                                    <label className="flex items-center space-x-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.subscribe}
                                            onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                                            className="form-checkbox h-4 w-4 text-primary rounded border-slate-700 bg-surface focus:ring-primary focus:ring-offset-background"
                                        />
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Subscribe to product updates</span>
                                    </label>
                                </div>

                                <div className="pt-4 border-t border-slate-700 space-y-2">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold text-lg pt-2">
                                        <span>Total</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                {/* Element Attribute */}
                                <Button
                                    type="submit"
                                    className="w-full"
                                    size="lg"
                                    isLoading={isSubmitting}
                                    data-fs-element="Place Order Button"
                                    data-order-total={subtotal}
                                    data-item-count={items.length}
                                    data-subscribe={formData.subscribe ? "true" : "false"}
                                    data-fs-properties-schema={JSON.stringify({
                                        "data-order-total": { type: "real", name: "orderTotal" },
                                        "data-item-count": { type: "int", name: "itemCount" },
                                        "data-subscribe": { type: "bool", name: "subscribe" },
                                    })}
                                >
                                    Place Order
                                </Button>


                                <Link to="/" className="block text-center text-sm text-slate-500 hover:text-primary transition-colors">
                                    <span className="flex items-center justify-center gap-1">
                                        <ArrowLeft className="h-3 w-3" />
                                        Continue Shopping
                                    </span>
                                </Link>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
