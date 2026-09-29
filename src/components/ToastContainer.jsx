import React from 'react';
import { CheckCircle2, Heart, Sparkles } from 'lucide-react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className="toast">
          {t.type === 'cart' && <CheckCircle2 size={18} color="var(--brand-emerald)" />}
          {t.type === 'wishlist' && <Heart size={18} color="#E63946" fill="#E63946" />}
          {t.type === 'info' && <Sparkles size={18} color="var(--brand-gold)" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
