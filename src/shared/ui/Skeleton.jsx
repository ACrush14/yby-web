import React from 'react';

/**
 * Componente atômico de Skeleton Loading com efeito shimmer refinado.
 * Segue rigorosamente a paleta de cores e raios do Design System YBY.
 *
 * @param {Object} props
 * @param {string} [props.className] - Classes Tailwind para layout e dimensões
 * @param {'text' | 'circular' | 'rectangular' | 'card'} [props.variant='rectangular'] - Formato do esqueleto
 * @param {number|string} [props.width] - Largura específica
 * @param {number|string} [props.height] - Altura específica
 * @param {React.CSSProperties} [props.style] - Estilos inline adicionais
 */
export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  style = {},
  ...rest
}) {
  const variantMap = {
    text: 'h-4 rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'rounded-2xl border border-yby-border/60',
  };

  const inlineStyles = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  return (
    <div
      role="status"
      aria-label="Carregando..."
      className={`yby-skeleton ${variantMap[variant] || 'rounded-xl'} ${className}`}
      style={inlineStyles}
      {...rest}
    />
  );
}
