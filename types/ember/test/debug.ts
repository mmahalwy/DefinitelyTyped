import Ember from 'ember';

const {
    runInDebug,
    warn,
    debug,
    assert,
    Debug: { registerDeprecationHandler, registerWarnHandler }
} = Ember;

/**
 * @ember/debug tests
 */
runInDebug(); // $ExpectError
let x = runInDebug(() => console.log('Should not show up in prod')); // $ExpectType void

// Log a warning if we have more than 3 tomsters
const tomsterCount = 2;
warn('Too many tomsters!'); // $ExpectType void
warn('Too many tomsters!', tomsterCount <= 3); // $ExpectType void
warn('Too many tomsters!', tomsterCount <= 3, { // $ExpectType void
    id: 'ember-debug.too-many-tomsters'
});

debug(); // $ExpectError
debug('Too many tomsters!'); // $ExpectType void
debug('Too many tomsters!', 'foo'); // $ExpectError

// Test for truthiness
const str = 'hello';
assert('Must pass a string', typeof str === 'string'); // $ExpectType void

// Fail unconditionally
assert('This code path should never be run'); // $ExpectType void

// next is not called, so no warnings get the default behavior
registerWarnHandler(); // $ExpectError
registerWarnHandler(() => {}); // $ExpectType void
registerWarnHandler((message, { id }, next) => { // $ExpectType void
    message; // $ExpectType string
    id; // $ExpectType string
    next; // $ExpectType () => void
});

// next is not called, so no warnings get the default behavior
registerDeprecationHandler(); // $ExpectError
registerDeprecationHandler(() => {}); // $ExpectType void
registerDeprecationHandler((message, { id, until }, next) => { // $ExpectType void
    message; // $ExpectType string
    id; // $ExpectType string
    until; // $ExpectType string
    next; // $ExpectType () => void
});
