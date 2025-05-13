export const colors = {
  dark: {
    background: '#0f172a',
    card: '#1e293b',
    text: '#ffffff',
    textSecondary: '#94a3b8',
    textTertiary: '#64748b',
    primary: '#3b82f6',
    border: '#2d3748',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    overlay: 'rgba(255, 255, 255, 0.1)',
    badge: '#374151',
    cardHover: '#283548',
  },
  light: {
    background: '#ffffff',
    card: '#f8fafc',
    text: '#0f172a',
    textSecondary: '#475569',
    textTertiary: '#64748b',
    primary: '#3b82f6',
    border: '#e2e8f0',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    overlay: 'rgba(0, 0, 0, 0.05)',
    badge: '#f1f5f9',
    cardHover: '#f1f5f9',
  },
};

export type Theme = typeof colors.light;