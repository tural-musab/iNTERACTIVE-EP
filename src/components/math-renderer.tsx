'use client'

import { InlineMath, BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathRendererProps {
  text: string
  className?: string
}

export function MathRenderer({ text, className = '' }: MathRendererProps) {
  // Gelişmiş matematik formatlarını render et
  const renderMath = (text: string) => {
    // Matematik ifadelerini tespit et ve render et
    const parts = text.split(/(\$[^$]+\$|\$\$[^$]+\$\$)/g)
    
    return parts.map((part, index) => {
      // Inline math: $formula$
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const mathContent = part.slice(1, -1)
        try {
          return <InlineMath key={index} math={mathContent} />
        } catch (error) {
          console.error('Math rendering error:', error)
          return <span key={index} className="text-red-400">{part}</span>
        }
      }
      
      // Block math: $$formula$$
      if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
        const mathContent = part.slice(2, -2)
        try {
          return <BlockMath key={index} math={mathContent} />
        } catch (error) {
          console.error('Math rendering error:', error)
          return <span key={index} className="text-red-400">{part}</span>
        }
      }
      
      // Normal metin - basit matematik formatlarını işle
      return renderSimpleMath(part, index)
    })
  }
  
  // Basit matematik formatlarını render et
  const renderSimpleMath = (text: string, baseIndex: number) => {
    // Önce \cdot ifadelerini işle
    text = text.replace(/\\cdot/g, '·')
    
    // n^2, n_2, 3n+2 gibi formatları işle
    const parts = text.split(/(\w+\^\d+|\w+_\d+|\d+\w+|\w+\+\d+|\w+\-\d+)/g)
    
    return parts.map((part, index) => {
      const fullIndex = baseIndex * 1000 + index
      
      // n^2 formatını kontrol et
      const powerMatch = part.match(/^(\w+)\^(\d+)$/)
      if (powerMatch) {
        const base = powerMatch[1]
        const power = powerMatch[2]
        try {
          return (
            <InlineMath key={fullIndex} math={`${base}^{${power}}`} />
          )
        } catch (error) {
          return <span key={fullIndex}>{part}</span>
        }
      }
      
      // n_2 formatını kontrol et
      const subscriptMatch = part.match(/^(\w+)_(\d+)$/)
      if (subscriptMatch) {
        const base = subscriptMatch[1]
        const sub = subscriptMatch[2]
        try {
          return (
            <InlineMath key={fullIndex} math={`${base}_{${sub}}`} />
          )
        } catch (error) {
          return <span key={fullIndex}>{part}</span>
        }
      }
      
      // 3n+2 formatını kontrol et
      const expressionMatch = part.match(/^(\d+)(\w+)([+\-])(\d+)$/)
      if (expressionMatch) {
        const num1 = expressionMatch[1]
        const variable = expressionMatch[2]
        const operator = expressionMatch[3]
        const num2 = expressionMatch[4]
        try {
          return (
            <InlineMath key={fullIndex} math={`${num1}${variable}${operator}${num2}`} />
          )
        } catch (error) {
          return <span key={fullIndex}>{part}</span>
        }
      }
      
      // Normal metin
      return <span key={fullIndex}>{part}</span>
    })
  }
  
  return (
    <span className={className}>
      {renderMath(text)}
    </span>
  )
}

// Gelişmiş matematik ifadeleri için yardımcı fonksiyon
export function formatMathText(text: string): string {
  // n^2 -> n^{2}
  text = text.replace(/(\w+)\^(\d+)/g, '$1^{$2}')
  // n_2 -> n_{2}
  text = text.replace(/(\w+)_(\d+)/g, '$1_{$2}')
  // 3n+2 -> 3n+2 (KaTeX formatında)
  text = text.replace(/(\d+)(\w+)([+\-])(\d+)/g, '$1$2$3$4')
  // * -> \cdot
  text = text.replace(/\*/g, '\\cdot ')
  
  return text
} 