'use strict';

var _xStart;
var _xEnd;
var _yStart;
var _yEnd;

var _drawBorder = () => {
   
    let x = _xStart;
    let row = '— ';
    while(x <= _xEnd) {
        row += ' — ';
        x++;
    }
    row += ' —';
   
    console.log(row);
}

var _drawEmptyRow = () => {
    let row = '| ';  
    let x = _xStart;
    while(x <= _xEnd) {
        row += ' · ';
        x++;
    }
    row += ' |';
    console.log(row);
}

var _getDirection = (z) => {
    let char = '';
    switch(z) {
        case 'N':
            char = ' ↑ ';
            break;
        case 'E':
            char = ' → ';
            break;
        case 'S':
            char = ' ↓ ';
            break;
        case 'W':
            char = ' ← ';
            break;
    }
    return char;
}

var _drawOnRow = (xPos, zPos) => {
    let row = '| ';
    let x = _xStart;
    while(x <= _xEnd) {
        if(xPos === x) {
            row += _getDirection(zPos);
        } else {
            row += ' · ';
        }
        x++;
    }
    row += ' |';
    console.log(row);
}


module.exports = {

    report: (coords) => {

        _xStart = coords.xLimits[0];
        _xEnd = coords.xLimits[1];

        _yStart = coords.yLimits[0];
        _yEnd = coords.yLimits[1];
        
       // top border
        _drawBorder();

        // rows
        let y = _yEnd;

        // y coords are backwards!!
        while(y >= _yStart) {
           // drawing rows
            if(coords.y === y) {
                // on this row
                _drawOnRow(coords.x, coords.z);
            } else {
                // blank row
                _drawEmptyRow();
            }
            y--;
        }

        // bottom border
        _drawBorder();
        console.log('x:',coords.x, 'y:', coords.y, 'z:', coords.z);
        console.log('___');

    }

}