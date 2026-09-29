import React, { useState } from 'react';
import { X, CheckCircle, QrCode, CreditCard, FileText, Lock, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, cart, appliedCoupon, onClearCart }) {
  const [step, setStep] = useState(1);
  const [copiedPix, setCopiedPix] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [formData, setFormData] = useState({
    name: 'Ana Clara Souza',
    email: 'anaclara@exemplo.com.br',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    cep: '01310-100',
    street: 'Av. Paulista',
    number: '1000',
    complement: 'Apto 142',
    neighborhood: 'Bela Vista',
    city: 'São Paulo',
    state: 'SP',
    cardNumber: '4532 •••• •••• 8892',
    cardName: 'ANA C SOUZA',
    cardExpiry: '10/28',
    cardCvc: '882',
    installments: '1'
  });

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  let discountPercentage = 0;
  if (appliedCoupon === 'BEMVINDA10') discountPercentage = 0.10;
  if (appliedCoupon === 'QUIZGLOW15' || appliedCoupon === 'BELEZAVIP') discountPercentage = 0.15;
  
  // Extra 5% off for PIX
  if (paymentMethod === 'pix') discountPercentage += 0.05;

  const discountAmount = subtotal * discountPercentage;
  const isFreeShipping = subtotal >= 199.00;
  const shippingCost = isFreeShipping ? 0 : 19.90;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
  };

  const handleCopyPix = () => {
    navigator.clipboard?.writeText('00020126580014br.gov.bcb.pix0136a89c2f5d-71b3-4f9e-9d21-aurelialuxe88925204000053039865405189.905802BR5920AURELIA BOTANICALS6009SAO PAULO620705031236304E8A9');
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleFinishOrder = () => {
    setStep(3);
    onClearCart();
    
    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const mockOrderNumber = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
  const mockTrackingCode = 'BR' + Math.floor(100000000 + Math.random() * 900000000) + 'SL';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Steps Bar */}
        <div className="checkout-steps-bar">
          <div className={`checkout-step-item ${step === 1 ? 'active' : ''}`}>
            1. Dados & Entrega
          </div>
          <div className={`checkout-step-item ${step === 2 ? 'active' : ''}`}>
            2. Pagamento
          </div>
          <div className={`checkout-step-item ${step === 3 ? 'active' : ''}`}>
            3. Confirmação
          </div>
        </div>

        <div className="checkout-body">
          {/* STEP 1: Personal & Shipping */}
          {step === 1 && (
            <div>
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Dados Pessoais & Endereço de Entrega</h3>
              
              <div className="form-grid">
                <div className="form-group full">
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">E-mail para Rastreio</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CPF</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">CEP (Auto-preenchimento)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.cep}
                    onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Rua / Logradouro</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Número</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Bairro</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cidade / UF</label>
                  <input
                    type="text"
                    className="form-control"
                    value={`${formData.city} - ${formData.state}`}
                    readOnly
                  />
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => setStep(2)}>
                  Ir para Pagamento
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Payment */}
          {step === 2 && (
            <div>
              <h3 style={{ marginBottom: '1.25rem', fontSize: '1.25rem' }}>Escolha a Forma de Pagamento</h3>

              <div className="payment-options">
                <div
                  className={`payment-card ${paymentMethod === 'pix' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('pix')}
                >
                  <QrCode size={24} style={{ color: 'var(--brand-emerald)', marginBottom: '0.35rem' }} />
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>PIX Instantâneo</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--brand-emerald)', fontWeight: '600' }}>
                    + 5% OFF Extra
                  </div>
                </div>

                <div
                  className={`payment-card ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={24} style={{ color: 'var(--brand-gold)', marginBottom: '0.35rem' }} />
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Cartão de Crédito</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Até 6x sem juros</div>
                </div>

                <div
                  className={`payment-card ${paymentMethod === 'boleto' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('boleto')}
                >
                  <FileText size={24} style={{ color: 'var(--text-muted)', marginBottom: '0.35rem' }} />
                  <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Boleto Bancário</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vencimento 3 dias</div>
                </div>
              </div>

              {/* PIX Details */}
              {paymentMethod === 'pix' && (
                <div className="pix-qr-container">
                  <div style={{ background: '#FFFFFF', padding: '1rem', width: '160px', margin: '0 auto 1rem auto', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                      <rect width="100" height="100" fill="#FFFFFF"/>
                      <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M22,22 h6 v6 h-6 z M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M72,22 h6 v6 h-6 z M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M22,72 h6 v6 h-6 z M50,50 h10 v10 h-10 z M70,50 h20 v10 h-20 z M50,70 h15 v20 h-15 z M75,70 h15 v20 h-15 z" fill="#1B3B2B"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Escaneie o QR Code acima no app do seu banco ou copie o código Pix Copia e Cola:
                  </p>
                  
                  <div className="pix-code-box">
                    00020126580014br.gov.bcb.pix0136a89c2f5d-71b3-4f9e-9d21-aurelialuxe8892520400005303986...
                  </div>

                  <button className="btn btn-outline btn-sm" onClick={handleCopyPix}>
                    {copiedPix ? <Check size={16} color="green" /> : <Copy size={16} />}
                    {copiedPix ? 'Chave PIX Copiada!' : 'Copiar Chave PIX'}
                  </button>
                </div>
              )}

              {/* Credit Card Details */}
              {paymentMethod === 'card' && (
                <div className="form-grid" style={{ background: 'var(--bg-surface-elevated)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <div className="form-group full">
                    <label className="form-label">Número do Cartão</label>
                    <input type="text" className="form-control" value={formData.cardNumber} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Validade</label>
                    <input type="text" className="form-control" value={formData.cardExpiry} readOnly />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVC</label>
                    <input type="text" className="form-control" value={formData.cardCvc} readOnly />
                  </div>
                  <div className="form-group full">
                    <label className="form-label">Opção de Parcelamento</label>
                    <select className="form-control">
                      <option>1x de {formatPrice(total)} (Sem juros)</option>
                      <option>2x de {formatPrice(total / 2)} (Sem juros)</option>
                      <option>3x de {formatPrice(total / 3)} (Sem juros)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Order Total Summary */}
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--brand-gold-light)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: 'var(--brand-gold-hover)' }}>Total a Pagar:</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  {formatPrice(total)}
                </span>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className="btn btn-outline" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button className="btn btn-primary" onClick={handleFinishOrder}>
                  <Lock size={16} /> Confirmar & Pagar
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Completed */}
          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--brand-gold-light)', color: 'var(--brand-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <CheckCircle size={40} />
              </div>

              <span className="quiz-banner-tag" style={{ color: 'var(--brand-gold)' }}>
                Pedido Confirmado com Sucesso!
              </span>

              <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
                Obrigado por comprar na Aurélia!
              </h2>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
                Enviamos os detalhes do seu pedido e o código de rastreamento para o e-mail <strong>{formData.email}</strong>.
              </p>

              <div style={{ background: 'var(--bg-surface-elevated)', padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'inline-block', textAlign: 'left', minWidth: '300px', marginBottom: '2rem', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Número do Pedido: <strong style={{ color: 'var(--text-main)' }}>{mockOrderNumber}</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Código de Rastreio: <strong style={{ color: 'var(--brand-gold)' }}>{mockTrackingCode}</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Previsão de Entrega: <strong style={{ color: 'var(--brand-emerald)' }}>3 a 5 dias úteis</strong>
                </div>
              </div>

              <div>
                <button className="btn btn-primary" onClick={onClose}>
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
