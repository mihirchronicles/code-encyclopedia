# JS Fundamentals

- **I. Understanding the Weird Parts**
    - **Syntax Parsers**: a program that reads your code and determines what it does and if its grammar is valid. Compiler or interpreter needs to transfer the code to the computer.
    - **Lexical** **Environment**: where something sits physically in code you write. For example: a variable sits lexically inside a function.
    - **Execution Context**: a wrapper to help manage the code that is running.There are lots of lexical environments. Which one is currently running? A base execution context is global. It creates two things for you: Global Object and “this.”
    - **Name/Value Pairs**: A name which maps to a unique value. THe may be defined more than once, but only can have one value in any given context. For ex: Address = “100 Main St.”
    - **Object**: is a collection of name value pairs.
    - **The Execution Context**: Creation and Hoisting
    - **Hoisting**: function and variables are hoisted to the top but JS engine is not moving the code physically. It is just run line by line.
    - **CREATION PHASE**: Execution context is created - Global Object, “this”, Outer Env - Setup memory space for variables and Functions “Hoisting” - Hoisting: Variables setup (set equal to undefined) and Functions setup - All variables in JS are set to undefined initially. - not defined != undefined: `undefined` is a special keyword in JS. It takes up memory space. If not declared, you will get `Uncaught Reference error: x is not defined`. - Never set a variable to `undefined`. If you define it then it is hard to debug whether you undefined or the JS engine undefined.
    - **CODE EXECUTION PHASE**: executes line by line

            function b() {
            	console.log('Called b!');
            }
            b();
            
            console.log(a);
            var a = "Hello World";
            console.log(a);
            
            // Called b!
            // undefined
            // Hello World

    - **Single Threaded**: One command at a time. Javascript behaves in a single threaded manner.
    - **Synchronous**: One at a time and in order.
    - JS is a single threaded synchronous language
    - **Invocation:** (section 2 line 14 very important): running a function by using parenthesis(). You tell JS engine to run the function. For ex:

            function b() {
            }
            function a() {
            	b();
            }
            a();

        1. Global Execution Context (create and code is executed): `window` object
        2. A new execution context stack is created for `a()` 
        3. Another execution context is created for `b()`(create and execute). At the top of the stack. Then `a()` gets executed then global.
        4. Runs code line by line and each invocation goes in execution context stack. Once the code is executed, it is popped off from a stack. Everytime a function is called, a new execution context is created and popped off after the code is finished.
    - **Variable Environments**: where the variables live and how they relate to each other in memory.

            function b() {
            	var myVar;
            	console.log(myVar);
            }
            
            function a() {
            	var myVar =2;
            	console.log(myVar);
            	b();
            }
            
            var myVar = 1;
            console.log(myVar);
            a();
            console.log(myVar); //global execution context
            
            // 1
            // 2
            // undefined
            // 1

        1. Global Execution Context (created and code is executed). myVar gets memory allocation for the value of 1.
        2. Execution Context is created for `a()`. myVar gets the value of 2. Note, every execution context has its own variable environment.
        3.  Execution Context is created for `b()`. myVar gets the value of `undefined`. It is not set to a value so the memory will allocate `undefined`.
        4. Even if `myVar` is defined 3 times, they are all unique and have their own values.
    - **The Scope Chain**: Inherits the value from an outer environment. Every execution context has access to its outer environment (global). Lexical Environment: where does the function sit. It does not matter where these functions sit but how it gets executed. If it cannot find reference within its execution context, it will find reference value from its outside environment down the global chain. Finding and accessing outer environment is called a scope chain.

            function a() {
            	function b() {
            	}
            	
            	var myVar = 2;
            	b();
            }
            
            var myVar = 1;
            a(); // 2 
            b(); // Uncaught Reference: b is not defined

        - `function b()` above sits inside `function a()` . Lexical environment of `b()` has now changed. `a()` is lexically visible but not `b()`.
        - `a()` outputs 2. Since b is sitting physically inside `a()`, it went to its environment, otherwise it will go up to its scope chain. The best way to think about it is where is the variable environment sitting lexically.
    - **Scope**: where a variable is available in your code. And it it's truly the same variable, or a new copy.
    - **`let`**: allows for block scoping {}. Variables are only available inside that block. You can use both `var` and `let` in both ES6.
    - **Asynchronous callback:** More than one at a time. Code is executing within the engine at the same time. But JS is synchronous. Keep in mind, browser has more than just JS engine. It has rendering engine, http request or hooks.
        - **Event** **Queue**: An event gets placed on queue. When the execution stack is empty and looks for event queue to see if there are events sitting in the queue. The event gets processed and the next event moves up. Event queue will only get processed once the execution context is empty.
        - Code is running line by line (synchronously), by JS engine. However, the browser is processing other engines and makes asynchronous possible.

                // long running function
                function waitThreeSeconds() {
                    var ms = 3000 + new Date().getTime();
                    while (new Date() < ms){}
                    console.log('finished function');
                }
                
                function clickHandler() {
                    console.log('click event!');   
                }
                
                // listen for the click event
                document.addEventListener('click', clickHandler);
                
                
                waitThreeSeconds();
                console.log('finished execution');

            - if you don't click, you will get 2 finished functions
            - if you click, you will get 2 finished functions then click event! It is because the code gets executed and then event queue gets processed. Event queue won't be processed until execution context is empty. This is how asynchronous is possible (not handled by JS engine but browser).
    - **Dynamic Typing**: you don't tell the engine what type of data a variable holds, it figures it out while your code is running. Variables can hold different types of values because it's all figured out during execution. Javascript is dynamically typed. This can be powerful but also very bad.
    - **Static** **Typing**: Other languages like C# or Java, types need to be explicitly defined.
    - **Primitive Types**: A type of data that represents a single value. That is, not an object. There are 6 types in JS.
        - `undefined`: represents lack of existence (you shouldn't set a variable to this)
        - `null`: represents lack of existence (you can set a variable to this)
        - `boolean`: true or false
        - `number`: floating point number (there's always some decimal). Unlike other programming languages, there's only one `number` type and it can make math weird.
        - `string`: a sequence of characters. Both '' or "" are allowed.
        - `symbol`: used in ES6, the next version of javascript.
    - **Operators**: a special function that is syntactically (written) differently. Generally operators take two parameters and return one result. Operators are functions. For ex: `+` is an addition function.
        - prefix notation: +3 4
        - postfix notation 34+ (old accounting calculators)
        - infix notation 3+4
    - **Operator Precedence**: which operator function gets called first. Functions are called in order of precedence. *Higher* precedence wins.
        - Table Precedence: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
    - **Operator Associativity**: what order operator functions get called in: left to right or right to left. When functions have the *same* precedence.
    - Which one gets called first? JS is synchronous so it will execute one operator function at a time. Bigger the precedence number, higher one gets called first.

            // Operator Precedence
            var a = 3 + 4 * 5; // * has higer precedence acc to the table
            console.log(a);

            // Operator Associativity
            var a = 2, b = 3, c = 4;
            a = b = c;
            
            console.log(a); // 4
            console.log(b); // 4
            console.log(c); // 4
            console.log(b=c); true

        - Since one function execution at a time `a` is set to 4 in the memory, `b` is set to 4 in the memory. Right to left associativity.
    - **Coercion**: converting a value from one type to another. Be careful!

            var a = 1 + 2; // 3
            var b = "hello" + " world!"; // hello world
            var c = 1 + "2"; // 12 coerced

    - **Comparison Operators:** are functions. ****[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
        - Gochyas Examples

                console.log(1 < 2 < 3); // true
                console.log(3 < 2 < 1); // true due to associtivity 
                console.log(false < 1); // true bc false gets converted to 0 (aka coerced) 
                console.log(true < 1); // true bc true gets converted to 1 (aka coerced)
                Number(false) //0
                Number(true) //1
                Number(undefined) //NaN
                Number(null) //0
                Boolean(undefined) // false
                Boolean(null) // false
                Boolean("") // false
                Boolean(0) // false
                false || true // true bc true has higher precedence on the table
                undefined || 'hello' // "hello" bc it will coerce 
                Boolean("hello"); // true
                "hi" || "hello" // "hi" first one
                undefined || "hello" // hello
                null || "hello" // hello
                "" || "hello" // hello

        - So to not make variables coerced for unexpected output, use strict equality (`===`) or (`!==`). Use Associativity precedence table for a reference. Strict equality does not coerce values.

                // Equality (==) leads to coercion, confusion and odd potential errors
                3 == 3 // true
                "3" == 3 // true
                false == 0 // true
                var a = false; // undefined
                a == 0 // true
                null == 0 // false
                null < 1 // true
                "" == 0 // true
                "" == false // also true confusing
                
                //Strict Equality (===)
                3 === 3 // true
                "3" === "3" // true
                "3" === 3 // false
                
                var a = 0;
                var b = false;
                if (a===b) {
                	console.log("They are equal!");
                } else {
                	console.log("Nope, not equal.");
                }
                == // They are equal!
                === // Nope, not equal.
                

    - Coercion and dynamic typing can be useful for frameworks and libraries.

            var a;
            
            // goes to internet and looks for a value.
            a = "";
            if(a) { // coercion bc it is not strictly typed
            	console.log('Something is there.');
            }

    - Default Values

            funciton greet (name) {
            	console.log(name); // undefined
            	name = name || '<Your name here>';
            	console.log('Hello ' + name);
            }
            greet(); 
            
            // undefined
            // hello undefined // coercecd and concatanted
            
            greet('Tony'); // Hello Tony
            greet(); // Hello <Your name here.>

            // Naming library names to stop colliding names
            window.libraryName = window.libraryName || "Lib 2";
            

# ES6

- **I. Introduction**
    - **JS Languages ES6 vs ES5**: Language ECMAScript(ES), Dialect (Javascript). ES5 supported by all browsers. ES6 needs polyfills, transpilers.
    - **Compatibility**: ES6 isn't natively supported by all Browser yet, or at least not all features are. It is important to know which features may or may not be used. This compatibility chart should be helpful to you: [ES6 Comatibility Chart](https://kangax.github.io/compat-table/es6/)
    - You need three things to run transpile ES5 to ES6: compiler, loader and server. Server because modules needs to be served, a light server. Cheat Sheet below:
        - **What’s Required?** To develop ES6 applications locally, you need a transpiler (ES6 -> ES5), a module loader (to load the different modules/ files) and a little server to host your app (and to serve those module files).
        - **Compiler Examples** Babel: https://babeljs.io/. Traceur: https://github.com/google/traceur-compiler
        - **Module Loader / Packaging Examples**  SystemJS: https://github.com/systemjs/systemjs. Webpack: https://github.com/webpack/webpack
        - **Servers** Live-server: https://www.npmjs.com/package/live-server. Lite-server: https://github.com/johnpapa/lite-server. Webpack-dev-server: https://webpack.github.io/docs/webpack-devserver.html
        - **A quick way to get started** You could also use the JavaScript Package Manager (JSPM) to quickly set up your own development environment with Compiler (Babel) and Module Loader (SystemJS). You would need to install an extra server though (google for jspm server for example). Link: http://jspm.io/
        - **Complete Setups / Boilerplates** https://github.com/topheman/vanilla-es6-jspm and https://github.com/thoughtram/es6-babel-browserify-boilerplate. 
    
- **II. Syntax Changes & Additions**
    - **Let & Block Scope**:
    