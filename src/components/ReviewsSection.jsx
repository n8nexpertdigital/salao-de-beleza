import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { REVIEWS_LIST } from '../data/products';

export default function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">Depoimentos & Experiências</span>
          <h2 className="section-title">O que nossas clientes dizem</h2>
          <p className="section-description">
            Mais de 15.000 entregas realizadas com nota média 4.9/5 em todo o Brasil.
          </p>
        </div>

        <div className="reviews-grid">
          {REVIEWS_LIST.map((rev) => (
            <div key={rev.id} className="review-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="stars-list">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
                <Quote size={24} color="var(--brand-gold)" style={{ opacity: 0.4 }} />
              </div>

              <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.6 }}>
                "{rev.text}"
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="review-user">
                  <div className="avatar-circle">{rev.avatar}</div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: '700' }}>{rev.author}</h5>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rev.city}</span>
                  </div>
                </div>

                <span className="verified-tag">
                  <ShieldCheck size={14} /> Cliente Verificada
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
