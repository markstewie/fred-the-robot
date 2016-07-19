'use strict';

process.env.NODE_ENV = 'test';

var expect = require('chai').expect;
var describe = require('mocha').describe;
var it = require('mocha').it;
var stdout = require("test-console").stdout;

var position = require('../lib/robot-position');
var reporter = require('../lib/robot-reporter');


describe('||| REPORTER TESTS |||', () => {

    beforeEach(() => {
        return position.place('3,2,n');
    });

    describe('===== Robot should report on position =====', () => {
        it('should report coords equal to placed position', () => {
            var output = stdout.inspectSync(function() {
                reporter.report(position.getPosition());
            });
            expect(output.join(' ')).to.include('x: 3 y: 2 z: N');
        });

        it('should show position in correct place', () => {
            var output = stdout.inspectSync(function() {
                reporter.report(position.getPosition());
            });
            // border = 2 + (3 x 3) + 1 space before
            expect(output[3].charAt(12)).to.equal('↑');
        });
    });

});
