import React from 'react';

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: 'full' | 'icon';
}

export function Logo({ variant = 'full', className, ...props }: LogoProps) {
  const isFull = variant === 'full';
  const viewBox = isFull ? '0 0 240 64' : '0 0 70 64';

  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g transform="translate(4, 8)">
        <g fill="#F57C00">
          <path d="M 18,0 L 18,48 L 8,48 A 8,8 0 0 1 0,40 L 0,8 A 8,8 0 0 1 8,0 Z" />
          <path d="M 42,0 L 42,48 L 52,48 A 8,8 0 0 0 60,40 L 60,8 A 8,8 0 0 0 52,0 Z" />
          <rect x="18" y="26" width="24" height="12" />
          <path d="M 18,40 L 42,40 L 42,28 Z" fill="black" fillOpacity={0.1} />
        </g>

        <path d="M 0,8 A 8,8 0 0 1 8,0 L 52,0 A 8,8 0 0 1 60,8 L 60,10 L 30,24 L 0,10 Z" fill="#FF9800" />
        <path d="M 0,10 L 30,24 L 60,10" fill="none" stroke="white" strokeOpacity={0.15} strokeWidth={1} />
      </g>

      {isFull && (
        <text
          x="75"
          y="46"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="bold"
          fontSize="40"
          fill="#E65100"
          letterSpacing="0.5"
        >
          Hinbox
        </text>
      )}
    </svg>
  );
}
