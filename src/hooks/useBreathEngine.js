import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Motor genérico de fases para ejercicios de respiración.
 * Recorre `phases` en loop, hasta `totalSeconds` o `cycles` (uno de los dos).
 * Expone la fase actual, su fracción de avance (0–1) y el tamaño acumulado
 * del anillo (0.62–1.0), que es lo único que el componente visual necesita.
 */
export function useBreathEngine(phases, { totalSeconds, cycles } = {}) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseElapsed, setPhaseElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [ringSize, setRingSize] = useState(0.62);

  const rafRef = useRef(null);
  const lastTsRef = useRef(null);
  const ringBaseRef = useRef(0.62); // tamaño al empezar la fase actual

  const RING_MIN = 0.62;
  const RING_MAX = 1.0;

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    lastTsRef.current = null;
    setRunning(false);
    setDone(false);
    setPhaseIndex(0);
    setPhaseElapsed(0);
    setTotalElapsed(0);
    setCycleCount(0);
    setRingSize(RING_MIN);
    ringBaseRef.current = RING_MIN;
  }, []);

  const start = useCallback(() => {
    if (done) reset();
    setRunning(true);
  }, [done, reset]);

  const pause = useCallback(() => setRunning(false), []);

  useEffect(() => {
    if (!running) return;

    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;

      setPhaseElapsed((prevElapsed) => {
        let elapsed = prevElapsed + dt;
        const phase = phases[phaseIndex];

        setTotalElapsed((prevTotal) => {
          const nextTotal = prevTotal + dt;
          if (totalSeconds && nextTotal >= totalSeconds) {
            setDone(true);
            setRunning(false);
          }
          return nextTotal;
        });

        if (elapsed >= phase.duration) {
          elapsed = 0;
          const nextIndex = (phaseIndex + 1) % phases.length;
          ringBaseRef.current =
            phase.direction === "grow" ? RING_MAX : phase.direction === "shrink" ? RING_MIN : ringBaseRef.current;
          if (nextIndex === 0) {
            setCycleCount((c) => {
              const next = c + 1;
              if (cycles && next >= cycles) {
                setDone(true);
                setRunning(false);
              }
              return next;
            });
          }
          setPhaseIndex(nextIndex);
        }

        // calcular tamaño del anillo para el frame actual
        const activePhase = elapsed === 0 && phase.direction !== "hold" ? phases[phaseIndex] : phase;
        const fraction = Math.min(1, elapsed / activePhase.duration);
        let size = ringBaseRef.current;
        if (activePhase.direction === "grow") {
          size = RING_MIN + (RING_MAX - RING_MIN) * fraction;
        } else if (activePhase.direction === "shrink") {
          size = RING_MAX - (RING_MAX - RING_MIN) * fraction;
        }
        setRingSize(size);

        return elapsed;
      });

      if (running) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseIndex, phases, totalSeconds, cycles]);

  const phase = phases[phaseIndex];
  const phaseRemaining = Math.max(0, phase.duration - phaseElapsed);
  const totalRemaining = totalSeconds ? Math.max(0, totalSeconds - totalElapsed) : null;

  return {
    running,
    done,
    phase,
    phaseRemaining,
    totalRemaining,
    cycleCount,
    ringSize,
    start,
    pause,
    reset,
  };
}
