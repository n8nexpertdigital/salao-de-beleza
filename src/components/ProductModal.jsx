import React, { useState } from 'react';
import { X, Star, CheckCircle, ShoppingBag, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content product-modal-grid" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Product Image */}
        <div>
          <img src={product.image} alt={product.name} className="modal-product-img" />
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {product.ingredients?.map((ing, idx) => (
              <span key={idx} className="modal-ingredient-tag">
                <Sparkles size={12} />
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="modal-product-info">
          <span className="card-category">{product.categoryLabel} • {product.volume}</span>
          <h2 className="modal-product-title">{product.name}</h2>

          <div className="card-rating" style={{ marginBottom: '1rem' }}>
            <div className="stars-list">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.rating) ? '#FFB800' : 'none'}
                  color="#FFB800"
                />
              ))}
            </div>
            <span><strong>{product.rating}</strong> ({product.reviewsCount} avaliações verificadas)</span>
          </div>

          <div className="modal-product-price">
            {formatPrice(product.price)}
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '0.5rem' }}>
              ({product.installment})
            </span>
          </div>

          <p className="modal-product-desc">{product.description}</p>

          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'var(--font-body)', fontWeight: '700' }}>
            Benefícios Principais:
          </h4>
          <ul className="modal-feature-list">
            {product.benefits?.map((benefit, idx) => (
              <li key={idx} className="modal-feature-item">
                <CheckCircle size={16} color="var(--brand-emerald)" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 'auto' }}>
            {/* Quantity Selector */}
            <div className="modal-qty-row">
              <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Quantidade:</span>
              <div className="qty-counter">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                className={`icon-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title="Favoritar"
              >
                <Heart size={18} fill={isWishlisted ? '#E63946' : 'none'} />
              </button>
            </div>

            {/* Actions */}
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleAdd}>
              <ShoppingBag size={18} />
              Adicionar ao Carrinho • {formatPrice(product.price * quantity)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
