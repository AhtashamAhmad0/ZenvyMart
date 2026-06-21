import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header.jsx';
import { HomeScreen } from './components/HomeScreen.jsx';
import { CollectionScreen } from './components/CollectionScreen.jsx';
import { DetailScreen } from './components/DetailScreen.jsx';
import { AboutScreen } from './components/AboutScreen.jsx';
import { Footer } from './components/Footer.jsx';
import { CartDrawer } from './components/CartDrawer.jsx';
import { CheckoutModal } from './components/CheckoutModal.jsx';
import { ReviewModal } from './components/ReviewModal.jsx';
import { formatPrice } from './utils.js';
import { CheckCircle, Sparkles, ShoppingBag, MapPin, Truck, ChevronRight } from 'lucide-react';

const INITIAL_REVIEWS = {
  'zenvy-signature-watch': [
    { id: 'r1', userName: 'Sarah Khan', rating: 5, comment: 'Absolutely stunning smart watch! Delivered in Lahore in less than 15 hours. The physical gold trim finish is exceptionally high quality.', date: 'Jun 12, 2026' },
    { id: 'r2', userName: 'M. Bilal', rating: 5, comment: 'A luxury statement piece with gorgeous AMOLED dials. Authenticity stamp holds perfectly.', date: 'Jun 18, 2026' }
  ],
  'silk-radiance-serum': [
    { id: 'r3', userName: 'Aisha Ahmad', rating: 5, comment: 'This serum is magic! Feels incredibly nourishing, absorption is ultra smooth. Dropper is so sleek.', date: 'May 28, 2026' },
    { id: 'r4', userName: 'Zoya Baig', rating: 4, comment: 'Fabulous daily repair serum. Skin glows instantly.', date: 'Jun 05, 2026' }
  ],
  'noise-cancelling-earbuds': [
    { id: 'r5', userName: 'Haris Malik', rating: 5, comment: 'Absolute studio isolation. Noise cancelling blocks out Rawalpindi road traffic perfectly.', date: 'Jun 10, 2026' }
  ],
  'classic-leather-shoes': [
    { id: 'r6', userName: 'Kamran Shah', rating: 5, comment: 'Beautiful calfskin stitchwork. True bespoke quality that easily rivals European designs.', date: 'Jun 14, 2026' }
  ]
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('zenvy_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  
  // Custom Reviews Database State
  const [reviewsDB, setReviewsDB] = useState(INITIAL_REVIEWS);

  useEffect(() => {
    localStorage.setItem('zenvy_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const activeReviews = useMemo(() => {
    if (!selectedProduct) return [];
    return reviewsDB[selectedProduct.id] || [
      { id: 'default-r', userName: 'Collector Reviewer', rating: selectedProduct.rating, comment: 'Exquisite curation. Matches described high-end specifications flawlessly.', date: 'Jun 01, 2026' }
    ];
  }, [selectedProduct, reviewsDB]);

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setActiveScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (details) => {
    setOrderDetails(details);
    setCartItems([]);
    setCheckoutOpen(false);
  };

  const handleAddReview = (newReview) => {
    if (!selectedProduct) return;
    setReviewsDB((prev) => {
      const current = prev[selectedProduct.id] || [];
      return {
        ...prev,
        [selectedProduct.id]: [newReview, ...current],
      };
    });
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] select-none text-[#F0F0F0]">
      <Header
        activeScreen={activeScreen}
        setActiveScreen={(scr) => {
          setActiveScreen(scr);
          if (scr !== 'detail') setSelectedProduct(null);
        }}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 w-full bg-[#0A0A0A] relative">
        {orderDetails ? (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8 animate-scaleUp">
            <div className="w-20 h-20 bg-[#1A1A1A] rounded-full border border-[#333] flex items-center justify-center mx-auto text-amber-400 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/35">
                ORDER DISPATCH CONSTITUTED
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-white tracking-tight">
                Order Confirmed!
              </h2>
              <p className="text-sm text-[#888888] max-w-md mx-auto leading-relaxed">
                Thank you for shopping at Zenvy Mart. Your boutique dispatch order has been sent to our packing department hubs.
              </p>
            </div>

            <div className="bg-[#111111] rounded-2xl border border-[#222] p-6 sm:p-8 text-left space-y-4 shadow-sm font-sans max-w-xl mx-auto">
              <div className="flex justify-between border-b border-[#222] pb-3 text-xs text-[#888888] font-mono">
                <span>ORDER NUMBER</span>
                <span className="font-bold text-white">{orderDetails.orderId}</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#888888]">
                <p><b className="text-[#F0F0F0]">Collector Name:</b> {orderDetails.name}</p>
                <p><b className="text-[#F0F0F0]">Contact details:</b> {orderDetails.phone} | {orderDetails.email}</p>
                <p><b className="text-[#F0F0F0]">Shipping Hub destination:</b> {orderDetails.address}, {orderDetails.city}, Pakistan</p>
              </div>

              <div className="border-t border-b border-[#222] py-3 text-xs space-y-2">
                <p className="text-[10px] font-bold uppercase text-[#555] tracking-wider">Purchased items</p>
                {orderDetails.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center text-[11px]">
                    <span className="text-[#888888] font-medium line-clamp-1">{item.product.name} (x{item.quantity})</span>
                    <span className="font-mono font-semibold text-white">{formatPrice(item.product.price * item.quantity, currency)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-white font-bold text-sm">
                <span>Total amount (Paid upon delivery)</span>
                <span className="font-mono text-amber-400">{formatPrice(orderDetails.total, currency)}</span>
              </div>
            </div>

            <div className="space-y-3 max-w-sm mx-auto">
              <button
                onClick={() => {
                  setOrderDetails(null);
                  setActiveScreen('home');
                }}
                className="w-full bg-white hover:bg-neutral-200 text-black font-sans text-xs font-bold py-3.5 rounded-xl transition-colors shadow"
              >
                Return to Homepage
              </button>
              
              <p className="text-[10px] text-[#555] font-mono">
                * An express delivery verification SMS has been triggered.
              </p>
            </div>
          </div>
        ) : (
          <div className="transition-all duration-300">
            {activeScreen === 'home' && (
              <HomeScreen
                onGoToCollection={() => setActiveScreen('collection')}
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                currency={currency}
              />
            )}

            {activeScreen === 'collection' && (
              <CollectionScreen
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
                currency={currency}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {activeScreen === 'detail' && selectedProduct && (
              <DetailScreen
                product={selectedProduct}
                currency={currency}
                onBack={() => setActiveScreen('collection')}
                onAddToCart={handleAddToCart}
                onViewProduct={handleViewProduct}
                onOpenReviewModal={() => setReviewModalOpen(true)}
                reviews={activeReviews}
              />
            )}

            {activeScreen === 'about' && <AboutScreen />}
          </div>
        )}
      </main>

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        onGoToCollection={() => setActiveScreen('collection')}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </div>
  );
}
