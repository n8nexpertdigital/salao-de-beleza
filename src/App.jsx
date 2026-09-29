import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import Hero, { TrustFeatures } from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import BeautyQuizModal from './components/BeautyQuizModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import { INITIAL_PRODUCTS } from './data/products';
import { Sparkles, MessageCircle, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Interactive States
  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([
    { ...INITIAL_PRODUCTS[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState(['prod-1']);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const catalogRef = useRef(null);

  // Toggle Theme
  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Toast Trigger Helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Cart Handlers
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    addToast(`"${product.name}" foi adicionado ao carrinho!`, 'cart');
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    addToast('Item removido do carrinho.', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        addToast(`Removido dos favoritos.`, 'info');
        return prev.filter((id) => id !== product.id);
      } else {
        addToast(`"${product.name}" salvo nos favoritos!`, 'wishlist');
        return [...prev, product.id];
      }
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          activeCategory === 'all' || p.category === activeCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  const categoryTabs = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'haircare', label: 'Capilar' },
    { id: 'makeup', label: 'Maquiagem' },
    { id: 'perfume', label: 'Perfumes' },
    { id: 'kits', label: 'Kits Promocionais' }
  ];

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setActiveCategory('all');
          addToast(`Exibindo ${wishlist.length} produtos favoritados.`, 'info');
          scrollToCatalog();
        }}
        onOpenQuiz={() => setIsQuizOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Hero Banner */}
      <Hero
        onOpenQuiz={() => setIsQuizOpen(true)}
        onExploreClick={scrollToCatalog}
      />

      {/* Trust Badges Strip */}
      <TrustFeatures />

      {/* Catalog Main Section */}
      <main className="container" ref={catalogRef} style={{ flexGrow: 1 }}>
        <div className="section-header">
          <span className="section-subtitle">Fórmulas Exclusivas</span>
          <h2 className="section-title">Nossa Coleção de Beleza</h2>
          <p className="section-description">
            Descubra os produtos mais amados de alta cosmética botânica, desenvolvidos com biotecnologia limpa.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categoryTabs.map((cat) => (
            <button
              key={cat.id}
              className={`cat-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar */}
        <div className="catalog-controls">
          <span className="controls-count">
            Mostrando <strong>{filteredProducts.length}</strong> produtos
          </span>

          <div className="controls-actions">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <SlidersHorizontal size={16} />
              <span>Ordenar por:</span>
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Mais Vendidos & Em Destaque</option>
              <option value="rating">Melhor Avaliados (5.0)</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Nenhum produto encontrado</p>
              <p>Tente alterar sua busca ou selecionar outra categoria.</p>
              <button
                className="btn btn-outline"
                style={{ marginTop: '1rem' }}
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onOpenQuickView={setQuickViewProduct}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>

        {/* Beauty Diagnostic Quiz Banner */}
        <div className="quiz-banner">
          <div className="quiz-banner-text">
            <div className="quiz-banner-tag">
              ✨ Ferramenta Inteligente de Diagnóstico
            </div>
            <h2 className="quiz-banner-title">
              Não sabe por onde começar sua rotina de cuidados?
            </h2>
            <p className="quiz-banner-desc">
              Responda a 3 perguntas rápidas e descubra a combinação exata de ativos botânicos para o seu tipo de pele ou cabelo. Ganhe 15% OFF!
            </p>
            <button className="btn btn-secondary" onClick={() => setIsQuizOpen(true)}>
              <Sparkles size={18} />
              Fazer Quiz Personalizado
            </button>
          </div>
          <div className="quiz-banner-img">
            <img src="/images/kit_routine.jpg" alt="Kit Rotina Aurélia" />
          </div>
        </div>
      </main>

      {/* Customer Reviews & Testimonials */}
      <ReviewsSection />

      {/* Footer */}
      <Footer onOpenQuiz={() => setIsQuizOpen(true)} />

      {/* Floating Support Button (WhatsApp) */}
      <a
        href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20os%20produtos%20de%20beleza%20da%20Aur%C3%A9lia."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Falar com Especialista em Beleza no WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Beauty Quiz Wizard Modal */}
      <BeautyQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onAddToCartCombo={handleAddToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Step-by-step Checkout Simulation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        appliedCoupon={appliedCoupon}
        onClearCart={handleClearCart}
      />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}
