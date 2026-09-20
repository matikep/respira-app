import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const RING_MIN = 0.62;
const RING_MAX = 1;

/** Suaviza el inicio y el final de cada fase: sin tirones al cambiar de dirección. */
const ease = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

/**
 * Tamaño inicial y final del orbe para cada fase.
 * Las fases consecutivas en la misma dirección (por ejemplo la doble
 * inhalación del suspiro) se reparten el recorrido en proporción a su
 * duración, así ninguna "se salta" el tramo de la siguiente.
 */
export function buildRamps(phases) {
  let value = phases[0].direction === "shrink" ? RING_MAX : RING_MIN;
  const ramps = [];
  let i = 0;

  while (i < phases.length) {
    const { direction } = phases[i];
    if (direction === "hold") {
      ramps.push({ from: value, to: value });
      i += 1;
      continue;
    }

    let end = i;
    let runSeconds = 0;
    while (end < phases.length && phases[end].direction === direction) {
      runSeconds += phases[end].duration;
      end += 1;
    }

    const target = direction === "grow" ? RING_MAX : RING_MIN;
    const span = target - value;
    let done = 0;
    for (let k = i; k < end; k += 1) {
      const from = value + (span * done) / runSeconds;
      done += phases[k].duration;
      ramps.push({ from, to: value + (span * done) / runSeconds });
    }

    value = target;
    i = end;
  }

  return ramps;
}

/**
 * Motor genérico de fases para ejercicios de respiración.
 * Recorre `phases` en loop hasta `totalSeconds` o `cycles` (uno de los dos).
 * El reloj vive en un ref y se lee una sola vez por frame, así el orbe avanza
 * de forma continua en vez de a saltos.
 */
export function useBreathEngine(phases, { totalSeconds, cycles } = {}) {
  const ramps = useMemo(() => buildRamps(phases), [phases]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [tick, setTick] = useState({ index: 0, elapsed: 0, total: 0, cycle: 0 });

  const clock = useRef({ index: 0, elapsed: 0, total: 0, cycle: 0 });
  const rafRef = useRef(0);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    clock.current = { index: 0, elapsed: 0, total: 0, cycle: 0 };
    setTick({ ...clock.current });
    setRunning(false);
    setDone(false);
  }, []);

  const start = useCallback(() => {
    if (done) reset();
    setRunning(true);
  }, [done, reset]);

  const pause = useCallback(() => setRunning(false), []);

  useEffect(() => {
    if (!running) return undefined;

    let last = performance.now();
    const frame = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      const c = clock.current;
      c.elapsed += dt;
      c.total += dt;

      let finished = totalSeconds != null && c.total >= totalSeconds;
      while (!finished && c.elapsed >= phases[c.index].duration) {
        c.elapsed -= phases[c.index].duration;
        c.index = (c.index + 1) % phases.length;
        if (c.index === 0) {
          c.cycle += 1;
          finished = cycles != null && c.cycle >= cycles;
        }
      }

      setTick({ ...c });
      if (finished) {
        setRunning(false);
        setDone(true);
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, phases, cycles, totalSeconds]);

  const phase = phases[tick.index];
  const ramp = ramps[tick.index];
  const fraction = Math.min(1, tick.elapsed / phase.duration);

  return {
    running,
    done,
    phase,
    phaseRemaining: Math.max(0, phase.duration - tick.elapsed),
    totalRemaining: totalSeconds != null ? Math.max(0, totalSeconds - tick.total) : null,
    cycleCount: tick.cycle,
    ringSize: done ? RING_MIN : ramp.from + (ramp.to - ramp.from) * ease(fraction),
    start,
    pause,
    reset,
  };
}
