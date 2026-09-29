import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sun, Moon, Sparkles, Menu, X } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  theme,
  toggleTheme,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Todos os Produtos' },
    { id: 'skincare', label: 'Skincare' },
    { id: 'haircare', label: 'Cabelos' },
    { id: 'makeup', label: 'Maquiagem' },
    { id: 'perfume', label: 'Perfumes' },
    { id: 'kits', label: 'Kits Promocionais' }
  ];

  return (
    <>
      {/* Top Announcement Strip */}
      <div className="announcement-bar">
        <span>✨ Cupom VIP: <strong className="announcement-code">BEMVINDA10</strong> para 10% OFF no primeiro pedido</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span>🚚 Frete Grátis para todo o Brasil acima de R$ 199</span>
      </div>

      {/* Main Navbar */}
      <header className="navbar">
        <div className="container navbar-inner">
          {/* Mobile Menu Toggle */}
          <button
            className="icon-btn"
            style={{ display: 'none' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand Logo */}
          <div className="brand-logo" onClick={() => setActiveCategory('all')} style={{ cursor: 'pointer' }}>
            <span className="brand-title">Aurélia</span>
            <span className="brand-subtitle">BOTANICALS & HAUTE BEAUTÉ</span>
          </div>

          {/* Nav Categories */}
          <nav>
            <ul className="nav-links">
              {categories.slice(0, 5).map(cat => (
                <li
                  key={cat.id}
                  className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </li>
              ))}
              <li>
                <button className="quiz-badge-btn" onClick={onOpenQuiz}>
                  <Sparkles size={14} />
                  Quiz da Sua Pele
                </button>
              </li>
            </ul>
          </nav>

          {/* Search & Actions */}
          <div className="nav-actions">
            <div className="search-container">
              <Search className="search-icon-inside" size={16} />
              <input
                type="text"
                className="search-input"
                placeholder="Buscar produtos, ativos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Theme Toggle */}
            <button className="icon-btn" onClick={toggleTheme} title="Alternar Modo Claro/Escuro">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Wishlist Icon */}
            <button className="icon-btn" onClick={onOpenWishlist} title="Lista de Desejos">
              <Heart size={18} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </button>

            {/* Shopping Cart Icon */}
            <button className="icon-btn" onClick={onOpenCart} title="Carrinho de Compras">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
