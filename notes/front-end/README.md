# JS Notes

- **Event Loop**: (https://www.youtube.com/watch?v=8aGhZQkoFbQ)
    - http://latentflip.com/loupe/
    - Transcript: https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html
    - JS is a single threaded programing language runtime. One code piece at a time. It has a single call stack.
    - I'm a single threaded on blocking asynchronous concurrently glitch
    - V8 is a heap and stack
    - JavaScript programmers like to use words like, “event-loop”, “non-blocking”, “callback”, “asynchronous”, “single-threaded” and “concurrency”.
    - We can do things concurrently in browser because a browser is more than a run-time. It has APIs. You call Web APIs. In node, you have C++ multi-thread.
    - API does not live in V8 engine. It is part of XHR().
    - [https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
    - The Engine consists of two main components:* Memory Heap — this is where the memory allocation happens* Call Stack — this is where your stack frames are as your code executes
    - JavaScript is a single-threaded programming language, which means it has a single Call Stack. Therefore it can do one thing at a time.
    - The Call Stack is a data structure which records basically where in the program we are. If we step into a function, we put it on the top of the stack. If we return from a function, we pop off the top of the stack. That’s all the stack can do.

- **JS Optimization & Performance**: (why a little discipline can help if you’d like your site to load & be interactive quickly on mobile devices? tl;dr: less code = less parse/compile + less transfer + less to decompress)
    - [The Cost Of JavaScript - Dev Channel - Medium](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)
    - why a little discipline can help if you’d like your site to load & be interactive quickly on mobile devices? tl;dr: less code = less parse/compile + less transfer + less to decompress

- **Syntax Parsers**: a program that reads your code and determines what it does and if its grammar is valid. Compiler or interpreter needs to transfer the code to the computer.
- **Lexical Environment**: where something sits physically in code you write. For example: a variable sits lexically inside a function.
- **Execution Context**: a wrapper to help manage the code that is running.There are lots of lexical environments. Which one is currently running? A base execution context is global. It creates two things for you: Global Object and “this.”
- **Name/Value Pairs**: A name which maps to a unique value. For ex: Address = “100 Main St.”
- **Object**: is a collection of name value pairs.
- **The Execution Context**: Creation and Hoisting
- **Hoisting**: function and variables are hoisted to the top but JS engine is not moving the code physically. It is just run line by line.
- **Creation Phase**: 
    - Execution context is created - Global Object, “this”
    - Outer Env - Setup memory space for variables and Functions 
    - “Hoisting” - Hoisting: Variables setup (set equal to undefined)
    - Functions setup - All variables in JS are set to undefined initially. 
    - not defined != undefined: `undefined` is a special keyword in JS. It takes up memory space. If not declared, you will get `Uncaught Reference error: x is not defined`.
    - Never set a variable to `undefined`. If you define it then it is hard to debug whether you undefined or the JS engine undefined.
- **Code Execution Phase**: executes line by line

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
- **Invocation**: running a function by using parenthesis(). You tell JS engine to run the function. For ex:

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

- **Comparison Operators:** are functions. [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
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

# ES6 Notes

- **JS Languages ES6 vs ES5**: Language ECMAScript(ES), Dialect (Javascript). ES5 supported by all browsers. ES6 needs polyfills, transpilers.
- **Compatibility**: ES6 isn't natively supported by all Browser yet, or at least not all features are. It is important to know which features may or may not be used. This compatibility chart should be helpful to you: [ES6 Comatibility Chart](https://kangax.github.io/compat-table/es6/)
- You need three things to run transpile ES5 to ES6: compiler, loader and server. Server because modules needs to be served, a light server. Cheat Sheet below:
    - **What’s Required?** To develop ES6 applications locally, you need a transpiler (ES6 -> ES5), a module loader (to load the different modules/ files) and a little server to host your app (and to serve those module files).
    - **Compiler Examples** Babel: https://babeljs.io/. Traceur: https://github.com/google/traceur-compiler
    - **Module Loader / Packaging Examples**  SystemJS: https://github.com/systemjs/systemjs. Webpack: https://github.com/webpack/webpack
    - **Servers** Live-server: https://www.npmjs.com/package/live-server. Lite-server: https://github.com/johnpapa/lite-server. Webpack-dev-server: https://webpack.github.io/docs/webpack-devserver.html
    - **A quick way to get started** You could also use the JavaScript Package Manager (JSPM) to quickly set up your own development environment with Compiler (Babel) and Module Loader (SystemJS). You would need to install an extra server though (google for jspm server for example). Link: http://jspm.io/
    - **Complete Setups / Boilerplates** https://github.com/topheman/vanilla-es6-jspm and https://github.com/thoughtram/es6-babel-browserify-boilerplate. 
    - ES6 features: http://help.wtf/es6
    - Super and Extend in ES6: https://medium.com/beginners-guide-to-mobile-web-development/super-and-extends-in-javascript-es6-understanding-the-tough-parts-6120372d3420


# Tooling

- **Package manager**:
    [https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70](https://medium.com/the-node-js-collection/modern-javascript-explained-for-dinosaurs-f695e9747b70)

    This is useful later when sharing a project with others — instead of sharing the node_modules folder (which can get very large), you only need to share the package.json file and other developers can install the required packages automatically with the command npm install. So now we no longer have to manually download moment.js from the website, we can automatically download and update it using npm.

- **Module** **Bundling**:
    Most programming languages provide a way to import code from one file into another. JavaScript wasn’t originally designed with this feature, because JavaScript was designed to only run in the browser, with no access to the file system of the client’s computer (for security reasons). So for the longest time, organizing JavaScript code in multiple files required you to load each file with variables shared globally. This is actually what we’re doing with the above moment.js example — the entire **`moment.min.js`** file is loaded in the HTML, which defines a global variable `moment`, which is then available to any file loaded after **`moment.min.js`** (regardless of whether or not it needs access to it). node.js solved this problem. It is a JavaScript runtime designed to run on the server. Here’s what the earlier example would look like using node.js modules. Instead of loading all of moment.min.js with an HTML script tag, you can load it directly in the JavaScript file as follows:

        // index.jsvar moment = require('moment');
        console.log("Hello from JavaScript!");
        console.log(moment().startOf('day').fromNow());

    Again, this is how module loading works in node.js, which works great since node.js is a server side language with access to the computer’s file system. Node.js also knows the location of each npm module path, so instead of having to write require('./node_modules/moment/min/moment.min.js), you can simply write require('moment') — pretty sweet. This is all great for node.js, but if you tried to use the above code in the browser, you’d get an error saying require is not defined. The browser doesn’t have access to the file system, which means loading modules in this way is very tricky — loading files has to be done dynamically, either synchronously (which slows down execution) or asynchronously (which can have timing issues). 

    This is where a module bundler comes in. A JavaScript module bundler is a tool that gets around the problem with a build step (which has access to the file system) to create a final output that is browser compatible (which doesn’t need access to the file system). In this case, we need a module bundler to find all require statements (which is invalid browser JavaScript syntax) and replace them with the actual contents of each required file. The final result is a single bundled JavaScript file (with no require statements)! The most popular module bundler was Browserify, which was released in 2011 and pioneered the usage of node.js style require statements on the frontend (which is essentially what enabled npm to become the frontend package manager of choice). Around 2015, webpack eventually became the more widely used module bundler (fueled by the popularity of the React frontend framework, which took full advantage of webpack’s various features).

- **Transpiling**
    Transpiling code means converting the code in one language to code in another similar language. This is an important part of frontend development — since browsers are slow to add new features, new languages were created with experimental features that transpile to browser compatible languages. For CSS, there’s Sass, Less, and Stylus, to name a few. For JavaScript, the most popular transpiler for a while was CoffeeScript (released around 2010), whereas nowadays most people use babel or TypeScript. 

    Babel is not a new language but a transpiler that transpiles next generation JavaScript with features not yet available to all browsers (ES2015 and beyond) to older more compatible JavaScript (ES5). Note that we’re installing 3 separate packages as dev dependencies — @babel/core is the main part of babel, @babel/preset-env is a preset defining which new JavaScript features to transpile, and babel-loader is a package to enable babel to work with webpack. We can configure webpack to use babel-loader.

    But there’s still some unpolished edges in our workflow. If we’re concerned about performance, we should be minifying the bundle file, which should be easy enough since we’re already incorporating a build step. We also need to re-run the webpack command each time we change the JavaScript, which gets old real fast. So the next thing we’ll look at are some convenience tools to solve these issues.

- **Tooling Automation Build**
    Now that we’re invested in using a build step to work with JavaScript modules, it makes sense to use a task runner, which is a tool that automates different parts of the build process. For frontend development, tasks include minifying code, optimizing images, running tests, etc.

    In 2013, Grunt was the most popular frontend task runner, with Gulp following shortly after. Both rely on plugins that wrap other command line tools. Nowadays the most popular choice seems to be using the scripting capabilities built into the npm package manager itself, which doesn’t use plugins but instead works with other command line tools directly.

    Any time you change your JavaScript in index.js, webpack-dev-server will rebuild its own bundled JavaScript and refresh the browser automatically. This is a surprisingly useful time saver, as it allows you to keep your focus on the code instead of having to continually switch contexts between the code and the browser to see new changes.

    This is only scratching the surface, there are plenty more options with both webpack and webpack-dev-server (which you can read about here). You can of course make npm scripts for running other tasks as well, such as converting Sass to CSS, compressing images, running tests — anything that has a command line tool is fair game. There are also some great advanced options and tricks with npm scripts themselves — this talk by Kate Hudson is a great place to start: 

    - [Kate Hudson talk on Webpack](https://www.youtube.com/watch?v=0RYETb9YVrk)
    - [Webpack](https://webpack.js.org/guides/development/)

- **Other**
    - [Traceur Compiler](https://github.com/google/traceur-compiler)
    - [Systemjs](https://github.com/systemjs/systemjs)
    - [Webpack and Progressive Apps](https://medium.freecodecamp.org/how-to-write-simple-modern-javascript-apps-with-webpack-and-progressive-web-techniques-a30354eab214)

# Pollyfills
- https://medium.com/beginners-guide-to-mobile-web-development/introduction-to-polyfills-their-usage-9cd6db4b1923
- https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills

# CSS
- https://medium.com/actualize-network/modern-css-explained-for-dinosaurs-5226febe3525
- **Float**: the three columns are not equal in height, and the page doesn’t fill the height of the screen. These issues are inherent with a float-based approach. All a float can do is place content to the left or right of a section — the CSS has no way to infer the heights of the content in the other sections. This problem had no straightforward solution until many years later, with a flexbox-based layout.
- **Flex**: 
[Solved By Flexbox](https://github.com/philipwalton/solved-by-flexbox) 

Flexbox eliminates a lot of the float hacks, but the code isn’t as expressive as it could be for defining layout. It’s hard to read the flexbox CSS and get a visual understanding how all of the elements will be laid out on the page. This leads to a lot of guessing and checking when writing flexbox-based layouts.
- **Css Grid**: 
[Complete-Guide Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

- **Pseudoelements**:
https://www.smashingmagazine.com/2011/07/learning-to-use-the-before-and-after-pseudo-elements-in-css/

`::before` and `::after`, many of the uses involve graphics but no actual word content. You must set both the `content:"";` property and if your content is empty the `display:inline-block` property or the psuedoelement will not show up. 

- **CSS Selectors**:
https://codepen.io/pehaa/pen/ROapJZ

- **CSS preprocessors**: tooling that was created to help improve the experience of working with CSS as a language itself, starting with CSS preprocessors. A CSS preprocessor allows you to write styles using a different language which gets converted into CSS that the browser can understand. For ex: SASS helps with variables, helper functions, and calculations. Another one is LESS, the key difference from SASS is the syntax, which was designed to be as close to CSS as possible. Less is also written in JS using Node.js. Another alternative CSS preprocessor is Stylus. To use Sass, you need to install Ruby, the programming language used to compile Sass code to regular CSS. Then you would need to install the Sass gem, then run a command in the command line to convert your .sass files into .css files. `sass --watch index.sass index.css`  or `lessc index.less index.css`

- **CSS postprocessors**: A CSS postprocessor uses JavaScript to analyze and transform your CSS into valid CSS. In this sense it’s pretty similar to a CSS preprocessor — you can think of it as a different approach to solving the same problem. The key difference is that while a CSS preprocessor uses special syntax to identify what needs to be transformed, a CSS postprocessor can parse regular CSS and transform it without any special syntax required.

- **Using CSS methodologies for maintainability**:
    - **OOCSS**: a methodology organized around two main principles. The first principle is separate structure and skin. This means the CSS to define the structure (like layout) shouldn’t be mixed together with the CSS to define the skin (like colors, fonts, etc.). This makes it easier to “re-skin” an application. The second principle is separate container and content. This means think of elements as re-usable objects, with the key idea being that an object should look the same regardless of where it is on the page. [https://github.com/stubbornella/oocss/wiki](https://github.com/stubbornella/oocss/wiki)
    - **SMACSS**: base rules, layout rules, modules, state rules, and theme rules. The SMACSS methodology also recommends some naming conventions.
    - **BEM**: a methodology organized around the idea of dividing the user interface into independent blocks. A block is a re-usable component (an example would be a search form, defined as `<form class="search-form"></form>`). An element is a smaller part of a block that can’t be re-used on its own (an example would be a button within the search form, defined as `<button class="search-form__button">Search</button>`). A modifier is an entity that defines the appearance, state, or behavior of a block or element (an example would be a disabled search form button, defined as `<button class="search-form__button search-form__button--disabled">Search</button>`). The BEM methodology is simple to understand, with a specific naming convention that allows newcomers to apply it without having to make complex decisions. The downside for some is that the class names can be quite verbose, and don’t follow traditional rules for writing semantic class names. Later approaches like Atomic CSS would take this untraditional approach to a whole other level!
    - **Atomic CSS (aka Functional CSS)**: a methodology organized around the idea of creating small, single-purpose classes with names based on visual function. This approach is in complete opposition with OOCSS, SMACSS, and BEM — instead of treating elements on the page as re-usable objects, Atomic CSS ignores these objects altogether and uses re-usable single purpose utility classes to style each element. So instead of something like `<button class="search-form__button">Search</button>`, you would have something like `<button class="f6 br3 ph3 pv2 white bg-purple hover-bg-light-purple">Search</button>`. Many people saw this methodology as a complete violation of established CSS best practices. Further read: [https://adamwathan.me/css-utility-classes-and-separation-of-concerns/](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/).
    - **CSS in JS**: a methodology organized around defining CSS styles not in a separate style sheet, but directly in each component itself. It was introduced as an approach for the React JavaScript framework (which already took the controversial approach of defining the HTML for a component directly in JavaScript instead of a separate HTML file). Originally the methodology used inline styles, but later implementations used JavaScript to generate CSS (with unique class names based on the component) and insert it into the document with a style tag. The CSS in JS methodology once again goes completely against established CSS best practices of separation of concerns.

# Console
[Chrome-devtools](https://developers.google.com/web/tools/chrome-devtools/)

    // Formatted Strings
    console.log(
        "%c The quick %c brown %c fox jumps over the %c lazy dog",
        "font-size: 34px;",
        "font-size: 24px; color: brown;",
        "color: orange;",
        "color: black; font-weight: bold;"
    )

    // Formatted Strings with Css styling
    for (let i = 0; i < 10; i++) {
        console.log(
        "%s I've been called %d times, this is the document body %o",
        "Hello", i, document.body
        );
    }

    // Object Tables
    var animals = [
        { kind: 'Horse', name: 'Henry', age: 43 },
        { kind: 'Dog', name: 'Spot', age: 13 },
        { kind: 'Cat', name: ' Mittens', age: 18 },
    ];
    console.table(animals);

    // Tracing function calls
    // The console.trace method lets you dump a stack trace in the console — 
    // in other words, the path the runtime took to call that function — 
    // which is useful in tracking down the function responsible for passing bad data.
    function foo() {
        bar();
        function bar() {
        console.trace();
        }
    }
    foo();

    // Counting function calls
    window.addEventListener('click', function(event) {
        console.count(event.type);
        console.log(event);
    });

    // To reset a counter, you just need to call below with the label, and it will reset back to zero.
    console.countReset();

    // Grouping Information in collapsible list
    console.group('First group');
    console.log('First message');
    console.group('A group inside the first group');
    console.log('A message inside the group inside the first group'); console.log('Another message inside the group inside the first group');
    console.groupEnd();
    console.log('Second message'); console.groupEnd();

    // Inspecting State
    $_ variable holds the most recent expression that was evaluated in the console context.
    And $0 through $4 holds the most recent element that was inspected with inspect element

# Other
- [Glossary of Modern JS Concepts](https://auth0.com/blog/glossary-of-modern-javascript-concepts/)
- [A better way to code](https://medium.com/@mbostock/a-better-way-to-code-2b1d2876a3a0) by Mike Bostock:
    - A danger of spending so long designing a tool is that you may forget what the tool is for: the tool itself becomes the goal, rather than the value derived from its application.
    - The purpose of a visualization tool is to construct visualizations. But what is the purpose of visualization? Per Ben Shneiderman: The purpose of visualization is insight, not pictures.
    - Visualization is a means to an end. A means to insight. A way to think, to understand, to discover, and to communicate something about the world. If we consider only the task of assigning visual encodings, of constructing visualizations, we ignore myriad other challenges: finding relevant data, cleaning it, transforming it into efficient structures, analyzing it with statistics, modeling, explaining our discoveries.
    - Programming is blindly manipulating symbols. By “blindly”, it means we can’t see the results of our manipulation.
- Why do people decide to use frameworks? I use them for the same reason that I buy ingredients rather than growing/raising all of my own food. Smarter people than me have solved many of the problems already.
I don't want to grow wheat, bake bread, milk cows, and churn butter. I just want to make toast.
- JavaScript lacks the strict type checking of Java, which is a blessing and a curse. Code is easier to write but requires more testing to ensure correctness.
- The core idea of functional programming in JS - that we can plug our pure functions into higher order abstractions - is at the very heart of functional programming. A higher order function is a function that takes another function as a parameter. In JavaScript, functions are "first-class citizens." That means we can assign them to variables, create them inside of other functions, and pass them as arguments like any other object. Iteration in functional programming relies on a holy trinity of functions: map, filter, and reduce. We can use functional programming to reduce boilerplate in everyday code, keeping it DRY
- JavaScript is single-threaded or that it is using a callback queue, which means it has a single Call Stack. Therefore it can do one thing at a time.
- Internationalization (i18n) is the process of developing products in such a way that they can be localized for languages and cultures easily. Localization (l10n), is the process of adapting applications and text to enable their usability in a particular cultural or linguistic market. For application developers, internationalizing an application means abstracting all of the strings and other locale-specific bits (such as date or currency formats) out of the application. Localizing an application means providing translations and localized formats for the abstracted bits.
