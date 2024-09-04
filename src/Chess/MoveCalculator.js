class Pawn extends Piece {
    #color;
    #file;
    #rank;
    constructor( color, file, rank ) {
        super( color, file, rank );
        this.#color = super.getColor();
        this.#file = super.getLocation()[0];
        this.#rank = super.getLocation()[1];
    }

    getMoves( whitePiecesSet, blackPiecesSet, whitePawn, blackPawn ) {
        let possibleMoves = []
        if ( this.#color == "W" ) {
            // move 1 space forward
            if ( ! whitePiecesSet.has( [ this.#file, this.#rank + 1 ] ) &&
                 ! blackPiecesSet.has( [ this.#file, this.#rank + 1 ] ) )
                possibleMoves.push( [ this.#file, this.#rank + 1 ] );

            // first move 2 spaces
            if ( this.#rank == 2 &&
                ! whitePiecesSet.has( [ this.#file, this.#rank + 1 ] ) &&
                ! blackPiecesSet.has( [ this.#file, this.#rank + 1 ] ) &&
                ! whitePiecesSet.has( [ this.#file, this.#rank + 2 ] ) &&
                ! blackPiecesSet.has( [ this.#file, this.#rank + 2 ] ))
                possibleMoves.push( [ this.#file, this.#rank + 2 ] );
            
            // capturing diagonally
            if ( this.#file != "A" &&
                blackPiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 1 ] );
            if ( this.#file != "H" &&
                blackPiecesSet.has( [ super.getFileRight( this.#file ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank + 1 ] );
            
            // En passant
            if ( this.#rank == 5 && this.#file != "A" &&
                blackPawn == [ super.getFileLeft( this.#file ), this.#rank ] )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 1 ] );
            if ( this.#rank == 5 && this.#file != "H" &&
                blackPawn == [ super.getFileRight( this.#file ), this.#rank ] )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank + 1 ] );
        }

        if ( this.color == "B" ) {
            // move 1 space forward
            if ( ! whitePiecesSet.has( [ this.#file, this.#rank - 1 ] ) &&
                 ! blackPiecesSet.has( [ this.#file, this.#rank - 1 ] ))
                possibleMoves.push( [ this.#file, this.#rank - 1 ] );

            // first move 2 spaces
            if ( this.#rank == 7  &&
                ! whitePiecesSet.has( [ this.#file, this.#rank - 1 ] ) &&
                ! blackPiecesSet.has( [ this.#file, this.#rank - 1 ] ) &&
                ! whitePiecesSet.has( [ this.#file, this.#rank - 2 ] ) &&
                ! blackPiecesSet.has( [ this.#file, this.#rank - 2 ] ))
                possibleMoves.push( [ this.#file, this.#rank - 2 ] );
            
            // capturing diagonally
            if ( this.#file != "A" &&
                whitePiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank - 1 ] );
            if ( this.#file != "H" &&
                whitePiecesSet.has( [ super.getFileRight( this.#file ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank - 1 ] );

            // En passant
            if ( this.#rank == 4 && this.#file != "A" &&
                whitePawn == [ super.getFileLeft( this.#file ), this.#rank ] )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 1 ] );
            if ( this.#rank == 4 && this.#file != "H" &&
                whitePawn == [ super.getFileRight( this.#file ), this.#rank ] )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank - 1 ] );
        }

        return possibleMoves;
    }
}

class Knight extends Piece {
    #color;
    #file;
    #rank;
    constructor( color, file, rank ) {
        super( color, file, rank );
        this.#color = super.getColor();
        this.#file = super.getLocation()[0];
        this.#rank = super.getLocation()[1];
    }

    getMoves( whitePiecesSet, blackPiecesSet ) {
        let possibleMoves = []
        if ( this.#color == "W") {
            // move/capture top
            if ( this.#rank < 7 && file != "H" &&
                ! whitePiecesSet.has( [ super.getFileRight( this.#file ), this.#rank + 2 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank + 2 ] );
            if ( this.#rank < 7 && file != "A" &&
                ! whitePiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank + 2 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 2 ] );

            // move/capture bottom
            if ( this.#rank > 2 && file != "H" &&
                ! whitePiecesSet.has( [ super.getFileRight( this.#file ), this.#rank - 2 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank - 2 ] );
            if ( this.#rank > 2 && file != "A" &&
                ! whitePiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank - 2 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank - 2 ] );

            // move/capture right
            if ( this.#rank < 8 && file != "G" && file != "H" &&
                ! whitePiecesSet.has( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] );
            if ( this.#rank > 1 && file != "G" && file !="H" &&
                ! whitePiecesSet.has( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] );

            // move/capture left
            if ( this.#rank < 8 && file != "A" && file != "B" &&
                ! whitePiecesSet.has( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] );
            if ( this.#rank > 1 && file != "A" && file !="B" &&
                ! whitePiecesSet.has( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] );
        }

        if ( this.#color == "B") {
            // move/capture top
            if ( this.#rank < 7 && file != "H" &&
                ! blackPiecesSet.has( [ supdefaulter.getFileRight( this.#file ), this.#rank + 2 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank + 2 ] );
            if ( this.#rank < 7 && file != "A" &&
                ! blackPiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank + 2 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 2 ] );

            // move/capture bottom
            if ( this.#rank > 2 && file != "H" &&
                ! blackPiecesSet.has( [ super.getFileRight( this.#file ), this.#rank - 2 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank - 2 ] );
            if ( this.#rank > 2 && file != "A" &&
                ! blackPiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank - 2 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank - 2 ] );

            // move/capture right
            if ( this.#rank < 8 && file != "G" && file != "H" &&
                ! blackPiecesSet.has( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] );
            if ( this.#rank > 1 && file != "G" && file !="H" &&
                ! blackPiecesSet.has( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] );

            // move/capture left
            if ( this.#rank < 8 && file != "A" && file != "B" &&
                ! blackPiecesSet.has( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( getFileRight( this.#file ) ), this.#rank + 1 ] );
            if ( this.#rank > 1 && file != "A" && file !="B" &&
                ! blackPiecesSet.has( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( super.getFileLeft( this.#file ) ), this.#rank - 1 ] );
        }

        return possibleMoves;
    }
}

class Bishop extends Piece {
    #color;
    constructor( color, file, rank ) {
        super( color, file, rank );
        this.#color = super.getColor();
    }

    getMoves( whitePiecesSet, blackPiecesSet ) {
        let possibleMoves = []
        let bishopLocation = super.translateLocation();

        if ( this.#color == "W" ) {
            // move/capture top right diagonal
            let row = bishopLocation[0];
            let col = bishopLocation[1];
            while ( row < 8 && col < 8) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col++;
            }
            
            // move/capture top left diagonal
            row = bishopLocation[0];
            col = bishopLocation[1];
            while ( row < 8 && col >= 0) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col--;
            }
            
            // move/capture bottom right diagonal
            row = bishopLocation[0];
            col = bishopLocation[1];
            while ( row >= 0 && col < 8) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col++;
            }

            // move/capture bottom left diagonal
            row = bishopLocation[0];
            col = bishopLocation[1];
            while ( row >= 0 && col >= 0) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col--;
            }
        }

        if ( this.#color == "B" ) {
            // move/capture top right diagonal
            let row = bishopLocation[0];
            let col = bishopLocation[1];
            while ( row < 8 && col < 8) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col++;
            }
            
            // move/capture top left diagonal
            row = bishopLocation[0];
            col = bishopLocation[1];
            while ( row < 8 && col >= 0) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col--;
            }
            
            // move/capture bottom right diagonal
            row = bishopLocation[0];
            col = bishopLocation[1];
            while ( row >= 0 && col < 8) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col++;
            }

            // move/capture bottom left diagonal
            row = bishopLocation[0];
            col = bishopLocation[1];
            while ( row >= 0 && col >= 0) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col--;
            }
        }

        return possibleMoves;
    }
}

class Rook extends Piece {
    #moved = false;
    #color;
    #file;
    #rank;
    constructor( color, file, rank ) {
        super( color, file, rank );
        this.#color = super.getColor();
        this.#file = super.getLocation()[0];
        this.#rank = super.getLocation()[1];
    }

    setMoved() {
        this.#moved = true;
    }

    getMoved() {
        return this.#moved;
    }

    getMoves( whitePiecesSet, blackPiecesSet ) {
        let possibleMoves = [];
        let rookLocation = super.translateLocation();
        
        if ( this.#color == "W" ) {
            // move/capture top
            for ( let row = rookLocation[0]; row < 8; row++ ) {
                if ( whitePiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, rookLocation[1] ) );
                if ( blackPiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = rookLocation[0]; row >= 0; row-- ) {
                if ( whitePiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, rookLocation[1] ) );
                if ( blackPiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = rookLocation[1]; col < 8; col++ ) {
                if ( whitePiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( rookLocation[0], col ) );
                if ( blackPiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = rookLocation[1]; col >= 0; col-- ) {
                if ( whitePiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( rookLocation[0], col ) );
                if ( blackPiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
            }
        }

        if ( this.#color == "B" ) {
            // move/capture top
            for ( let row = rookLocation[0]; row < 8; row++ ) {
                if ( blackPiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, rookLocation[1] ) );
                if ( whitePiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = rookLocation[0]; row >= 0; row-- ) {
                if ( blackPiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, rookLocation[1] ) );
                if ( whitePiecesSet.has( super.translateLocation( row, rookLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = rookLocation[1]; col < 8; col++ ) {
                if ( blackPiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( rookLocation[0], col ) );
                if ( whitePiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = rookLocation[1]; col >= 0; col-- ) {
                if ( blackPiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( rookLocation[0], col ) );
                if ( whitePiecesSet.has( super.translateLocation( rookLocation[0], col ) ) )
                    break;
            }
        }

        return possibleMoves;
    }
}

class Queen extends Piece {
    #color;
    #file;
    #rank;
    constructor( color, file, rank ) {
        super( color, file, rank );
        this.#color = super.getColor();
        this.#file = super.getLocation()[0];
        this.#rank = super.getLocation()[1];
    }

    getMoves() {
        let possibleMoves = [];
        let queenLocation = super.translateLocation();
        
        if ( this.#color == "W" ) {
            // move/capture top
            for ( let row = queenLocation[0]; row < 8; row++ ) {
                if ( whitePiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, queenLocation[1] ) );
                if ( blackPiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = queenLocation[0]; row >= 0; row-- ) {
                if ( whitePiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, queenLocation[1] ) );
                if ( blackPiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = queenLocation[1]; col < 8; col++ ) {
                if ( whitePiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( queenLocation[0], col ) );
                if ( blackPiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = queenLocation[1]; col >= 0; col-- ) {
                if ( whitePiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( queenLocation[0], col ) );
                if ( blackPiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture top right diagonal
            let row = queenLocation[0];
            let col = queenLocation[1];
            while ( row < 8 && col < 8) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col++;
            }
            
            // move/capture top left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row < 8 && col >= 0) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col--;
            }
            
            // move/capture bottom right diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col < 8) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col++;
            }

            // move/capture bottom left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col >= 0) {
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col--;
            }
        }

        if ( this.#color == "B" ) {
            // move/capture top
            for ( let row = queenLocation[0]; row < 8; row++ ) {
                if ( blackPiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, queenLocation[1] ) );
                if ( whitePiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture bottom
            for ( let row = queenLocation[0]; row >= 0; row-- ) {
                if ( blackPiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, queenLocation[1] ) );
                if ( whitePiecesSet.has( super.translateLocation( row, queenLocation[1] ) ) )
                    break;
            }

            // move/capture right
            for ( let col = queenLocation[1]; col < 8; col++ ) {
                if ( blackPiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( queenLocation[0], col ) );
                if ( whitePiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture left
            for ( let col = queenLocation[1]; col >= 0; col-- ) {
                if ( blackPiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( queenLocation[0], col ) );
                if ( whitePiecesSet.has( super.translateLocation( queenLocation[0], col ) ) )
                    break;
            }

            // move/capture top right diagonal
            let row = queenLocation[0];
            let col = queenLocation[1];
            while ( row < 8 && col < 8) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col++;
            }
            
            // move/capture top left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row < 8 && col >= 0) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row++;
                col--;
            }
            
            // move/capture bottom right diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col < 8) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col++;
            }

            // move/capture bottom left diagonal
            row = queenLocation[0];
            col = queenLocation[1];
            while ( row >= 0 && col >= 0) {
                if ( blackPiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                possibleMoves.push( super.translateLocation( row, col ) );
                if ( whitePiecesSet.has( super.translateLocation( row, col ) ) )
                    break;
                row--;
                col--;
            }
        }

        return possibleMoves;
    }
}

class King extends Piece {
    #moved = false;
    #color;
    #file;
    #rank;
    constructor( color, file, rank ) {
        super( color, file, rank );
        this.#color = super.getColor();
        this.#file = super.getLocation()[0];
        this.#rank = super.getLocation()[1];
    }

    setMoved() {
        this.#moved = true;
    }

    getMoved() {
        return this.#moved;
    }

    getMoves( whitePiecesSet, blackPiecesSet ) {
        let possibleMoves = [];

        if ( this.#color == "W" ) {
            // move/capture top, bottom, right, left
            if ( this.#rank != 8 &&
                ! whitePiecesSet.has( [ this.#file, this.#rank + 1 ] ) )
                possibleMoves.push( [ this.#file, this.#rank + 1 ] );
            if ( this.#rank != 1 &&
                ! whitePiecesSet.has( [ this.#file, this.#rank - 1 ] ) )
                possibleMoves.push( [ this.#file, this.#rank - 1 ] );
            if ( this.#file != "H" &&
                ! whitePiecesSet.has( [ super.getFileRight( this.#file ), this.#rank ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank ] );
            if ( this.#file != "A" &&
                ! whitePiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank ] );

            // move/capture top right, top left, bottom right, bottom left
            if ( this.#rank != 8 && this.#file != "H" &&
                ! whitePiecesSet.has( [ super.getFileRight( this.#file ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank + 1 ] );
            if ( this.#rank != 8 && this.#file != "A" &&
                ! whitePiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 1 ] );
            if ( this.#rank != 1 && this.#file != "H" &&
                ! whitePiecesSet.has( [ super.getFileRight( this.#file ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank - 1 ] );
            if ( this.#rank != 1 && this.#file != "A" &&
                ! whitePiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank - 1 ] );
        }

        if ( this.#color == "B" ) {
            // move/capture top, bottom, right, left
            if ( this.#rank != 8 &&
                ! blackPiecesSet.has( [ this.#file, this.#rank + 1 ] ) )
                possibleMoves.push( [ this.#file, this.#rank + 1 ] );
            if ( this.#rank != 1 &&
                ! blackPiecesSet.has( [ this.#file, this.#rank - 1 ] ) )
                possibleMoves.push( [ this.#file, this.#rank - 1 ] );
            if ( this.#file != "H" &&
                ! blackPiecesSet.has( [ super.getFileRight( this.#file ), this.#rank ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank ] );
            if ( this.#file != "A" &&
                ! blackPiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank ] );

            // move/capture top right, top left, bottom right, bottom left
            if ( this.#rank != 8 && this.#file != "H" &&
                ! blackPiecesSet.has( [ super.getFileRight( this.#file ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank + 1 ] );
            if ( this.#rank != 8 && this.#file != "A" &&
                ! blackPiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank + 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank + 1 ] );
            if ( this.#rank != 1 && this.#file != "H" &&
                ! blackPiecesSet.has( [ super.getFileRight( this.#file ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileRight( this.#file ), this.#rank - 1 ] );
            if ( this.#rank != 1 && this.#file != "A" &&
                ! blackPiecesSet.has( [ super.getFileLeft( this.#file ), this.#rank - 1 ] ) )
                possibleMoves.push( [ super.getFileLeft( this.#file ), this.#rank - 1 ] );
        }

        return possibleMoves;
    }
}


class Board {
    #fileList = [ "A", "B", "C", "D", "E", "F", "G", "H" ];
    #rankList = [ 1, 2, 3, 4, 5, 6, 7, 8 ];

    #whitePieces = [ new Pawn( "W", "A", 2 ), new Pawn( "W", "B", 2 ), new Pawn( "W", "C", 2 ), new Pawn( "W", "D", 2 ),
        new Pawn( "W", "E", 2 ), new Pawn( "W", "F", 2 ), new Pawn( "W", "G", 2 ), new Pawn( "W", "H", 2 ), 
        new Rook( "W", "A", 1 ), new Rook( "W", "H", 1 ), new Knight( "W", "B", 1 ), new Knight( "W", "G", 1),
        new Bishop( "W", "C", 1 ), new Bishop( "W", "F", 1 ), new Queen( "W", "D", 1 ), new King( "W", "E", 1 ) ];
    #blackPieces = [ new Pawn( "B", "A", 7 ), new Pawn( "B", "B", 7 ), new Pawn( "B", "C", 7 ), new Pawn( "B", "D", 7 ),
        new Pawn( "B", "E", 7 ), new Pawn( "B", "F", 7 ), new Pawn( "B", "G", 7 ), new Pawn( "B", "H", 7 ),
        new Rook( "B", "A", 8 ), new Rook( "B", "H", 8 ), new Knight( "B", "B", 8 ), new Knight( "B", "G", 8 ),
        new Bishop( "B", "C", 8 ), new Bishop( "B", "F", 8 ), new Queen( "B", "D", 8 ), new King( "B", "E", 8 ) ];

    #whitePiecesLocationSet = new Set();
    #blackPiecesLocationSet = new Set();

    #whitePawnLocation = [ -1, -1 ]; // only for en passant so only valid when last move was a pawn
    #blackPawnLocation = [ -1, -1 ]; // only for en passant so only valid when last move was a pawn

    constructor() {
        for ( let fileIndex = 0; fileIndex < 8; fileIndex++ ) {
            this.#whitePiecesLocationSet.add( [ this.#fileList[fileIndex], 1 ] );
            this.#whitePiecesLocationSet.add( [ this.#fileList[fileIndex], 2 ] );
        }

        for ( let fileIndex = 0; fileIndex < 8; fileIndex++ ) {
            this.#blackPiecesLocationSet.add( [ this.#fileList[fileIndex], 7 ] );
            this.#blackPiecesLocationSet.add( [ this.#fileList[fileIndex], 8 ] );
        }
    }

    // returns the index of the piece to be moved in either whitePieces or blackPieces
    // returns -1 if there are no pieces on that square
    indexOfPiece( color, file, rank ) {
        if ( color == "W" ) {
            for ( let i = 0; i < this.#whitePieces.length; i++ )
                if ( JSON.stringify( this.#whitePieces[i].getLocation() ) == JSON.stringify( [ file, rank ] ) )
                    return i;
            return -1
        }
        if ( color == "B" ) {
            for ( let i = 0; i < this.#blackPieces.length; i++ )
                if ( JSON.stringify( this.#blackPieces[i].getLocation() ) == JSON.stringify( [ file, rank ] ) )
                    return i;
            return -1
        }
    }

    handleMove( color, file, rank) {
        console.log("File: " + file);
        console.log("Rank: " +  rank);
        let pieceIndex = this.indexOfPiece( color, file, rank );
        if ( pieceIndex == -1 )
            console.log( "ERROR: PIECE NOT FOUND" );
        
        if ( color == "W" ) {
            console.log( this.#whitePieces[pieceIndex].getMoves( this.#whitePiecesLocationSet, this.#blackPiecesLocationSet, 
                                                                 this.#whitePawnLocation, this.#whitePawnLocation ) );
        } else if ( color == "B" ) {
            console.log( this.#blackPieces[pieceIndex].getMoves() );
        }
    }
}

// let board = [
//             [ "BR", "BKn", "BB", "BK", "BQ", "BB", "BKn", "BR" ],
//             [ "BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP" ],
//             [ "", "", "", "", "", "", "", "", "", "" ],
//             [ "", "", "", "", "", "", "", "", "", "" ],
//             [ "", "", "", "", "", "", "", "", "", "" ],
//             [ "", "", "", "", "", "", "", "", "", "" ],
//             [ "WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP" ],
//             [ "WR", "WKn", "WB", "WK", "WQ", "WB", "WKn", "WR" ]
//         ]


let chessBoard = new Board();
chessBoard.handleMove( "W", "B", 2 );