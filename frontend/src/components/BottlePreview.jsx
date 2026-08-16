import { motion } from "framer-motion";

const SIZE_SCALE = { "250 ml": 0.78, "500 ml": 0.9, "1 L": 1 };

export default function BottlePreview({
  size = "500 ml",
  variety = "Mineral water",
  capColor = "#0B2545",
  labelPaper = "#F4EEE2",
  labelText = "",
  compact = false,
}) {
  const scale = SIZE_SCALE[size] || 0.9;
  const labelStroke = labelPaper === "#FFFFFF" ? "#D8D2C2" : "#C9BFA6";
  const textOnLabel = labelPaper === "#FFFFFF" ? "#0B2545" : "#0B2545";

  return (
    <motion.div
      data-testid="bottle-preview"
      className="flex items-end justify-center"
      animate={{ scale }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      style={{ transformOrigin: "bottom center" }}
    >
      <svg
        width={compact ? 120 : 200}
        height={compact ? 276 : 460}
        viewBox="0 0 200 460"
        fill="none"
        role="img"
        aria-label={`Bottle preview: ${size}, ${variety}, label "${labelText || "Your label"}"`}
      >
        <defs>
          <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#EAF1F6" />
            <stop offset="0.18" stopColor="#F6FAFC" />
            <stop offset="0.5" stopColor="#DCE8F0" />
            <stop offset="0.82" stopColor="#F2F7FA" />
            <stop offset="1" stopColor="#D8E4EC" />
          </linearGradient>
          <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C9DCE8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#9FBECD" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="capSheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="0.3" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
          </linearGradient>
        </defs>

        {/* cap */}
        <rect x="76" y="6" width="48" height="30" rx="6" fill={capColor} />
        <rect x="76" y="6" width="48" height="30" rx="6" fill="url(#capSheen)" />
        {[84, 92, 100, 108, 116].map((x) => (
          <line key={x} x1={x} y1="9" x2={x} y2="33" stroke="#00000022" strokeWidth="1" />
        ))}

        {/* neck ring */}
        <rect x="80" y="40" width="40" height="8" rx="3" fill="#CBD6DE" />

        {/* neck */}
        <path
          d="M82 48 L82 66 Q82 78 58 88 L58 100 L142 100 L142 88 Q118 78 118 66 L118 48 Z"
          fill="url(#glass)"
          stroke="#B9C9D4"
          strokeWidth="1.2"
        />

        {/* body */}
        <path
          d="M58 100 L58 420 Q58 448 100 448 Q142 448 142 420 L142 100 Z"
          fill="url(#glass)"
          stroke="#B9C9D4"
          strokeWidth="1.2"
        />

        {/* water fill */}
        <path
          d="M61 118 L61 419 Q61 445 100 445 Q139 445 139 419 L139 118 Z"
          fill="url(#water)"
        />
        <ellipse cx="100" cy="118" rx="39" ry="5" fill="#DCE9F1" opacity="0.8" />

        {/* body ridges */}
        {[150, 380, 404].map((y) => (
          <path
            key={y}
            d={`M60 ${y} Q100 ${y + 8} 140 ${y}`}
            stroke="#B9C9D4"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
        ))}

        {/* highlight streak */}
        <rect x="70" y="110" width="7" height="320" rx="3.5" fill="#FFFFFF" opacity="0.55" />

        {/* label */}
        <rect x="44" y="196" width="112" height="128" rx="4" fill={labelPaper} stroke={labelStroke} strokeWidth="1" />
        <line x1="44" y1="214" x2="156" y2="214" stroke="#9AA0A6" strokeWidth="1" opacity="0.7" />
        <line x1="44" y1="306" x2="156" y2="306" stroke="#9AA0A6" strokeWidth="1" opacity="0.7" />
        <text
          x="100"
          y="238"
          textAnchor="middle"
          fontSize="9"
          letterSpacing="2.5"
          fill="#807A68"
          fontFamily="Manrope, sans-serif"
          fontWeight="600"
        >
          {variety.toUpperCase()}
        </text>
        <text
          x="100"
          y="276"
          textAnchor="middle"
          fontSize={labelText.length > 9 ? 15 : 19}
          fill={textOnLabel}
          fontFamily="'Playfair Display', Georgia, serif"
        >
          {labelText || "Your label"}
        </text>
        <text
          x="100"
          y="296"
          textAnchor="middle"
          fontSize="7.5"
          letterSpacing="1.8"
          fill="#807A68"
          fontFamily="Manrope, sans-serif"
        >
          {size.toUpperCase()} · KAUSAR AQUATECH
        </text>
      </svg>
    </motion.div>
  );
}
