import React from 'react';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  onAddToCart
}) {
  const formatPrice = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <div className="product-card">
      {/* Image & Badges */}
      <div className="card-image-wrap" onClick={() => onOpenQuickView(product)} style={{ cursor: 'pointer' }}>
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.badge && (
          <span className={`card-badge badge-${product.badgeType}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          title={isWishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart size={18} fill={isWishlisted ? '#E63946' : 'none'} />
        </button>
      </div>

      {/* Body Details */}
      <div className="card-body">
        <span className="card-category">{product.categoryLabel}</span>
        
        <h3 className="card-title" onClick={() => onOpenQuickView(product)} style={{ cursor: 'pointer' }}>
          {product.name}
        </h3>

        <p className="card-tagline">{product.tagline}</p>

        {/* Rating Stars */}
        <div className="card-rating">
          <div className="stars-list">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? '#FFB800' : 'none'}
                color="#FFB800"
              />
            ))}
          </div>
          <span><strong>{product.rating}</strong> ({product.reviewsCount})</span>
        </div>

        {/* Footer & Price */}
        <div className="card-footer">
          <div className="card-prices">
            {product.originalPrice && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
            <span className="price-current">{formatPrice(product.price)}</span>
            <span className="price-installment">{product.installment}</span>
          </div>

          <button
            className="add-cart-btn"
            onClick={() => onAddToCart(product)}
            title="Adicionar ao Carrinho"
          >
            <ShoppingBag size={16} />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
