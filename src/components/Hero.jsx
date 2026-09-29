import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, CreditCard, Award } from 'lucide-react';

export default function Hero({ onOpenQuiz, onExploreClick }) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/images/hero_banner.jpg" alt="Aurélia Botanicals Luxury Beauty Banner" />
      </div>
      <div className="hero-overlay"></div>

      <div className="container" style={{ width: '100%' }}>
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={15} />
            <span>Fórmulas Limpas & Veganas</span>
          </div>

          <h1 className="hero-title">
            Desperte o Glow Natural da Sua Pele.
          </h1>

          <p className="hero-subtitle">
            Cosméticos de alta performance botânica com ativos biotecnológicos de altíssima pureza. Resultados visíveis na primeira semana.
          </p>

          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={onExploreClick}>
              Ver Coleção Completa
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary" onClick={onOpenQuiz}>
              <Sparkles size={18} />
              Diagnóstico de Pele Grátis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustFeatures() {
  const features = [
    {
      icon: <Award size={24} />,
      title: 'Fórmulas Veganas & Cruelty-Free',
      desc: '100% de ingrediente botânicos puros sem testes em animais.'
    },
    {
      icon: <Truck size={24} />,
      title: 'Entrega Expressa Brasil',
      desc: 'Frete Grátis nas compras acima de R$ 199,00.'
    },
    {
      icon: <CreditCard size={24} />,
      title: 'Até 6x Sem Juros ou PIX -5%',
      desc: 'Pagamento facilitado e 100% seguro com criptografia.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Garantia de Satisfação 30 Dias',
      desc: 'Devolução descomplica se não amar o resultado.'
    }
  ];

  return (
    <div className="container">
      <div className="features-strip">
        {features.map((item, idx) => (
          <div key={idx} className="feature-box">
            <div className="feature-icon-wrapper">
              {item.icon}
            </div>
            <div>
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
