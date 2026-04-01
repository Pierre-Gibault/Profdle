import Image from "next/image";
import { Professor } from "../Model/professor";

type GuessCardProps = {
  professor: Professor;
  professorToGuess: Professor | null;
};

export default function GuessCard({ professor, professorToGuess }: GuessCardProps) {
  const basePath = process.env.NODE_ENV === "production" ? "/Profdle" : "";
  const imageSrc = professor.picturePath.startsWith("/")
    ? `${basePath}${professor.picturePath}`
    : professor.picturePath;

  return (
    <tr className="guess-row">
      <td>
        <Image
          src={imageSrc}
          alt={professor.name}
          width={64}
          height={64}
          className="rounded mx-auto"
        />
      </td>
    <td className={`border-2 bg-opacity-50 ${professorToGuess && professorToGuess.name === professor.name ? "border-green-500  bg-green-500" : "border-red-500  bg-red-500"}`}>
      {professor.name}
    </td>
    <td className={`border-2 bg-opacity-50 ${
      professorToGuess
        ? professorToGuess.subject.every(s => professor.subject.includes(s)) && professor.subject.every(s => professorToGuess.subject.includes(s))
        ? "border-green-500 bg-green-500"
        : professorToGuess.subject.some(s => professor.subject.includes(s))
        ? "border-yellow-500 bg-yellow-500"
        : "border-red-500 bg-red-500"
        : "border-red-500 bg-red-500"
    }`}>
      {professor.subject.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")}
    </td>
    <td className={`border-2 bg-opacity-50 ${professorToGuess && professorToGuess.isUTBM === professor.isUTBM ? "border-green-500 bg-green-500" : "border-red-500 bg-red-500"}`}>
      {professor.isUTBM ? "UTBM" : "Not UTBM"}
    </td>
    <td className={`border-2 bg-opacity-50 ${
      professorToGuess
        ? professorToGuess.rating === professor.rating
        ? "border-green-500 bg-green-500"
        : Math.abs(professorToGuess.rating - professor.rating) <= 2
        ? "border-yellow-500 bg-yellow-500"
        : "border-red-500 bg-red-500"
        : "border-red-500 bg-red-500"
    }`}>
      {professor.rating}/10
      {professorToGuess && professor.rating < professorToGuess.rating && " ⬆️"}
      {professorToGuess && professor.rating > professorToGuess.rating && " ⬇️"}
    </td>
    <td className={`border-2 bg-opacity-50 ${
      professorToGuess
        ? professorToGuess.difficulty === professor.difficulty
        ? "border-green-500 bg-green-500"
        : Math.abs(professorToGuess.difficulty - professor.difficulty) <= 2
        ? "border-yellow-500 bg-yellow-500"
        : "border-red-500 bg-red-500"
        : "border-red-500 bg-red-500"
    }`}>
      {professor.difficulty}/10
      {professorToGuess && professor.difficulty < professorToGuess.difficulty && " ⬆️"}
      {professorToGuess && professor.difficulty > professorToGuess.difficulty && " ⬇️"}
    </td>
    <td className={`border-2 bg-opacity-50 ${
        professorToGuess
            ? professorToGuess.semesters.every(s => professor.semesters.includes(s)) && professor.semesters.every(s => professorToGuess.semesters.includes(s))
            ? "border-green-500 bg-green-500"
            : professorToGuess.semesters.some(s => professor.semesters.includes(s))
            ? "border-yellow-500 bg-yellow-500"
            : "border-red-500 bg-red-500"
            : "border-red-500 bg-red-500"
    }`}>
        {professor.semesters.map((s) => s.toString()).join(", ")}
    </td>
    </tr>
  );
}
