import * as React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="32"
        height="32"
        rx="8"
        className="fill-primary group-hover:fill-primary-foreground transition-colors"
      />
      <path
        d="M16 8L20 12L16 16L12 12L16 8Z"
        className="fill-primary-foreground group-hover:fill-primary transition-colors"
      />
      <path
        d="M8 16L12 20L16 24L16 16L8 16Z"
        className="fill-primary-foreground group-hover:fill-primary transition-colors"
      />
      <path
        d="M24 16L20 20L16 24L16 16L24 16Z"
        className="fill-primary-foreground group-hover:fill-primary transition-colors"
      />
    </svg>
  );
}
