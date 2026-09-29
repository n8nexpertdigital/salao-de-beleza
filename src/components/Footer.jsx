import React, { useState } from 'react';
import { Send, Globe, MessageCircle, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onOpenQuiz }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <span className="footer-brand-title">Aurélia Botanicals</span>
            <p className="footer-desc">
              Sua loja virtual de cosméticos de alta performance. Ingredientes botânicos puros, fórmulas veganas e biotecnologia para o seu ritual de beleza diário.
            </p>

            <div style={{ display: 'flex', gap: '1rem', color: '#D6AA66' }}>
              <a href="#loja" aria-label="Website"><Globe size={20} /></a>
              <a href="#whatsapp" aria-label="WhatsApp"><MessageCircle size={20} /></a>
              <a href="#clube" aria-label="Clube VIP"><Sparkles size={20} /></a>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="footer-column-title">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#skincare" className="footer-link">Skincare Facial</a></li>
              <li><a href="#cabelos" className="footer-link">Cuidados Capilares</a></li>
              <li><a href="#maquiagem" className="footer-link">Maquiagem de Luxo</a></li>
              <li><a href="#perfumes" className="footer-link">Perfumaria Fina</a></li>
              <li><button onClick={onOpenQuiz} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Quiz da Pele</button></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="footer-column-title">Ajuda & Suporte</h4>
            <ul className="footer-links">
              <li><a href="#faq" className="footer-link">Perguntas Frequentes</a></li>
              <li><a href="#rastreio" className="footer-link">Rastrear Pedido</a></li>
              <li><a href="#trocas" className="footer-link">Política de Trocas</a></li>
              <li><a href="#frete" className="footer-link">Prazos de Entrega</a></li>
              <li><a href="#contato" className="footer-link">Fale Conosco</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="footer-column-title">Clube Aurélia VIP</h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(250,248,245,0.7)', marginBottom: '1rem' }}>
              Receba ofertas exclusivas, lançamentos em primeira mão e 10% OFF no seu primeiro pedido.
            </p>

            {subscribed ? (
              <div style={{ padding: '0.75rem', background: 'rgba(214,170,102,0.2)', color: '#D6AA66', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
                ✨ Inscrição realizada! Verifique seu e-mail para o cupom.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{ flexGrow: 1, padding: '0.65rem 0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#FFF', fontSize: '0.85rem' }}
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '0.65rem 1rem' }}>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © 2026 Aurélia Botanicals & Haute Beauté Ltda. CNPJ 12.345.678/0001-90. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Feito com</span> <Heart size={14} color="#D6AA66" fill="#D6AA66" /> <span>para o nicho da Beleza</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
