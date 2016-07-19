'use strict';

const vorpal = require('vorpal')();
const position = require('./lib/robot-position');
const reporter = require('./lib/robot-reporter');

// PLACE X,Y,F (place at xy coords, facing f)
// MOVE (one step forward in direction facing)
// LEFT (turns 90 to left)
// RIGHT (turns 90 to right)
// REPORT (announce X,Y,F of robot)

vorpal
  .command('place [xyz]', 'Places me at X,Y facing Z (NSEW). e.g. place 0,0,N')
  .action(function(args, callback) {
    if(position.place(args.xyz)) {
      reporter.report(position.getPosition());
    }
    callback();
  });

vorpal
  .command('move', 'Moves me one step forward in facing direction.')
  .action(function(args, callback) {
    if(position.move()) {
      reporter.report(position.getPosition());
    }
    callback();
  });

vorpal
  .command('left', 'Rotates me to the left 90 deg.')
  .action(function(args, callback) {
    if(position.left()) {
      reporter.report(position.getPosition());
    }
    callback();
  });

vorpal
  .command('right', 'Rotates me to the right 90 deg.')
  .action(function(args, callback) {
    if(position.right()) {
      reporter.report(position.getPosition());
    }
    callback();
  });

vorpal
  .command('report', 'Reports on my whereabouts.')
  .action(function(args, callback) {
    reporter.report(position.getPosition());
    callback();
  });

vorpal
  .command('remove', 'Removes me from the board.')
  .action(function(args, callback) {
    position.remove();
  });

vorpal
  .delimiter('fred$')
  .show();

vorpal.log('Hi there, I\'m Fred the movable robot.\nRun "help" for instructions');