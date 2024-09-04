import { translateLocation } from "./Piece.js"
import "@fontsource/montserrat";

function Bishop( { color, file, rank, whitePiecesSet, blackPiecesSet } ) {
    
    // whitePiecesSet: set of all white piece locations
    // blackPiecesSet: set of all black piece locations
    const getBishopMoves = () => {
        let possibleMoves = []
        let bishopLocation = translateLocation();

        if ( color === "W" ) {
            // move/capture top right diagonal
            let row = bishopLocation[0];
            let col = bishopLocation[1];
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
            row = bishopLocation[0];
            col = bishopLocation[1];
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
            row = bishopLocation[0];
            col = bishopLocation[1];
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
            row = bishopLocation[0];
            col = bishopLocation[1];
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
            // move/capture top right diagonal
            let row = bishopLocation[0];
            let col = bishopLocation[1];
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
            row = bishopLocation[0];
            col = bishopLocation[1];
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
            row = bishopLocation[0];
            col = bishopLocation[1];
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
            row = bishopLocation[0];
            col = bishopLocation[1];
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

    const displayBishopMoves = () => {
        console.log( getBishopMoves() )
    };

    return (
        <div className="bishop-container" onClick={ displayBishopMoves }>
            Bishop
        </div>
    )
}

export default Bishop;
