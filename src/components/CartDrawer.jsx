import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Check, Truck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  setAppliedCoupon
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 199.00;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  // Calculate discount percentage
  let discountPercentage = 0;
  if (appliedCoupon === 'BEMVINDA10') discountPercentage = 0.10;
  if (appliedCoupon === 'QUIZGLOW15' || appliedCoupon === 'BELEZAVIP') discountPercentage = 0.15;

  const discountAmount = subtotal * discountPercentage;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = subtotal === 0 ? 0 : (isFreeShipping ? 0 : 19.90);
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const progressPercentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (cleanCode === 'BEMVINDA10' || cleanCode === 'QUIZGLOW15' || cleanCode === 'BELEZAVIP') {
      setAppliedCoupon(cleanCode);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido. Tente BEMVINDA10 ou QUIZGLOW15');
    }
  };

  const formatPrice = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={22} color="var(--brand-gold)" />
            <span>Seu Carrinho ({cart.reduce((acc, i) => acc + i.quantity, 0)})</span>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="free-shipping-bar">
          <div className="shipping-msg">
            {isFreeShipping ? (
              <span>🎉 Parabéns! Você ganhou <strong>FRETE GRÁTIS</strong>!</span>
            ) : (
              <span>
                Faltam <strong>{formatPrice(remainingForFreeShipping)}</strong> para FRETE GRÁTIS!
              </span>
            )}
          </div>
          <div className="shipping-progress-bg">
            <div
              className="shipping-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Body / Items */}
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={48} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
              <h3>Seu carrinho está vazio</h3>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Explore nossos cosméticos botânicos e adicione seus favoritos.
              </p>
              <button
                className="btn btn-outline"
                style={{ marginTop: '1.5rem' }}
                onClick={onClose}
              >
                Explorar Produtos
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                
                <div className="cart-item-details">
                  <span className="cart-item-title">{item.name}</span>
                  <span className="cart-item-price">{formatPrice(item.price)}</span>

                  <div className="cart-item-actions">
                    <div className="qty-counter">
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remover item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Coupon Form */}
            <form onSubmit={handleApplyCoupon} className="coupon-row">
              <input
                type="text"
                className="coupon-input"
                placeholder="CUPOM DE DESCONTO"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="btn btn-outline btn-sm">
                <Tag size={14} /> Aplicar
              </button>
            </form>
            {couponError && <p style={{ fontSize: '0.75rem', color: '#D93838', marginTop: '-0.75rem', marginBottom: '0.5rem' }}>{couponError}</p>}
            {appliedCoupon && (
              <p style={{ fontSize: '0.8rem', color: 'var(--brand-emerald)', fontWeight: '600', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Check size={14} /> Cupom {appliedCoupon} aplicado ({(discountPercentage * 100)}% OFF)
              </p>
            )}

            {/* Price Calculations */}
            <div className="cart-summary-line">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="cart-summary-line" style={{ color: 'var(--brand-emerald)' }}>
                <span>Desconto Cupom:</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Frete:</span>
              <span>{isFreeShipping ? <strong style={{ color: 'var(--brand-emerald)' }}>GRÁTIS</strong> : formatPrice(shippingCost)}</span>
            </div>

            <div className="cart-summary-line cart-summary-total">
              <span>Total Estimado:</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.25rem' }}
              onClick={onProceedToCheckout}
            >
              Finalizar Compra Segura
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
