import React, { useEffect, useState, useRef } from "react";
import Papa from "papaparse";
import renderMathInElement from "katex/contrib/auto-render";
import "katex/dist/katex.min.css";
import { Alert, Button } from "react-bootstrap";
import "./AnkiCSVViewer.css";

function AnkiCSVViewer(props) {
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const cardContentRef = useRef(null);

  useEffect(() => {
    fetch(props.filePath)
      .then((res) => res.text())
      .then((text) => {
        const result = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          delimiter:"\t"
        });
        setCards(result.data);
      });
  }, [props.filePath]);

  useEffect(() => {
    const el = document.querySelector(".anki-card-content");
    if (el) {
      renderMathInElement(el, {
        delimiters: [
          { left: "\\(", right: "\\)", display: false },
          { left: "\\[", right: "\\]", display: true },
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }
  }, [cards, currentCard, showBack]);


  const deltaCard = (delta) => {
    setCurrentCard((prev) => {
      if (prev+delta===-1) return cards.length-1;
      else if (prev+delta===cards.length) return 0;
      else return prev+delta;
    });
    setShowBack(false);
  };

  const flipCard = () => {
    setShowBack((prev) => !prev);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      {cards.length > 0 ? (
        <div style={{borderRadius:"10px",marginBottom:"30px"}} className="mt-4 border rounded-lg shadow-lg p-4">
          <div
            className="cursor-pointer text-xl min-h-[80px]"
            onClick={flipCard}
          >
            <h3>{showBack ? "Answer" : "Concept"}</h3>
            <hr></hr>
            <div 
            className="anki-card-content"
            ref={cardContentRef}
            dangerouslySetInnerHTML={{
              __html: showBack
                ? cards[currentCard].Back
                : cards[currentCard].Front,
            }}
            />
          </div>
          <Button
            className={"anki-btn mt-4 px-4 py-2 rounded"+(props.darkMode ? " dark" : "")}
            style={{marginRight:"5px"}}
            onClick={()=>deltaCard(-1)}
            variant={"outline-"+(props.darkMode ? "light" : "dark")}
          >
            &larr;
          </Button>
          <Button
            className={"anki-btn mt-4 px-4 py-2 rounded"+(props.darkMode ? " dark" : "")}
            style={{marginLeft:"5px",marginRight:"5px"}}
            onClick={flipCard}
            variant={"outline-"+(props.darkMode ? "light" : "dark")}
          >Flip Card</Button>
          <Button
            className={"anki-btn mt-4 px-4 py-2 rounded"+(props.darkMode ? " dark" : "")}
            style={{marginLeft:"5px"}}
            onClick={()=>deltaCard(1)}
            variant={"outline-"+(props.darkMode ? "light" : "dark")}
          >
            &rarr;
          </Button>
        </div>
      ) : (
        <p>Loading cards...</p>
      )}
      <Alert variant="warning" className={props.darkMode ? "dark" : ""}>
        ⚠️ This is a <strong>beta version</strong> of the Anki card viewer. Features may be unstable or incomplete.
      </Alert>
    </div>
  );
}

export default AnkiCSVViewer;