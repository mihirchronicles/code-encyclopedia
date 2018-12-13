# Javascript Basics 

## Adapters

- `ary`: creates a function that accepts up to n arguments, ignoring any additional arguments.

        ``` javascript
        const ary = (fn, n) => (...args) => fn(...args.slice(0,n));
        // Example
        const firstTwoMax = ary(Math.max, 2);
        const testArr = [[2, 6, 'a'], [8, 4, 6], [10]];
        const res = testArr.map(x => firstTwoMax(...x));
        console.log(res); // [ 6, 8, 10 ]
        ``` 

- `call`: given a key and set of arguments, call them when given a context. Primarily useful in composition.

        ``` javascript
        const call = (key, ...args) => context => context[key](...args);
        // Example
        Promise.resolve([1, 2, 3])
        	.then(call('map', x => 2 * x))
        	.then(console.log()); // [2,4,6]
        const map = call.bind(null,'map');
        Promise.resolve([1, 2, 3])
        	.then(map(x => 2 * x))
        	.then(console.log); // [2,4,6]
        ```

- collectInto
- flip
- over
- overArgs
- pipeAsyncFunctions
- pipeFunctions
- promisify
- rearg
- spreadOver

## Array

## Browser

## Date

## Function

## Math

## Node

## Object

## String

## Type

## Utility