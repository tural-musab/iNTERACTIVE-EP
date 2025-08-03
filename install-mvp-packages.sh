#!/bin/bash
# interactive-EP MVP için gerekli paketlerin kurulumu

# Gamification ve animasyon paketleri
npm install framer-motion react-spring @react-spring/web

# State management
npm install zustand

# Analitik ve grafikler
npm install recharts

# PDF Export (MVP sonrası için)
npm install jspdf html2canvas

# Form işlemleri
npm install react-hook-form zod @hookform/resolvers

# Ses efektleri
npm install howler

# Utility kütüphaneler
npm install clsx tailwind-merge date-fns

# Dev dependencies
npm install --save-dev @types/howler

echo "✅ Tüm paketler başarıyla yüklendi!" 