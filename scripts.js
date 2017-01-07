
// ===============================================
// === MAIN LOOP =================================
var gameTable = [];
var gameTableSize = 24;
var numberOfIterations = 10;


function initSystem(){

    console.log( "[ game of life ] initSystem()" );
    initGameTable();
    establishInitialColony();
    displayGameTable();

}; // end mainLoop



// ===============================================
function iterateGameTable(){
    console.log( "[ game of life ] interateGameTable()" );

    if ( numberOfIterations === 0 ){ numberOfIterations = 1 };

    for (var i = 1; i < numberOfIterations; i++ ){ 
        console.log ("iteration: " + i );
        updateGameTable();
        displayGameTable();
    }; // end for

}; // end iterateGameTable()



// ===============================================
function establishInitialColony(){
    console.log( "[ game of life ] establishInitColony()" );

    gameTable[ 1 ][ 3 ] = 1;
    gameTable[ 2 ][ 4 ] = 1;
    gameTable[ 3 ][ 2 ] = 1;
    gameTable[ 3 ][ 3 ] = 1;
    gameTable[ 3 ][ 4 ] = 1;

}// end establishInitColony


// ===============================================
function updateGameTable(){

console.log( "[ game of life ] updateGameTable()" );

var tempResult = copyArray( gameTable ) // make a copy of the gameTable 

    for ( var row = 0; row < gameTableSize; row++ ){
        for ( var col = 0; col < gameTableSize; col++ ){

            neighborCount = testCell( row, col );
            cellValue = tempResult[ row ][ col ];

            if ( neighborCount < 2 ){ tempResult[ row ][ col ] = 0 } // cell is dead or dies
            if ( neighborCount === 2 && cellValue === 0 ){ tempResult[ row ][ col ] = 0 } // cell stays dead
            if ( neighborCount === 2 && cellValue === 1 ){ tempResult[ row ][ col ] = 1 } // cell stays alive
            if ( neighborCount === 3 ){ tempResult[ row ][ col ] = 1 } // cell lives or is born
            if ( neighborCount > 3 ){ tempResult[ row ][ col ] = 0 } // cell dies, over crowded

        } // end col
    } // end row

    gameTable = copyArray( tempResult );    // Place the next generation back into the gameTable.
                                            // This is so all cells iterate at the same time (in the same "tick").
} // end updateGameTable



// ===============================================
function copyArray( originalArray ){

    var len = originalArray.length,

    copy = new Array(len);

    for (var i=0; i<len; ++i){
        copy[i] = originalArray[i].slice(0);
    }

    return copy;
} // end copyArray()

// ===============================================
function initGameTable(){
    console.log( "[ game of life ] initGameTable()" );

    // init the cell array
    
    for ( var i = 0; i < gameTableSize; i++ ) {
        gameTable[ i ] = [];
        for ( var j = 0; j < gameTableSize; j++ ) {
             gameTable[ i ][ j ] = 0;
        };
    };
} // end initGameTable()



// ===============================================
function testCell( row, col ){
    console.log( "[ game of life ] testCell()" );

    var neighborCount = 0;

    // top left
    if ( row > 0 && col > 0 ) { 
        if ( gameTable[ row-1 ][ col-1 ] === 1 ) { neighborCount++ };
    }

    // top center
      if ( row > 0 ) { 
        if ( gameTable[ row-1 ][ col ] === 1 ) { neighborCount++ };
    }  

    // top right
    if ( row > 0 && col < (gameTableSize - 1) ) { 
        if ( gameTable[ row-1 ][ col+1 ] === 1 ) { neighborCount++ };
    }

    // left
    if ( col > 0 ) { 
        if ( gameTable[ row ][ col-1 ] === 1 ) { neighborCount++ };
    }

    // right
    if ( col < (gameTableSize - 1) ) { 
        if ( gameTable[ row ][ col+1 ] === 1 ) { neighborCount++ };
    }

    // bottom left
    if ( row < (gameTableSize - 1 ) && col > 0 ) { 
        if ( gameTable[ row+1 ][ col-1 ] === 1 ) { neighborCount++ };
    }

    // bottom center
    if ( row < (gameTableSize - 1 ) ) { 
        if ( gameTable[ row+1 ][ col ] === 1 ) { neighborCount++ };
    }

    // bottom right
    if ( row < (gameTableSize - 1 ) &&  col < ( gameTableSize - 1 ) ) { 
        if ( gameTable[ row+1 ][ col+1 ] === 1 ) { neighborCount++ };
    }

    return neighborCount;

} // end testCell

// ===============================================
function displayGameTable(){
    console.log( "[ game of life ] displayGameTable()" );

    var tableHtml = "<table>";  // start the table

    var i;
    var j;
    var displayToken;

    for ( i = 0; i < gameTableSize; i++ ){

        var rowHtml = "<tr>"; // start the row
        for ( j = 0; j < gameTableSize; j++ ){
            
            if ( gameTable[ i ][ j ] === 0 ) { displayToken = " " } else { displayToken = "X" };

            rowHtml = rowHtml + "<td>" + displayToken + "</td>";
        };
        rowHtml = rowHtml + "</tr>"; // end the row
        tableHtml = tableHtml + rowHtml;
    }

    tableHtml = tableHtml + "</table>" // end the table
    document.getElementById( "gameTable" ).innerHTML = tableHtml;

} // end displayGameTable

