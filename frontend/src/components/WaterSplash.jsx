import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform float uOpacity;

  const float T = 7.0;

  float waveHeight(vec2 p, float t) {
    float ct = mod(t, T);
    vec2 c = vec2(0.08, -0.02);
    float d = length(p - c);
    float h = 0.0;
    float te = ct - 1.35;
    if (te > 0.0) {
      float front = te * 0.42;
      float ring = sin((d - front) * 42.0);
      float env = exp(-2.6 * abs(d - front)) * exp(-0.5 * te) * smoothstep(0.0, 0.06, te);
      h += ring * env * 0.45;
      float crownT = smoothstep(0.0, 0.22, te) * exp(-te * 2.4);
      h += exp(-pow((d - 0.11) * 16.0, 2.0)) * crownT * 0.85;
      h += exp(-pow(d * 7.0, 2.0)) * exp(-te * 3.0) * smoothstep(0.0, 0.1, te) * 0.6;
    }
    h += sin(p.x * 3.0 + t * 0.35) * 0.025 + sin(p.y * 4.2 - t * 0.28) * 0.025;
    return h;
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uRes.x / uRes.y;
    float e = 0.004;
    float h  = waveHeight(p, uTime);
    float hx = waveHeight(p + vec2(e, 0.0), uTime) - h;
    float hy = waveHeight(p + vec2(0.0, e), uTime) - h;
    vec3 n = normalize(vec3(-hx / e * 0.12, -hy / e * 0.12, 1.0));
    vec3 lightDir = normalize(vec3(0.35, 0.55, 0.75));
    float diff = max(dot(n, lightDir), 0.0);
    float spec = pow(max(dot(reflect(-lightDir, n), vec3(0.0, 0.0, 1.0)), 0.0), 64.0);

    vec3 navy = vec3(0.043, 0.145, 0.271);
    vec3 bone = vec3(0.957, 0.933, 0.886);
    vec3 col = mix(bone, navy, clamp(0.22 + h * 1.5, 0.0, 0.85));
    col = mix(col, navy * 0.85, (1.0 - diff) * 0.45);
    col += spec * vec3(1.0, 0.985, 0.94) * 0.85;

    float a = clamp(0.16 + abs(h) * 1.5 + spec * 0.7, 0.0, 0.8);

    // falling droplet before impact
    float ct = mod(uTime, T);
    if (ct < 1.35) {
      float dp = ct / 1.35;
      float dropY = mix(0.52, -0.02, dp * dp * dp);
      float dd = length(p - vec2(0.08, dropY));
      float drop = exp(-dd * dd * 2600.0);
      col += drop * vec3(1.0, 0.985, 0.94);
      a = max(a, drop * 0.9);
    }

    float vig = smoothstep(1.05, 0.3, length(p * vec2(0.75, 1.0)));
    gl_FragColor = vec4(col, a * vig * uOpacity);
  }
`;

function SplashPlane({ opacity }) {
  const matRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uOpacity: { value: opacity },
    }),
    [opacity]
  );

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      matRef.current.uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WaterSplash({ opacity = 0.55 }) {
  return (
    <Canvas
      data-testid="water-splash-canvas"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden="true"
    >
      <SplashPlane opacity={opacity} />
    </Canvas>
  );
}
