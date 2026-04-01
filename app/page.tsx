"use client";

import GuessCard from "./component/GuessCard";
import ControlledRandom from "./service/ControlledRandom";
import { Professor } from "./Model/professor";
import React from "react";

export default function Home() {
  const controlledRandom = new ControlledRandom();

  const [professorList, setProfessorList] = React.useState<Professor[]>([]);
  const [guessedProfessors, setGuessedProfessors] = React.useState<Professor[]>(
    [],
  );
  const [dailyProfessors, setDailyProfessors] =
    React.useState<Professor | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [filteredProfessors, setFilteredProfessors] = React.useState<
    Professor[]
  >([]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showWinModal, setShowWinModal] = React.useState(false);

  async function fetchData() {
    try {
      const response = await fetch("professors.json");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: Professor[] = await response.json();

      setProfessorList(data);

      setDailyProfessors(data[controlledRandom.mapToRange(0, data.length - 1)]);
    } catch (error) {
      console.error("Failed to load professors.json:", error);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInputValue(value);
    setFilteredProfessors(
      professorList.filter(
        (prof) =>
          prof.name.toLowerCase().includes(value.toLowerCase()) &&
          !guessedProfessors.some((guessed) => guessed.name === prof.name),
      ),
    );
    setShowDropdown(true);
  };

  const isSelectedDailyProfessor = (professor: Professor) => {
    return dailyProfessors && professor.name === dailyProfessors.name;
  };

  const handleSelectProfessor = (professor: Professor) => {
    console.log(professor);
    setInputValue(professor.name);
    setShowDropdown(false);
    setGuessedProfessors([...guessedProfessors, professor]);
    setInputValue("");
    if (isSelectedDailyProfessor(professor)) {
      setShowWinModal(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      const selected = professorList.find(
        (prof) => prof.name.toLowerCase() === inputValue.toLowerCase(),
      );
      if (selected) {
        setGuessedProfessors([...guessedProfessors, selected]);
        setShowDropdown(false);
        setInputValue("");
        if (isSelectedDailyProfessor(selected)) {
          setShowWinModal(true);
        }
      }
    }
  };

  return (
    <>

      <p style={{ textAlign: "center", margin: "2rem 5rem 0rem 5rem", fontSize: "1.25rem", border: "solid 4px red", borderRadius: "14px" }}>
        Le jeu est simple : tu dois deviner le professeur du jour en entrant son nom dans la barre de recherche. Chaque fois que tu fais une proposition, tu obtiens des indices sur sa matière, son établissement, sa note, la difficulté de sa matière et les semestres où il enseigne.
        <br/>
        <br/>
        Si la case est en rouge, cela signifie que l'information est complètement fausse. Si elle est en jaune, cela signifie que l'information est partiellement correcte. Si elle est en vert, cela signifie que l'information est correcte à 100% !
        <br/>
        Bonne chance !
      </p>

      {showWinModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "24px 32px",
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              maxWidth: "90%",
            }}
          >
            <p style={{ fontSize: "1.5rem", margin: "0 0 12px 0" }}>
              🎉 Bien joué ! Tu as trouvé le professeur du jour ! 🎉<br/>🎉 Reviens demain pour un professeur different ! 🎉
            </p>
            <button
              onClick={() => window.location.href = "https://youtu.be/dQw4w9WgXcQ"}
              style={{
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                backgroundColor: "#333",
                color: "#fff",
              }}
            >
              Recommencer !
            </button>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            border: "2px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            position: "relative",
            marginTop: "3rem"
          }}
        >
            <div style={{ display: "flex", padding: "1rem" }}>
            <input
              type="text"
              placeholder="Entrer le nom d'un prof"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              style={{
              flex: 1,
              padding: "8px",
              border: "1px solid #333",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            />
            </div>
            {showDropdown && filteredProfessors.length > 0 && (
            <ul
              style={{
              listStyle: "none",
              padding: "8px 0",
              margin: "0",
              marginTop: "8px",
              border: "1px solid #333",
              borderRadius: "4px",
              maxHeight: "200px",
              overflow: "auto",
              position: "absolute",
              top: "100%",
              left: "0",
              right: "0",
              zIndex: 10,
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              {filteredProfessors.map((prof) => (
              <li
                key={prof.name}
                onClick={() => handleSelectProfessor(prof)}
                style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                }}
              >
                {prof.name}
              </li>
              ))}
            </ul>
            )}
        </div>
      </div>

      <table className="guess-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Matière</th>
            <th>Établissement</th>
            <th>Note</th>
            <th>Difficulté de la matière</th>
            <th>Semestre</th>
          </tr>
        </thead>
        <tbody>
          {guessedProfessors.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: "20px" }}>
                Guess something...
              </td>
            </tr>
          ) : (
            guessedProfessors
              .map((professor) => (
                <GuessCard
                  key={professor.name}
                  professor={professor}
                  professorToGuess={dailyProfessors}
                />
              ))
              .reverse()
          )}
        </tbody>
      </table>
    </>
  );
}
