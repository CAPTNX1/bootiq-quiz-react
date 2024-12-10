import { useEffect, useState } from "react";
import QuizButton from "../components/QuizButton";
import QuizBoard from "../components/QuizBoard";

function Landing() {
  const [quizData, setQuizData] = useState<any>(null);
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    // Fetch the index.json to get the list of JSON files
    fetch("/data/index.json")
      .then((response) => response.json())
      .then((jsonFiles) => {
        // Load each JSON file listed in index.json
        return Promise.all(
          jsonFiles.map(async (file: any) => {
            const response = await fetch(`/data/${file}`);
            if (!response.ok) throw new Error(`Could not load ${file}`);
            const content = await response.json();
            return { filename: file, content };
          })
        );
      })
      .then((loadedFiles) => setFiles(loadedFiles))
      .catch((error) => console.error("Error loading files:", error));
  }, []);

  function loadQuiz(quiz: string) {
    fetch("/data/" + quiz)
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }

  if (!quizData) {
    return (
      <>
        <h2>Vyberte Kvíz</h2>
        {!files && <div>Loading...</div>}

        {files && (
          <ul className="quiz-grid">
            {files.map((file: any, index: number) => (
              <li key={index}>
                <QuizButton
                  quizName={file.filename.replace(".json", "")}
                  quizSelect={() => loadQuiz(file.filename)}
                />
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }

  if (quizData) {
    return <QuizBoard quizData={quizData.questions} />;
  }
}

export default Landing;
