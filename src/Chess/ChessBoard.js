import { useState } from "react";
import Pawn from "./Pawn";
import "@fontsource/montserrat";

function ChessBoard() {
    const fileList = [ "A", "B", "C", "D", "E", "F", "G", "H" ];
    const rankList = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

    const whitePiecesSet = new Set();
    const blackPiecesSet = new Set();

    const [whitePawnLocation, setWhitePawnLocation] = useState( [ -1, -1 ] ); // only for en passant so only valid when last move was a pawn
    const [blackPawnLocation, setBlackPawnLocation] = useState( [ -1, -1 ] ); // only for en passant so only valid when last move was a pawn

    // #whitePieces = [ new Pawn( "W", "A", 2 ), new Pawn( "W", "B", 2 ), new Pawn( "W", "C", 2 ), new Pawn( "W", "D", 2 ),
    //     new Pawn( "W", "E", 2 ), new Pawn( "W", "F", 2 ), new Pawn( "W", "G", 2 ), new Pawn( "W", "H", 2 ), 
    //     new Rook( "W", "A", 1 ), new Rook( "W", "H", 1 ), new Knight( "W", "B", 1 ), new Knight( "W", "G", 1),
    //     new Bishop( "W", "C", 1 ), new Bishop( "W", "F", 1 ), new Queen( "W", "D", 1 ), new King( "W", "E", 1 ) ];
    // #blackPieces = [ new Pawn( "B", "A", 7 ), new Pawn( "B", "B", 7 ), new Pawn( "B", "C", 7 ), new Pawn( "B", "D", 7 ),
    //     new Pawn( "B", "E", 7 ), new Pawn( "B", "F", 7 ), new Pawn( "B", "G", 7 ), new Pawn( "B", "H", 7 ),
    //     new Rook( "B", "A", 8 ), new Rook( "B", "H", 8 ), new Knight( "B", "B", 8 ), new Knight( "B", "G", 8 ),
    //     new Bishop( "B", "C", 8 ), new Bishop( "B", "F", 8 ), new Queen( "B", "D", 8 ), new King( "B", "E", 8 ) ];
  
    // constructor() {
    //     for ( let fileIndex = 0; fileIndex < 8; fileIndex++ ) {
    //         this.#whitePiecesLocationSet.add( [ this.#fileList[fileIndex], 1 ] );
    //         this.#whitePiecesLocationSet.add( [ this.#fileList[fileIndex], 2 ] );
    //     }

    //     for ( let fileIndex = 0; fileIndex < 8; fileIndex++ ) {
    //         this.#blackPiecesLocationSet.add( [ this.#fileList[fileIndex], 7 ] );
    //         this.#blackPiecesLocationSet.add( [ this.#fileList[fileIndex], 8 ] );
    //     }
    // }

    // returns the index of the piece to be moved in either whitePieces or blackPieces
    // returns -1 if there are no pieces on that square
    // indexOfPiece( color, file, rank ) {
    //     if ( color == "W" ) {
    //         for ( let i = 0; i < this.#whitePieces.length; i++ )
    //             if ( JSON.stringify( this.#whitePieces[i].getLocation() ) == JSON.stringify( [ file, rank ] ) )
    //                 return i;
    //         return -1
    //     }
    //     if ( color == "B" ) {
    //         for ( let i = 0; i < this.#blackPieces.length; i++ )
    //             if ( JSON.stringify( this.#blackPieces[i].getLocation() ) == JSON.stringify( [ file, rank ] ) )
    //                 return i;
    //         return -1
    //     }
    // }

    // handleMove( color, file, rank) {
    //     console.log("File: " + file);
    //     console.log("Rank: " +  rank);
    //     let pieceIndex = this.indexOfPiece( color, file, rank );
    //     if ( pieceIndex == -1 )
    //         console.log( "ERROR: PIECE NOT FOUND" );
        
    //     if ( color == "W" ) {
    //         console.log( this.#whitePieces[pieceIndex].getMoves( this.#whitePiecesLocationSet, this.#blackPiecesLocationSet, 
    //                                                              this.#whitePawnLocation, this.#whitePawnLocation ) );
    //     } else if ( color == "B" ) {
    //         console.log( this.#blackPieces[pieceIndex].getMoves() );
    //     }
    // }

    // const displayMoves = () => {
    //     console.log(getPawnMoves())
    // };

    return (
        <div className="board-container">
            <Pawn 
                color="W"
                file="A"
                rank={2} 
                whitePiecesSet={whitePiecesSet}
                blackPiecesSet={blackPiecesSet}
                whitePawnLocation={whitePawnLocation}
                blackPawnLocation={blackPawnLocation}
            />
        </div>
    )
}

export default ChessBoard;
