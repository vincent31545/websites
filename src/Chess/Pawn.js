import { getFileRight, getFileLeft } from "./Piece.js"
import "@fontsource/montserrat";

function Pawn( { color, file, rank, whitePiecesSet, blackPiecesSet, whitePawnLocation, blackPawnLocation } ) {
    
    // whitePiecesSet: set of all white piece locations
    // blackPiecesSet: set of all black piece locations
    // whitePawnLocation: location of the white pawn (only if last move was a pawn move [ -1, -1 ] on default)
    // blackPawnLocation: location of the black pawn (only if last move was a pawn move [ -1, -1 ] on default)
    const getPawnMoves = () => {
        let possibleMoves = []
        if ( color === "W" ) {
            // move 1 space forward
            if ( ! whitePiecesSet.has( [ file, rank + 1 ] ) &&
                 ! blackPiecesSet.has( [ file, rank + 1 ] ) )
                possibleMoves.push( [ file, rank + 1 ] );

            // first move 2 spaces
            if ( rank === 2 &&
                ! whitePiecesSet.has( [ file, rank + 1 ] ) &&
                ! blackPiecesSet.has( [ file, rank + 1 ] ) &&
                ! whitePiecesSet.has( [ file, rank + 2 ] ) &&
                ! blackPiecesSet.has( [ file, rank + 2 ] ))
                possibleMoves.push( [ file, rank + 2 ] );
            
            // capturing diagonally
            if ( file !== "A" &&
                blackPiecesSet.has( [ getFileLeft( file ), rank + 1 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank + 1 ] );
            if ( file !== "H" &&
                blackPiecesSet.has( [ getFileRight( file ), rank + 1 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank + 1 ] );
            
            // En passant
            if ( rank === 5 && file !== "A" &&
                JSON.stringify( blackPawnLocation ) === JSON.stringify( [ getFileLeft( file ), rank ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank + 1 ] );
            if ( rank === 5 && file !== "H" &&
                JSON.stringify( blackPawnLocation ) === JSON.stringify( [ getFileRight( file ), rank ] ) )
                possibleMoves.push( [ getFileRight( file ), rank + 1 ] );
        }

        if ( color === "B" ) {
            // move 1 space forward
            if ( ! whitePiecesSet.has( [ file, rank - 1 ] ) &&
                 ! blackPiecesSet.has( [ file, rank - 1 ] ))
                possibleMoves.push( [ file, rank - 1 ] );

            // first move 2 spaces
            if ( rank === 7  &&
                ! whitePiecesSet.has( [ file, rank - 1 ] ) &&
                ! blackPiecesSet.has( [ file, rank - 1 ] ) &&
                ! whitePiecesSet.has( [ file, rank - 2 ] ) &&
                ! blackPiecesSet.has( [ file, rank - 2 ] ))
                possibleMoves.push( [ file, rank - 2 ] );
            
            // capturing diagonally
            if ( file !== "A" &&
                whitePiecesSet.has( [ getFileLeft( file ), rank - 1 ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank - 1 ] );
            if ( file !== "H" &&
                whitePiecesSet.has( [ getFileRight( file ), rank - 1 ] ) )
                possibleMoves.push( [ getFileRight( file ), rank - 1 ] );

            // En passant
            if ( rank === 4 && file !== "A" &&
                JSON.stringify( whitePawnLocation ) === JSON.stringify( [ getFileLeft( file ), rank ] ) )
                possibleMoves.push( [ getFileLeft( file ), rank - 1 ] );
            if ( rank === 4 && file !== "H" &&
                JSON.stringify( whitePawnLocation ) === JSON.stringify( [ getFileRight( file ), rank ] ) )
                possibleMoves.push( [ getFileRight( file ), rank - 1 ] );
        }

        return possibleMoves;
    };

    const displayPawnMoves = () => {
        console.log( getPawnMoves() )
    };

    return (
        <div className="pawn-container" onClick={ displayPawnMoves }>
            PAWN
        </div>
    )
}

export default Pawn;
