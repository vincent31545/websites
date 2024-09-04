import { translateLocation } from "./Piece.js"
import "@fontsource/montserrat";

function Queen( { color, file, rank, whitePiecesSet, blackPiecesSet } ) {
    
    // whitePiecesSet: set of all white piece locations
    // blackPiecesSet: set of all black piece locations
    const getQueenMoves = () => {
        let possibleMoves = [];
        let queenLocation = translateLocation( file, rank );
        
        if ( color === "W" ) {
            // move/capture top
            for ( let row = queenLocation[0]; row < 8; row++ ) {
                if ( whitePiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, queenLocation[1] ) );
                if ( blackPiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = queenLocation[0]; row >= 0; row-- ) {
                if ( whitePiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, queenLocation[1] ) );
                if ( blackPiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = queenLocation[1]; col < 8; col++ ) {
                if ( whitePiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( queenLocation[0], col ) );
                if ( blackPiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = queenLocation[1]; col >= 0; col-- ) {
                if ( whitePiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( queenLocation[0], col ) );
                if ( blackPiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture top right diagonal
            let row = queenLocation[0];
            let col = queenLocation[1];
            while ( row < 8 && col < 8) {
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row++;
                col++;
            }
            
            // move/capture top left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row < 8 && col >= 0) {
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row++;
                col--;
            }
            
            // move/capture bottom right diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col < 8) {
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row--;
                col++;
            }

            // move/capture bottom left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col >= 0) {
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row--;
                col--;
            }
        }

        if ( color === "B" ) {
            // move/capture top
            for ( let row = queenLocation[0]; row < 8; row++ ) {
                if ( blackPiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, queenLocation[1] ) );
                if ( whitePiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = queenLocation[0]; row >= 0; row-- ) {
                if ( blackPiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( translateLocation( row, queenLocation[1] ) );
                if ( whitePiecesSet.has( translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = queenLocation[1]; col < 8; col++ ) {
                if ( blackPiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( queenLocation[0], col ) );
                if ( whitePiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = queenLocation[1]; col >= 0; col-- ) {
                if ( blackPiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( translateLocation( queenLocation[0], col ) );
                if ( whitePiecesSet.has( translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture top right diagonal
            let row = queenLocation[0];
            let col = queenLocation[1];
            while ( row < 8 && col < 8) {
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row++;
                col++;
            }
            
            // move/capture top left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row < 8 && col >= 0) {
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row++;
                col--;
            }
            
            // move/capture bottom right diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col < 8) {
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row--;
                col++;
            }

            // move/capture bottom left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col >= 0) {
                if ( blackPiecesSet.has( translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( translateLocation( row, col ) );
                if ( whitePiecesSet.has( translateLocation( row, col ) ) )
                    break;
                row--;
                col--;
            }
        }

        return possibleMoves;

    };

    const displayQueenMoves = () => {
        console.log( getQueenMoves() )
    };

    return (
        <div className="queen-container" onClick={ displayQueenMoves }>
            Queen
        </div>
    )
}

export default Queen;
