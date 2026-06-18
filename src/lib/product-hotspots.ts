export const MODEL_URL = "/models/krishiai-unit.glb";
export const MODEL_SCALE = 2.6;
/** Default load rotation — 90° clockwise (Y-axis, radians). */
export const MODEL_INITIAL_Y_ROTATION = -Math.PI / 2;

/** Camera fit — higher = more padding around the model. */
export const VIEWER_FIT_MARGIN = 1.18;
/** Subtle upward framing in the main viewer (0 = centered, ~0.15 = slight lift). */
export const VIEWER_FRAME_Y_BIAS = 0.12;

/** Hub at the bottom center of the pole — lines only, no visible dot */
export const SOIL_HUB: [number, number, number] = [0, -0.49, -0.03];

export type ProductHotspot = {
  id: string;
  label: string;
  body: string;
  position: [number, number, number];
};

export type SoilProbe = {
  id: string;
  label: string;
  body: string;
  /** Arrow tip at the bottom of the pole / probe entry */
  tip: [number, number, number];
};

/** Mesh-sampled anchors (front-facing vertices from GLB analysis) */
export const productHotspots: ProductHotspot[] = [
  {
    id: "solar",
    label: "Solar Panel",
    body: "Off-grid power keeps the unit running 24/7 in remote fields with no electricity.",
    position: [0.1, 0.39, 0.1],
  },
  {
    id: "sim",
    label: "SIM Module",
    body: "Cellular connectivity sends live field data from anywhere, no Wi-Fi required.",
    position: [0.043, -0.015, 0.022],
  },
  {
    id: "air",
    label: "Temp & Humidity",
    body: "Captures microclimate at crop level for smarter pest and disease alerts.",
    position: [-0.022, -0.015, 0.022],
  },
];

export const soilProbes: SoilProbe[] = [
  {
    id: "npk",
    label: "NPK Sensor",
    body: "Measures nitrogen, phosphorus, and potassium so farmers know exactly what the soil needs.",
    tip: [-0.04, -0.52, 0.05],
  },
  {
    id: "moisture",
    label: "Soil Moisture",
    body: "Tracks water content at root depth for precision irrigation instead of guesswork.",
    tip: [0.02, -0.54, 0.06],
  },
  {
    id: "soil-temp",
    label: "Soil Temperature",
    body: "Monitors root-zone heat to protect crops during extreme weather swings.",
    tip: [0.08, -0.52, 0.05],
  },
];

export const allHotspotIds = [
  ...productHotspots.map((h) => h.id),
  ...soilProbes.map((p) => p.id),
];

export function getHotspotById(id: string) {
  const point = productHotspots.find((h) => h.id === id);
  if (point) return { kind: "point" as const, ...point };
  const probe = soilProbes.find((p) => p.id === id);
  if (probe) return { kind: "probe" as const, label: probe.label, body: probe.body, position: probe.tip };
  return null;
}

export function getHotspotPosition(id: string): [number, number, number] | null {
  const point = productHotspots.find((h) => h.id === id);
  if (point) return point.position;
  const probe = soilProbes.find((p) => p.id === id);
  if (probe) return probe.tip;
  return null;
}

export const allParts = [
  ...productHotspots.map((h) => ({ id: h.id, label: h.label, body: h.body })),
  ...soilProbes.map((p) => ({ id: p.id, label: p.label, body: p.body })),
];
