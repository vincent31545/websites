import {getFileRight, getFileLeft } from "./Piece.js"
import "@fontsource/montserrat";

function Knight( { color, file, rank, whitePiecesSet, blackPiecesSet } ) {
    
    // whitePiecesSet: set of all white piece locations
    // blackPiecesSet: set of all black piece locations
    const getKnightMoves = () => {
        let possibleMoves = []
        if ( color === "W") {
            // move/capture top
            if ( rank < 7 && file !== "H" &&
                ! whitePiecesSet.has( [ getFileRight( file ), rank + 2 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank + 2 ] );
            if ( rank < 7 && file !== "A" &&
                ! whitePiecesSet.has( [ getFileLeft( file ), rank + 2 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank + 2 ] );

            // move/capture bottom
            if ( rank > 2 && file !== "H" &&
                ! whitePiecesSet.has( [ getFileRight( file ), rank - 2 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank - 2 ] );
            if ( rank > 2 && file !== "A" &&
                ! whitePiecesSet.has( [ getFileLeft( file ), rank - 2 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank - 2 ] );

            // move/capture right
            if ( rank < 8 && file !== "G" && file !== "H" &&
                ! whitePiecesSet.has( [ getFileRight( getFileRight( file ) ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( getFileRight( file ) ), rank + 1 ] );
            if ( rank > 1 && file !== "G" && file !=="H" &&
                ! whitePiecesSet.has( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] );

            // move/capture left
            if ( rank < 8 && file !== "A" && file !== "B" &&
                ! whitePiecesSet.has( [ getFileRight( getFileRight( file ) ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( getFileRight( file ) ), rank + 1 ] );
            if ( rank > 1 && file !== "A" && file !=="B" &&
                ! whitePiecesSet.has( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] );
        }

        if ( color === "B") {
            // move/capture top
            if ( rank < 7 && file !== "H" &&
                ! blackPiecesSet.has( [ supdefaulter.getFileRight( file ), rank + 2 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank + 2 ] );
            if ( rank < 7 && file !== "A" &&
                ! blackPiecesSet.has( [ getFileLeft( file ), rank + 2 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank + 2 ] );

            // move/capture bottom
            if ( rank > 2 && file !== "H" &&
                ! blackPiecesSet.has( [ getFileRight( file ), rank - 2 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank - 2 ] );
            if ( rank > 2 && file !== "A" &&
                ! blackPiecesSet.has( [ getFileLeft( file ), rank - 2 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank - 2 ] );

            // move/capture right
            if ( rank < 8 && file !== "G" && file !== "H" &&
                ! blackPiecesSet.has( [ getFileRight( getFileRight( file ) ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( getFileRight( file ) ), rank + 1 ] );
            if ( rank > 1 && file !== "G" && file !=="H" &&
                ! blackPiecesSet.has( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] );

            // move/capture left
            if ( rank < 8 && file !== "A" && file !== "B" &&
                ! blackPiecesSet.has( [ getFileRight( getFileRight( file ) ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( getFileRight( file ) ), rank + 1 ] );
            if ( rank > 1 && file !== "A" && file !=="B" &&
                ! blackPiecesSet.has( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( getFileLeft( file ) ), rank - 1 ] );
        }

        return possibleMoves;
    };

    const displayKnightMoves = () => {
        console.log( getKnightMoves() )
    };

    return (
        <div className="knight-container" onClick={ displayKnightMoves }>
            Knight
        </div>
    )
}

export default Knight;
