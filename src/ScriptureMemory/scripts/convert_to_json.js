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

async function getDataFromApi(parsedReference) {
    const apiKey = "a695f5bc0c958a923973c2b0d0590238920e1ddc"; 
    const url = `https://api.esv.org/v3/passage/text/?q=${parsedReference}
                 &include-verse-numbers=false&include-headings=false
                 &include-footnotes=false&include-passage-references=false
                 &include-first-verse-numbers=false&indent-poetry=false
                 &include-copyright=false&include-short-copyright=false`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Token ${apiKey}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        let temp = result["passages"][0].split("\n\n  ", 2);
        temp[1] = temp[1].trim();
        // const punctuationRegex = /[!"#$%&'“()*+,-./:;<=>?@[\]^_`{|}~]/g;
        const punctuationRegex = "“";
        const otherPunctuation = "”";
        const anotherPunctuation = "’";
        temp[1] = temp[1].replace(punctuationRegex, '"').replace(otherPunctuation, '"').replace(anotherPunctuation, "'");

        return new Promise((resolve, reject) => {
            resolve(temp[1]);
        });
    } catch (error) {
        console.log(error);
        return "error";
    }
}


// Read the JSON file synchronously
const data = fs.readFileSync('verses.json', 'utf8');
const jsonData = JSON.parse(data);

// Input file containing Bible references
const inputFile = 'versesAll.txt';

// Read and parse references from the text file
const references = readReferencesFromFile(inputFile);



// Group references by book, chapter, and verse
async function updateReferences(references, jsonData) {
    for (const ref of references) {
        const { book, chapter, verses } = ref;

        if (!(book in jsonData)) {
            jsonData[book] = {};
        }

        if (!(chapter in jsonData[book])) {
            jsonData[book][chapter] = {};
        }

        for (const verse of verses) {
            if (!(verse in jsonData[book][chapter])) {
                const content = await getDataFromApi(`${book} ${chapter}:${verse}`);
                console.log(`Fetched content for ${book} ${chapter}:${verse} - ${content}\n`);
                jsonData[book][chapter][verse] = content;
            }
        }
    }

    // Convert to JSON
    const jsonContent = JSON.stringify(jsonData, null, 2);

    // Write JSON string to a file
    const outputFile = 'verses.json';
    fs.writeFileSync(outputFile, jsonContent + "\n");

    console.log(`JSON file '${outputFile}' has been successfully updated.`);
}

updateReferences(references, jsonData);
