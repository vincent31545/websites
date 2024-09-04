import { useState } from "react";
import { getFileRight, getFileLeft } from "./Piece.js"
import "@fontsource/montserrat";

function King( { color, file, rank, whitePiecesSet, blackPiecesSet } ) {
    const [ kingMoved, setKingMoved ] = useState( false );
    
    // whitePiecesSet: set of all white piece locations
    // blackPiecesSet: set of all black piece locations
    const getKingMoves = () => {
        let possibleMoves = [];

        if ( color === "W" ) {
            // move/capture top, bottom, right, left
            if ( rank !== 8 &&
                ! whitePiecesSet.has( [ file, rank + 1 ] ) )
                possibleMoves.push( [ file, rank + 1 ] );
            if ( rank !== 1 &&
                ! whitePiecesSet.has( [ file, rank - 1 ] ) )
                possibleMoves.push( [ file, rank - 1 ] );
            if ( file !== "H" &&
                ! whitePiecesSet.has( [ getFileRight( file ), rank ] ) )
                possibleMoves.push( [ getFileRight( file ), rank ] );
            if ( file !== "A" &&
                ! whitePiecesSet.has( [ getFileLeft( file ), rank ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank ] );

            // move/capture top right, top left, bottom right, bottom left
            if ( rank !== 8 && file !== "H" &&
                ! whitePiecesSet.has( [ getFileRight( file ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank + 1 ] );
            if ( rank !== 8 && file !== "A" &&
                ! whitePiecesSet.has( [ getFileLeft( file ), rank + 1 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank + 1 ] );
            if ( rank !== 1 && file !== "H" &&
                ! whitePiecesSet.has( [ getFileRight( file ), rank - 1 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank - 1 ] );
            if ( rank !== 1 && file !== "A" &&
                ! whitePiecesSet.has( [ getFileLeft( file ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank - 1 ] );
        }

        if ( color === "B" ) {
            // move/capture top, bottom, right, left
            if ( rank !== 8 &&
                ! blackPiecesSet.has( [ file, rank + 1 ] ) )
                possibleMoves.push( [ file, rank + 1 ] );
            if ( rank !== 1 &&
                ! blackPiecesSet.has( [ file, rank - 1 ] ) )
                possibleMoves.push( [ file, rank - 1 ] );
            if ( file !== "H" &&
                ! blackPiecesSet.has( [ getFileRight( file ), rank ] ) )
                possibleMoves.push( [ getFileRight( file ), rank ] );
            if ( file !== "A" &&
                ! blackPiecesSet.has( [ getFileLeft( file ), rank ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank ] );

            // move/capture top right, top left, bottom right, bottom left
            if ( rank !== 8 && file !== "H" &&
                ! blackPiecesSet.has( [ getFileRight( file ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank + 1 ] );
            if ( rank !== 8 && file !== "A" &&
                ! blackPiecesSet.has( [ getFileLeft( file ), rank + 1 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank + 1 ] );
            if ( rank !== 1 && file !== "H" &&
                ! blackPiecesSet.has( [ getFileRight( file ), rank - 1 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank - 1 ] );
            if ( rank !== 1 && file !== "A" &&
                ! blackPiecesSet.has( [ getFileLeft( file ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank - 1 ] );
        }

        return possibleMoves;

    };

    const displayKingMoves = () => {
        console.log( getKingMoves() )
    };

    return (
        <div className="king-container" onClick={ displayKingMoves }>
            King
        </div>
    )
}

export default King;
