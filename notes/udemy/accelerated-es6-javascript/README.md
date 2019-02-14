# Accelerated ES6 JavaScript Training

---

## ES6

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