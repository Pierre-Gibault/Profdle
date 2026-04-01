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
    if (isSelectedDailyProfessor(professor)) {
      alert("Congratulations! You guessed the daily professor!");
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
        if (isSelectedDailyProfessor(selected)) {
          alert("Congratulations! You guessed the daily professor!");
        }
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ border: "2px solid #ccc", borderRadius: "8px", padding: "16px", width: "300px", position: "relative" }}>
          <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          placeholder="Enter professor name"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          style={{ flex: 1, padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
        />
        <button
          onClick={() => {
        const selected = professorList.find(
          (prof) => prof.name.toLowerCase() === inputValue.toLowerCase(),
        );
        if (selected) {
          setGuessedProfessors([...guessedProfessors, selected]);
          setShowDropdown(false);
          setInputValue("");
          if (isSelectedDailyProfessor(selected)) {
        alert("Congratulations! You guessed the daily professor!");
          }
        }
          }}
          style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Submit
        </button>
          </div>
          {showDropdown && filteredProfessors.length > 0 && (
        <ul style={{ listStyle: "none", padding: "8px 0", margin: "0", marginTop: "8px", border: "1px solid #ddd", borderRadius: "4px", maxHeight: "200px", overflow: "auto", position: "absolute", top: "100%", left: "0", right: "0", zIndex: 10 }}>
          {filteredProfessors.map((prof) => (
        <li key={prof.name} onClick={() => handleSelectProfessor(prof)} style={{ padding: "8px", cursor: "pointer", borderBottom: "1px solid #eee" }}>
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
          <th>UTBM (pas UIMM)</th>
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
          guessedProfessors.map((professor) => (
            <GuessCard key={professor.name} professor={professor} professorToGuess={dailyProfessors} />
          )).reverse()
        )}
        </tbody>
      </table>
    </>
  );
}
