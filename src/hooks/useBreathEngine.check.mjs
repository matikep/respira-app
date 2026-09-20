// Chequeo mínimo del reparto de tamaños: node src/hooks/useBreathEngine.check.mjs
import assert from "node:assert/strict";
import { buildRamps } from "./useBreathEngine.js";

const near = (a, b) => Math.abs(a - b) < 1e-9;

// Ciclo simple: inhala → exhala → pausa.
const simple = buildRamps([
  { direction: "grow", duration: 4 },
  { direction: "shrink", duration: 6 },
  { direction: "hold", duration: 2 },
]);
assert.ok(near(simple[0].from, 0.62) && near(simple[0].to, 1), "inhalar va del mínimo al máximo");
assert.ok(near(simple[1].from, 1) && near(simple[1].to, 0.62), "exhalar vuelve al mínimo");
assert.deepEqual(simple[2], { from: 0.62, to: 0.62 }, "la pausa no mueve el orbe");

// Doble inhalación (suspiro): el recorrido se reparte por duración, sin saltos.
const sigh = buildRamps([
  { direction: "grow", duration: 2 },
  { direction: "grow", duration: 1 },
  { direction: "shrink", duration: 6 },
]);
assert.ok(near(sigh[0].to, sigh[1].from), "la segunda inhalación continúa donde quedó la primera");
assert.ok(near(sigh[1].to, 1), "la segunda inhalación termina llena");
assert.ok(sigh[0].to < 1, "la primera inhalación no llena del todo");

console.log("ok");
