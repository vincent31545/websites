import React, { useState, useEffect } from "react";
import "@fontsource/montserrat";
import Card from "./Card.js";
import "./ScriptureMemory.css";
import jsonData from "./scripts/verses.json";
import textData from "./scripts/verses.txt";

function ScriptureMemory() {
    // these two control the title and verse text above and bellow the text area
    const [title, setTitle] = useState("");
    const [verse, setVerse] = useState("");
    const [coloredVerse, setColoredVerse] = useState();

    const [showVerse, setShowVerse] = useState(false); // togles the verse bellow the text area
    const [textLines, setTextLines] = useState([]); // an array of all the verses in verses.txt
    const [listVerseScores, setListVerseScores] = useState({}); // controls the score of the verse (the color of the verse card)

    const [verseIndex, setVerseIndex] = useState(0); // the index of the verse in textLines
    // const [hintIndex, setHintIndex] = useState(0); // the hint index in the verse

    // runs on start
    useEffect(() => {
        document.getElementById("verseAttempt").focus();
        // gets the txt file
        fetch(textData)
        .then((response) => response.text())
        .then((data) => {
            // stores into the array thingy
            const lines = data.split("\n").filter(line => line.trim() !== ""); 
            setTextLines(lines);

            // initialize each verse to have a score of 0
            lines.forEach((line) => {
                if (localStorage.getItem(line) == null) {
                    listVerseScores[line] = -1;
                    localStorage.setItem(line, -1)
                } else {
                    listVerseScores[line] = localStorage.getItem(line);
                }
            });

            changeVerse(lines[0]);
            setVerseIndex(0);
        });
        // eslint-disable-next-line
    }, []);

    const resetStorage = () => {
        setShowVerse(false);
        document.getElementById("verseAttempt").value = "";
        const updatedScores = {};
        textLines.forEach((line) => {
            localStorage.setItem(line, -1);
            updatedScores[line] = -1;
        }); 

        // this forces a rerender
        setListVerseScores(updatedScores);
    }

    const resetVerse = () => {
        setShowVerse(false);
        localStorage.setItem(textLines[verseIndex], -1);
        listVerseScores[textLines[verseIndex]] = -1;
        setListVerseScores(listVerseScores);
        document.getElementById("verseAttempt").value = "";
    }

    const giveHint = () => {
        const userAns = document.getElementById("verseAttempt").value;  //gets the userAns
            
        // parses the user anwser and the json answer to ignore case and punctuation
        const punctuationRegex = /[!"#$%&‘'”“’()*+,./:;<=>?@[\]^_`{|}~-—]/g; // punctation '-—' is not included bc Hebrews 4:12 and Philipans 4:9
        const parsedVerse = verse.toLowerCase().replace(punctuationRegex, ' ');
        const parsedUserAns = userAns.toLowerCase().replace(punctuationRegex, ' ');
        
        // gets the lists and sets of all the words used and compares them
        const listVerse = parsedVerse.split(" ").filter(verse => verse.trim() !== ""); 
        const listUserAns = parsedUserAns.split(" ").filter(ans => ans.trim() !== "");
        const setUserAns = new Set(listUserAns);
        
        // Generate colored verse content
        const coloredWords = [];
        let dashCounter = 0;
        let splitCounter = 0; // here just for key and because there are three spans if there is a dash
        let incorrectWordFound = false;
        verse.split(" ").filter(verse => verse.trim() !== "").forEach((word, index) => {
            if (incorrectWordFound === true)
                return;
            // handles wrong word in the middle of a dash
            if (word.indexOf("-") > -1 || word.indexOf("—") > -1) {
                const dashChar = word.indexOf("-") > -1 ? "-" : "—";
                const wordList = word.split(dashChar);
                const FirstInUserAns = setUserAns.has(listVerse[index + dashCounter]);
                const FirstIsCorrect = index + dashCounter >= listUserAns.length ? false : listUserAns[index + dashCounter] === listVerse[index + dashCounter];
                if (FirstIsCorrect === false) {
                    incorrectWordFound = true;
                    coloredWords.push(
                        <span key={index + dashCounter + splitCounter} className={FirstIsCorrect ? "green" : FirstInUserAns ? "yellow" : "red"}>
                            {wordList[0]}
                        </span>
                    );
                    return;
                }
                dashCounter++;

                const SecondInUserAns = setUserAns.has(listVerse[index + dashCounter]);
                const SecondIsCorrect = index + dashCounter >= listUserAns.length ? false : listUserAns[index + dashCounter] === listVerse[index + dashCounter];
                if (SecondIsCorrect === false)
                    incorrectWordFound = true;

                coloredWords.push(
                    <span key={index + dashCounter + splitCounter} className={FirstIsCorrect ? "green" : FirstInUserAns ? "yellow" : "red"}>
                        {wordList[0]}
                    </span>
                );
                splitCounter++;
                coloredWords.push(
                    <span key={index + dashCounter + splitCounter} className={FirstIsCorrect === true || SecondIsCorrect === true ? "green" : "red"}>
                        {dashChar}
                    </span>
                );
                splitCounter++;
                coloredWords.push(
                    <span key={index + dashCounter + splitCounter} className={SecondIsCorrect ? "green" : SecondInUserAns ? "yellow" : "red"}>
                        {wordList[1] + " "}
                    </span>
                );
                splitCounter++;

            // all other normal cases
            } else {
                const isInUserAns = setUserAns.has(listVerse[index + dashCounter]);
                const isCorrect = index + dashCounter >= listUserAns.length ? false : listUserAns[index + dashCounter] === listVerse[index + dashCounter];
                if (isCorrect === false)
                    incorrectWordFound = true;
                coloredWords.push(
                    <span key={index + dashCounter + splitCounter} className={isCorrect ? "green" : isInUserAns ? "yellow" : "red"}>
                        {word + " "}
                    </span>
                );
            }
        });

        // change what the display is by useState
        setShowVerse(true);
        setColoredVerse(coloredWords);
    }

    const shuffleVerses = () => {
        const newList = JSON.parse(JSON.stringify(textLines));
        for (let i = newList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newList[i], newList[j]] = [newList[j], newList[i]];
        }
        setTextLines(newList);
        changeVerse(newList[0], 0);
    }

    // runs when a verse card is clicked
    const changeVerse = (newTitle, newIndex) => {
        setShowVerse(false); // hides the verse
        setTitle(newTitle); // changes the title
        setVerseIndex(newIndex);
        document.getElementById("verseAttempt").value = ""; // resets text area

        // gets the verse data
        let book, chapter, verseStart, verseEnd;
        const temp = newTitle.split(":");
        const bookAndChapter = temp[0].split(" ");
        if (bookAndChapter.length === 2) {
            book = bookAndChapter[0];
            chapter = bookAndChapter[1];
        } else {
            book = bookAndChapter[0] + " " + bookAndChapter[1];
            chapter = bookAndChapter[2];
        }

        const verses = temp[1].split("-");
        if (verses.length === 1) {
            verseStart = verses[0];
            verseEnd = verses[0];
        } else {
            verseStart = verses[0];
            verseEnd = verses[1];
        }
        
        // add all the verses together for things with different start and end verses
        let str = "";
        for (let i = verseStart; i <= verseEnd; i++) 
            str += jsonData[book][chapter][i] + " ";
        setVerse(str);
    }

    // calculates the score of the verse
    const onKeyPress = (e) => {
        // submit on enter
        if(e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            const userAns = document.getElementById("verseAttempt").value;  //gets the userAns
            
            // parses the user anwser and the json answer to ignore case and punctuation
            const punctuationRegex = /[!"#$%&‘'”“’()*+,./:;<=>?@[\]^_`{|}~-—]/g; // punctation '-—' is not included bc Hebrews 4:12 and Philipans 4:9
            const parsedVerse = verse.toLowerCase().replace(punctuationRegex, ' ');
            const parsedUserAns = userAns.toLowerCase().replace(punctuationRegex, ' ');
            
            // gets the lists and sets of all the words used and compares them
            const listVerse = parsedVerse.split(" ").filter(verse => verse.trim() !== ""); 
            const listUserAns = parsedUserAns.split(" ").filter(ans => ans.trim() !== "");
            const setVerses = new Set(listVerse);
            const setUserAns = new Set(listUserAns);
            
            //TODO: make it loop the longer thing answer or verse
            // Generate colored verse content
            const coloredWords = [];
            let fullyCorrect = true;
            let dashCounter = 0;
            let splitCounter = 0; // here just for key and because there are three spans if there is a dash
            let minusScore = 0;
            verse.split(" ").filter(verse => verse.trim() !== "").forEach((word, index) => {
                // handles wrong word in the middle of a dash
                if (word.indexOf("-") > -1 || word.indexOf("—") > -1) {
                    const dashChar = word.indexOf("-") > -1 ? "-" : "—";
                    const wordList = word.split(dashChar);
                    const FirstInUserAns = setUserAns.has(listVerse[index + dashCounter]);
                    const FirstIsCorrect = index + dashCounter >= listUserAns.length ? false : listUserAns[index + dashCounter] === listVerse[index + dashCounter];
                    if (FirstIsCorrect === false) 
                        fullyCorrect = false;
                    if (FirstInUserAns === true && FirstIsCorrect === false)
                        minusScore += 0.5;
                    dashCounter++;

                    const SecondInUserAns = setUserAns.has(listVerse[index + dashCounter]);
                    const SecondIsCorrect = index + dashCounter >= listUserAns.length ? false : listUserAns[index + dashCounter] === listVerse[index + dashCounter];
                    if (SecondIsCorrect === false)
                        fullyCorrect = false;
                    if (SecondInUserAns === true && SecondIsCorrect === false)
                        minusScore += 0.5;
                    coloredWords.push(
                        <span key={index + dashCounter + splitCounter} className={FirstIsCorrect ? "green" : FirstInUserAns ? "yellow" : "red"}>
                            {wordList[0]}
                        </span>
                    );
                    splitCounter++;
                    coloredWords.push(
                        <span key={index + dashCounter + splitCounter} className={FirstIsCorrect === true || SecondIsCorrect === true ? "green" : "red"}>
                            {dashChar}
                        </span>
                    );
                    splitCounter++;
                    coloredWords.push(
                        <span key={index + dashCounter + splitCounter} className={SecondIsCorrect ? "green" : SecondInUserAns ? "yellow" : "red"}>
                            {wordList[1] + " "}
                        </span>
                    );
                    splitCounter++;

                // all other normal cases
                } else {
                    const isInUserAns = setUserAns.has(listVerse[index + dashCounter]);
                    const isCorrect = index + dashCounter >= listUserAns.length ? false : listUserAns[index + dashCounter] === listVerse[index + dashCounter];
                    if (isCorrect === false)
                        fullyCorrect = false;
                    if (isInUserAns === true && isCorrect === false)
                        minusScore += 0.5;
                    coloredWords.push(
                        <span key={index + dashCounter + splitCounter} className={isCorrect ? "green" : isInUserAns ? "yellow" : "red"}>
                            {word + " "}
                        </span>
                    );
                }
            });

            if (listUserAns.length > listVerse.length) {
                for (let i = listVerse.length; i < listUserAns.length; i++) {
                    const isInVerseAns = setVerses.has(listUserAns[i]);
                    coloredWords.push(
                        <span key={i + dashCounter + splitCounter} className={isInVerseAns ? "yellow" : "red"}>
                            {listUserAns[i] + " "}
                        </span>
                    );
                    minusScore += 0.5;
                    if (isInVerseAns === false)
                        minusScore += 0.5;
                }
            }

            // change what the display is by useState
            setShowVerse(true);
            setColoredVerse(coloredWords);
            
            const score = Math.trunc((setVerses.intersection(setUserAns).size - minusScore)/setVerses.size*10);
            if (listVerseScores[title] < score) {
                localStorage.setItem(title, score);
                listVerseScores[title] = score;
            }
            
            // move on to next work if perfect
            if (verseIndex+1 < textLines.length && listVerse.length === listUserAns.length && fullyCorrect === true) {
                changeVerse(textLines[verseIndex+1], verseIndex+1)
            }
        }

        // hint on alt-h
        if(e.keyCode === 72 && e.altKey === true) { giveHint(); }
        // reset on alt-r
        if(e.keyCode === 82 && e.altKey === true) { resetVerse(); }
        // reset all on alt-a
        if(e.keyCode === 65 && e.altKey === true) { resetStorage(); }
        // shuffle on alt-s
        if (e.keyCode === 83 && e.altKey === true) { shuffleVerses(); }
    }

    return (
        <div className="script-mem-container">
            {/* four absolute divs */}
            {/* <div className="script-mem-reset-all" onClick={resetStorage}>
                reset all
            </div>
            <div className="script-mem-reset" onClick={resetVerse}>
                reset
            </div>
            <div className="script-mem-hint" onClick={giveHint}>
                hint
            </div>
            <div className="script-mem-shuffle" onClick={shuffleVerses}>
                shuffle
            </div> */}
            <div className="script-mem-button-container">
                <div className="script-mem-button background-red" onClick={resetStorage}>
                    reset all
                </div>
                <div className="script-mem-button background-red" onClick={resetVerse}>
                    reset
                </div>
                <div className="script-mem-button background-yellow" onClick={giveHint}>
                    hint
                </div>
                <div className="script-mem-button background-green" onClick={shuffleVerses}>
                    shuffle
                </div>
            </div>

            {/* start of the page */}
            <div id="title" className="script-mem-title">
                {title}
            </div>
            <form id="verseAttemptForm">
                <textarea id="verseAttempt" className="script-mem-big-input" name="verseAttempt" rows={5} cols={50} onKeyDown={onKeyPress}/>
            </form>
            <div id="verse" className={`script-mem-verse ${showVerse ? "" : "hidden"}`}>
                {coloredVerse}
            </div>

            {/* maps the array to a verse card */}
            <div className="script-mem-scrollable">
                {textLines.map((line, index) => (
                    <div key={index} onClick={() => changeVerse(line, index)}>
                        <Card title={line} score={listVerseScores[line]}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScriptureMemory;
