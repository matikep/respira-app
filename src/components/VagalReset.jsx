import { useState } from "react";
import { exercises, vagalReset } from "../data/exercises.js";

const { evidence, reference, caution } = exercises.find((e) => e.id === vagalReset.id);
import ExercisePlayer from "./ExercisePlayer.jsx";

export default function VagalResetFlow({ onDone }) {
  const [subphase, setSubphase] = useState("A"); // "A" | "B"

  const phaseAExercise = {
    id: "vagal-a",
    evidence,
    reference,
    caution,
    title: vagalReset.title,
    subtitle: vagalReset.phaseA.label,
    indication: "Repite 3 veces: sube los hombros con fuerza, sin contener el aire, y suéltalos de golpe.",
    cycles: vagalReset.phaseA.reps,
    phases: vagalReset.phaseA.steps,
  };

  const phaseBExercise = {
    id: "vagal-b",
    evidence,
    reference,
    caution,
    title: vagalReset.title,
    subtitle: vagalReset.phaseB.label,
    indication: "3 ciclos de suspiro cíclico para cerrar la secuencia.",
    cycles: vagalReset.phaseB.cycles,
    phases: vagalReset.phaseB.steps,
  };

  if (subphase === "A") {
    return (
      <ExercisePlayer exercise={phaseAExercise} onDone={() => setSubphase("B")} doneLabel="Continuar a Fase B →" />
    );
  }
  return <ExercisePlayer exercise={phaseBExercise} onDone={onDone} doneLabel="Volver" />;
}
