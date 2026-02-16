export function SvgFilters() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter id="redWobble" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.55" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 0 0 0 0
              0 0 0 0 0
              0 0 0 0.68 0
            "
            result="tint"
          />
          <feComposite in="tint" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

