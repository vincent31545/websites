import { useState } from "react";
import { translateLocation } from "./Piece.js"
import "@fontsource/montserrat";

function Rook( { color, file, rank, whitePiecesSet, blackPiecesSet } ) {
    const [ rookMoved, setRookMoved ] = useState( false );
    
    // whitePiecesSet: set of all white piece locations
    // blackPiecesSet: set of all black piece locations
    const getRookMoves = () => {
        let possibleMoves = [];
        let rookLocation = translateLocation( file, rank );
        
        if ( color == "W" ) {
            // move/capture top
            for ( let row = rookLocation[0]; row < 8; row++ ) {
                if ( whitePiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, rookLocation[1] ) );
                if ( blackPiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = rookLocation[0]; row >= 0; row-- ) {
                if ( whitePiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, rookLocation[1] ) );
                if ( blackPiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = rookLocation[1]; col < 8; col++ ) {
                if ( whitePiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( rookLocation[0], col ) );
                if ( blackPiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = rookLocation[1]; col >= 0; col-- ) {
                if ( whitePiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( rookLocation[0], col ) );
                if ( blackPiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
            }
        }

        if ( color == "B" ) {
            // move/capture top
            for ( let row = rookLocation[0]; row < 8; row++ ) {
                if ( blackPiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, rookLocation[1] ) );
                if ( whitePiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = rookLocation[0]; row >= 0; row-- ) {
                if ( blackPiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, rookLocation[1] ) );
                if ( whitePiecesSet.has( translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = rookLocation[1]; col < 8; col++ ) {
                if ( blackPiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( rookLocation[0], col ) );
                if ( whitePiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = rookLocation[1]; col >= 0; col-- ) {
                if ( blackPiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( rookLocation[0], col ) );
                if ( whitePiecesSet.has( translateLocation( rookLocation[0], col ) ) )
                    break;
            }
        }

        return possibleMoves;
    };

    const displayRookMoves = () => {
        console.log( getRookMoves() )
    };

    return (
        <div className="rook-container" onClick={ displayRookMoves }>
            Rook
        </div>
    )
}

export default Rook;
