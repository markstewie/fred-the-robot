'use strict';

var _currentX;
var _currentY;
var _currentZ;

const X_LIMITS = [0,4];
const Y_LIMITS = [0,4];
const Z_DIRECTIONS = ['N','E','S','W'];

var _canMove = false;

var _validateInputs = (xyz) => {
    let coords = xyz.split(',');

    if(coords.length !== 3) {
        return false;
    }

    let x = parseInt(coords[0]);
    let y = parseInt(coords[1]);
    let z = coords[2].toUpperCase();

    if(x < X_LIMITS[0] || x > X_LIMITS[1]) {
        return false;
    }
    
    if(y < Y_LIMITS[0] || y > Y_LIMITS[1]) {
        return false;
    }

    if(Z_DIRECTIONS.indexOf(z) === -1) {
        return false;
    }

    return true;
}


module.exports = {

    place: (xyz) => {
        // make sure it's all there
        if(_validateInputs(xyz)) {
            // set current positions
            let coords = xyz.split(',');
            _currentX = parseInt(coords[0]);
            _currentY = parseInt(coords[1]);
            _currentZ = coords[2].toUpperCase();
            _canMove = true;
            return true;
        } else {
            console.log('Error: Could not validate input. Valid e.g. 3,2,N');
            return false;
        }
    },

    move: () => {
        if(_canMove) {
            let error = false;
            let intendedY = -1;
            let intendedX = -1;
            switch(_currentZ) {
                case 'N':
                    intendedY = _currentY+1;
                    if(intendedY > Y_LIMITS[1]) {
                        error = 'I can\'t go any further north!';
                    } else {
                        _currentY = intendedY;
                    }
                    break;
                case 'E':
                    intendedX = _currentX+1;
                    if(intendedX > X_LIMITS[1]) {
                        error = 'I can\'t go any further east!';
                    } else {
                        _currentX = intendedX;
                    }
                    break;
                case 'S':
                    intendedY = _currentY-1;
                    if(intendedY < Y_LIMITS[0]) {
                        error = 'I can\'t go any further south!';
                    } else {
                        _currentY = intendedY;
                    }
                    break;   
                case 'W':
                    intendedX = _currentX-1;
                    if(intendedX < X_LIMITS[0]) {
                        error = 'I can\'t go any further west!';
                    } else {
                        _currentX = intendedX;
                    }
                    break;
            }
            if(error) {
                console.log(error);
                return false;
            } 
            // everything OK!
            return true;
        } else {
            console.log('I must be placed first');
            return false;
        }
    },

    left: () => {
        if(_canMove) {
            let currentIndex = Z_DIRECTIONS.indexOf(_currentZ);
            currentIndex--;
            if(currentIndex < 0) {
                currentIndex = 3;
            } 
            _currentZ = Z_DIRECTIONS[currentIndex];
            return true;
        } else {
            console.log('I must be placed first');
            return false;
        }
    },

    right: () => {
        if(_canMove) {
            let currentIndex = Z_DIRECTIONS.indexOf(_currentZ);
            currentIndex++;
            if(currentIndex > 3) {
                currentIndex = 0;
            } 
            _currentZ = Z_DIRECTIONS[currentIndex];
            return true;
        } else {
            console.log('I must be placed first');
            return false;
        }
    },

    remove: () => {
        // remove from board
        _canMove = false;
        _currentX = _currentY = _currentZ = undefined;
        return true;
    },

    getPosition: () => {
        if(_canMove) {
            return {
                x: _currentX,
                y: _currentY,
                z: _currentZ,
                xLimits: X_LIMITS,
                yLimits: Y_LIMITS
            }
        } else {
            return false;
        }
    }
}