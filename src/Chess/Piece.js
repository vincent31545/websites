const fileList = [ "A", "B", "C", "D", "E", "F", "G", "H" ];
const rankList = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

export function translateLocation( file, rank) {
    const fileIndex = fileList.indexOf( file );
    if ( fileIndex === -1 )
        return [ -1, -1 ];

    console.log("ERROR TRANSLATE");
    return [ rank - 1, fileIndex ];
}

export function translateNumbers( row, col ) {
    return [ fileList[col], rankList[row] ];
}


// returns the file to the right: A -> B
// returns -1 on failure (H)
export function getFileRight( file ) {
    const fileIndex = fileList.indexOf( file );
    if ( fileIndex !== -1 && fileIndex < 7 )
        return fileList[ fileIndex + 1 ];

    return -1;
}

// returns the file to the right: B -> A
// returns -1 on failure (A)
export function getFileLeft( file ) {
    const fileIndex = fileList.indexOf( file );
    if ( fileIndex > 0 ) 
        return fileList[ fileIndex - 1 ];

    return -1;
}