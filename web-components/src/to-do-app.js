// A <to-do-app> element:

// Contains an array of to-do's as property
// Adds a to-do
// Removes a to-do
// Toggles a to-do

// A :host pseudo class
// this is how we can add styling to the component from the inside. 
// An important thing to note is that the display is always set to display: inline;, 
// which means you can't set a width or height on your element. 
// So make sure to set a :host display style (e.g. block, inline-block, flex) unless you prefer the default of inline.

const template = document.createElement(`template`);


template.innerHTML = `
<style>
    :host {
        display: block;
        font-family: sans-serif;
        text-align: center;
    }
    button {
        border: none;
        cursor: pointer;
    }
    ul {
        list-style: none;
        padding: 0;
    }
</style>

<input type="text" placeholder="Add a new to do"></input>
<button>✅</button>
<ul is="todos"></ul>
`;

class TodoApp extends HTMLElement {
    constructor() {
        super(); 
        this._shadowRoot = this.attachShadow({'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$todoList = this._shadowRoot.querySelector('ul');
    }

    _renderTodoList() {
        this.$todoList.innerHTML = '';
        
        this.todos.forEach((todo, index) => {
            let $todoItem = document.createElement('div');
            $todoItem.innerHTML = todo.text;
            this.$todoList.appendChild($todoItem);
        });
    }

    set todos(value) {
        this._todos = value;
        this._renderTodoList();
    }

    get todos() {
        return this._todos;
    }
}

window.customElements.define('to-do-app', TodoApp);