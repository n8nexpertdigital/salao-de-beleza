import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';

export default function BeautyQuizModal({ isOpen, onClose, products, onAddToCartCombo }) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    skinHairType: '',
    routine: ''
  });

  if (!isOpen) return null;

  const handleSelectGoal = (val) => {
    setAnswers({ ...answers, goal: val });
  };

  const handleSelectType = (val) => {
    setAnswers({ ...answers, skinHairType: val });
  };

  const handleSelectRoutine = (val) => {
    setAnswers({ ...answers, routine: val });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ goal: '', skinHairType: '', routine: '' });
  };

  // Find recommended products based on answers
  const getRecommendedProducts = () => {
    if (answers.goal === 'hair') {
      return products.filter(p => p.category === 'haircare' || p.category === 'kits');
    }
    if (answers.goal === 'glow' || answers.goal === 'aging') {
      return products.filter(p => p.category === 'skincare' || p.category === 'kits');
    }
    return [products[0], products[1]];
  };

  const recommendedList = getRecommendedProducts();

  const handleAddCombo = () => {
    recommendedList.forEach(prod => onAddToCartCombo(prod));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="quiz-wizard">
          {/* Progress Bar */}
          <div className="quiz-step-indicator">
            <div className={`quiz-step-pill ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`quiz-step-pill ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`quiz-step-pill ${step >= 3 ? 'active' : ''}`}></div>
          </div>

          {/* Step 1: Goal */}
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-gold)', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                <Sparkles size={16} /> Passo 1 de 3
              </div>
              <h2 className="quiz-question-title">Qual é o seu foco principal de beleza hoje?</h2>
              <p className="quiz-question-desc">Selecione a meta que você mais deseja alcançar nos próximos 30 dias.</p>

              <div className="quiz-options-grid">
                <div
                  className={`quiz-option-card ${answers.goal === 'glow' ? 'selected' : ''}`}
                  onClick={() => handleSelectGoal('glow')}
                >
                  <div className="quiz-option-icon">✨</div>
                  <div className="quiz-option-label">Luminosidade & Vulto</div>
                  <div className="quiz-option-sub">Pele radiante, uniforme e sem manchas</div>
                </div>

                <div
                  className={`quiz-option-card ${answers.goal === 'hair' ? 'selected' : ''}`}
                  onClick={() => handleSelectGoal('hair')}
                >
                  <div className="quiz-option-icon">💆‍♀️</div>
                  <div className="quiz-option-label">Reconstrução Capilar</div>
                  <div className="quiz-option-sub">Eliminar o frizz e restaurar brilho aos fios</div>
                </div>

                <div
                  className={`quiz-option-card ${answers.goal === 'aging' ? 'selected' : ''}`}
                  onClick={() => handleSelectGoal('aging')}
                >
                  <div className="quiz-option-icon">🌿</div>
                  <div className="quiz-option-label">Firmador & Antidade</div>
                  <div className="quiz-option-sub">Suavizar linhas e estimular o colágeno</div>
                </div>
              </div>

              <div className="quiz-actions" style={{ justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-primary"
                  disabled={!answers.goal}
                  onClick={handleNext}
                  style={{ opacity: answers.goal ? 1 : 0.5 }}
                >
                  Próximo Passo
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Skin/Hair Type */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--brand-gold)', fontWeight: '700', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                <Sparkles size={16} /> Passo 2 de 3
              </div>
              <h2 className="quiz-question-title">Como você descreve seu tipo de pele ou cabelo?</h2>
              <p className="quiz-question-desc">Isso garante que a textura e os ativos sejam 100% compatíveis.</p>

              <div className="quiz-options-grid">
                <div
                  className={`quiz-option-card ${answers.skinHairType === 'mixed' ? 'selected' : ''}`}
                  onClick={() => handleSelectType('mixed')}
                >
                  <div className="quiz-option-icon">💧</div>
                  <div className="quiz-option-label">Mista a Oleosa</div>
                  <div className="quiz-option-sub">Prefere texturas leves e livres de óleos</div>
                </div>

                <div
                  className={`quiz-option-card ${answers.skinHairType === 'dry' ? 'selected' : ''}`}
                  onClick={() => handleSelectType('dry')}
                >
                  <div className="quiz-option-icon">🌸</div>
                  <div className="quiz-option-label">Seca a Sensível</div>
                  <div className="quiz-option-sub">Necessita de hidratação intensa e acalento</div>
                </div>

                <div
                  className={`quiz-option-card ${answers.skinHairType === 'normal' ? 'selected' : ''}`}
                  onClick={() => handleSelectType('normal')}
                >
                  <div className="quiz-option-icon">⭐</div>
                  <div className="quiz-option-label">Normal a Danificada</div>
                  <div className="quiz-option-sub">Busca manutenção de saúde e viço</div>
                </div>
              </div>

              <div className="quiz-actions">
                <button className="btn btn-outline" onClick={() => setStep(1)}>
                  Voltar
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!answers.skinHairType}
                  onClick={handleNext}
                  style={{ opacity: answers.skinHairType ? 1 : 0.5 }}
                >
                  Ver Meu Diagnóstico
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Result Recommendation */}
          {step === 3 && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div className="quiz-banner-tag" style={{ color: 'var(--brand-gold)' }}>
                  🎉 Diagnóstico Concluído!
                </div>
                <h2 className="quiz-question-title" style={{ fontSize: '2rem' }}>
                  Sua Rotina de Beleza Personalizada
                </h2>
                <p className="quiz-question-desc">
                  Com base nas suas respostas, combinamos os tratamentos de alta performance perfeitos para você.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {recommendedList.map(prod => (
                  <div key={prod.id} className="quiz-result-box">
                    <img src={prod.image} alt={prod.name} className="quiz-result-img" />
                    <div>
                      <span className="card-category">{prod.categoryLabel}</span>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{prod.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{prod.tagline}</p>
                      <span style={{ fontWeight: '700', color: 'var(--brand-emerald)', marginTop: '0.35rem', display: 'block' }}>
                        R$ {prod.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--brand-gold-light)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', marginBottom: '1.5rem', border: '1px solid var(--brand-gold)' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--brand-gold-hover)' }}>
                  🎁 Ganhe 15% OFF EXTRA no Combo + Frete Grátis com o cupom: <u>QUIZGLOW15</u>
                </span>
              </div>

              <div className="quiz-actions">
                <button className="btn btn-outline" onClick={handleReset}>
                  <RefreshCw size={16} /> Refazer Quiz
                </button>
                <button className="btn btn-primary" onClick={handleAddCombo}>
                  <ShoppingBag size={18} /> Adicionar Combo Recomendado
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
