# Tooling

- **Workflow, Bundling, Transpiling, Tooling**
    - **Package manager**

        This is useful later when sharing a project with others — instead of sharing the node_modules folder (which can get very large), you only need to share the package.json file and other developers can install the required packages automatically with the command npm install. So now we no longer have to manually download moment.js from the website, we can automatically download and update it using npm.

    - **Module** **Bundling**

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

        [https://www.youtube.com/watch?v=0RYETb9YVrk](https://www.youtube.com/watch?v=0RYETb9YVrk)

        [Development](https://webpack.js.org/guides/development/)
