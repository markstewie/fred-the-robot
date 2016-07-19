'use strict';

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;

var position = require('../lib/robot-position');



describe('||| POSITION TESTS |||', () => {

    beforeEach(() => {
        return position.remove();
    });

    describe('===== Robot should ignore all commands until placed =====', () => {
        it('Should ignore move command', () => {
            console.log(' ---- ', position.getPosition());
            position.move();
            console.log(position.getPosition());
            expect(position.getPosition()).to.be.false;
        });
        
        it('Should ignore left command', () => {
            position.left();
            expect(position.getPosition()).to.be.false;
        });

        it('Should not ignore right command after being placed', () => {
            position.place('3,3,N');
            position.right();
            expect(position.getPosition().z).to.equal('E');
        });
    });

    describe('===== Robot should not go out of bounds =====', () => {
        it('Does not change x position when at left edge and facing West', () => {
            position.place('0,0,W');
            position.move();
            expect(position.getPosition().x).to.equal(0);
        });
        it('Does not change x position when at right edge and facing East', () => {
            position.place('4,0,E');
            position.move();
            expect(position.getPosition().x).to.equal(4);
        });
        it('Does not change y position when at bottom edge and facing South', () => {
            position.place('0,0,S');
            position.move();
            expect(position.getPosition().x).to.equal(0);
        });
        it('Does not change y position when at top edge and facing North', () => {
            position.place('4,4,N');
            position.move();
            expect(position.getPosition().y).to.equal(4);
        });
    });

    describe('===== Robot should change position when not at bounds =====', () => {
        it('Does change x position by 1 when not at right edge and facing East', () => {
            position.place('3,3,E');
            position.move();
            expect(position.getPosition().x).to.equal(4);
        });
        it('Does change y position by 1 when not at top edge and facing North', () => {
            position.place('3,3,N');
            position.move();
            expect(position.getPosition().y).to.equal(4);
        });
    });

    describe('===== Robot should rotate correctly =====', () => {
        it('Turns right correctly', () => {
            position.place('3,3,n');
            position.right();
            expect(position.getPosition().z).to.equal('E');
        });
        it('Turns left correctly', () => {
            position.place('3,3,n');
            position.left();
            expect(position.getPosition().z).to.equal('W');
        });
    });

    describe('===== Robot should be placed correctly =====', () => {
        it('should be placed correctly when data is valid', () => {
            position.place('0,0,n');
            expect(position.getPosition().y).to.equal(0);
            expect(position.getPosition().x).to.equal(0);
            expect(position.getPosition().z).to.equal('N');
        });

        it('Should not be placed when position data is not valid', () => {
            position.place('4,5,N'); // not valid
            expect(position.getPosition()).to.be.false;
        });
    });
});
