const fs = require('fs');

// Function to parse a Bible reference into book, chapter, and verses
function parseReference(reference) {
    const parts = reference.split(' ');
    const book = parts.slice(0, -1).join(' ');
    const chapterAndVerses = parts[parts.length - 1];

    const [chapter, verses] = chapterAndVerses.split(':');
    const verseRange = verses.split('-');
    const startVerse = parseInt(verseRange[0].trim(), 10);
    const endVerse = verseRange[1] ? parseInt(verseRange[1].trim(), 10) : startVerse;
    
    const verseList = [];
    for (let i = startVerse; i <= endVerse; i++) {
        verseList.push(i.toString());
    }

    return { book, chapter: parseInt(chapter, 10), verses: verseList};
}


// Function to read the text file and parse references
function readReferencesFromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const lines = data.split("\n").sort().join("\n");
        fs.writeFile(filename, lines, (err) => err && console.error(err));

        return data.split('\n')
            .map(line => line.trim())
            .filter(line => line !== '')
            .map(parseReference);
    } catch (err) {
        console.error(`Error reading the file: ${err}`);
        return [];
    }
}


// Read the JSON file synchronously
const data = fs.readFileSync('verses.json', 'utf8');
const jsonData = JSON.parse(data);
var textData = "";

// Input file containing Bible references
const inputFile = 'versesAll.txt';

// Read and parse references from the text file
const references = readReferencesFromFile(inputFile);

// Group references by book, chapter, and verse
async function updateReferences(references, jsonData) {
    for (const ref of references) {
        const { book, chapter, verses } = ref;

        // console.log(book + " " + chapter + ":" + verses[0] + "-" + verses[verses.length-1]);
        if (verses.length == 1)
            textData += book + " " + chapter + ":" + verses[0] + "\n";
        else
            textData += book + " " + chapter + ":" + verses[0] + "-" + verses[verses.length-1] + "\n";

        if (!(book in jsonData)) {
            console.log("ERROR: No book");
        }

        if (!(chapter in jsonData[book])) {
            console.log("ERROR: No chapter");
        }

        for (const verse of verses) {
            if (!(verse in jsonData[book][chapter])) {
                console.log("ERROR: No verse");
            }
            // console.log(jsonData[book][chapter][verse]);
            textData += jsonData[book][chapter][verse] + " ";
        }
1
        textData += "\n\n";
    }

    console.log(textData);

    // Write JSON string to a file
    const outputFile = 'versesCard.txt';
    fs.writeFileSync(outputFile, textData);

    console.log(`Text file '${outputFile}' has been successfully updated.`);
}

updateReferences(references, jsonData);
