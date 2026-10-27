import React from 'react';
import clsx from 'clsx';

/**
 * Ícone oficial do Projeto YBY idêntico ao protótipo do Figma.
 * Extraído diretamente do símbolo oficial fornecido pelo usuário.
 *
 * @param {Object} props
 * @param {'dark'|'green'|'white'|'original'|'black'} [props.variant='dark'] - Variante de cor
 * @param {string} [props.className] - Classes Tailwind para tamanho (ex: w-6 h-6)
 * @param {string} [props.alt] - Texto alternativo
 */
export function YbyIcon({
  variant = 'dark',
  className = 'w-6 h-6',
  alt = 'YBY',
  ...rest
}) {
  const iconConfig = {
    dark: { src: '/yby-icon-dark.png', src2x: '/yby-icon-dark@2x.png' },
    green: { src: '/yby-icon-green.png', src2x: '/yby-icon-green@2x.png' },
    white: { src: '/yby-icon-white.png', src2x: '/yby-icon-white@2x.png' },
    original: { src: '/yby-symbol-original.png', src2x: '/yby-symbol-original.png' },
    black: { src: '/yby-icon-black.png', src2x: '/yby-icon-black.png' },
  }[variant] || { src: '/yby-icon-dark.png', src2x: '/yby-icon-dark@2x.png' };

  return (
    <img
      src={iconConfig.src}
      srcSet={`${iconConfig.src} 1x, ${iconConfig.src2x} 2x`}
      alt={alt}
      className={clsx('object-contain inline-block select-none flex-shrink-0', className)}
      loading="eager"
      {...rest}
    />
  );
}

/**
 * Logotipo oficial completo do YBY (Ícone oficial + Texto "yby").
 *
 * @param {Object} props
 * @param {'dark'|'white'|'green'} [props.variant='dark']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.className]
 */
export function YbyLogo({
  variant = 'dark',
  size = 'md',
  className = '',
}) {
  const sizeConfig = {
    sm: { icon: 'w-5 h-5', text: 'text-lg', gap: 'gap-1.5' },
    md: { icon: 'w-7 h-7', text: 'text-xl', gap: 'gap-2' },
    lg: { icon: 'w-9 h-9', text: 'text-2xl', gap: 'gap-2.5' },
  }[size] || sizeConfig.md;

  const textColor = {
    dark: 'text-yby-heading',
    white: 'text-white',
    green: 'text-yby-primary',
  }[variant] || 'text-yby-heading';

  const iconVariant = variant === 'white' ? 'white' : 'green';

  return (
    <div className={clsx('flex items-center select-none', sizeConfig.gap, className)}>
      <YbyIcon variant={iconVariant} className={sizeConfig.icon} />
      <span className={clsx('font-extrabold tracking-tight', sizeConfig.text, textColor)}>
        YBY
      </span>
    </div>
  );
}
