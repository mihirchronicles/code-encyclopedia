# Web Component Notes

## [Web Components]

Web components are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps. Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps. Following are the usecases of web components:

- We could create a component with Angular and use it in an application that is written in Vue.
- Components could have the same look and behavior, no matter what is changed in the global style.
- We could have a style encapsulation and still be able to customize components.

Custom components and widgets build on the Web Component standards, will work across modern browsers, and can be used with any JavaScript library or framework that works with HTML.

Web components are based on existing web standards. Features to support web components are currently being added to the HTML and DOM specs, letting web developers easily extend HTML with new elements with encapsulated styling and custom behavior.

Web Components aims to solve problem of reusability with *Custom elements, Shadow DOM* and *HTML templates.*

## [Shadow DOM]

Shadow DOM gives us a way to encapsulate the styling and markup of our components. It's a sub DOM tree attached to a DOM element, to make sure none of our styling leaks out, or gets overwritten by any external styles. This helps with modularity.

Shadow DOM is a new DOM feature that helps you build components. You can think of shadow DOM as a scoped subtree inside your element. A shadow root is a document fragment that gets attached to a "host" element. The act of attaching a shadow root is how the element gains its shadow DOM. To create shadow DOM for an element, call `element.attachShadow()`.

There are various other types of DOMs.

- **Light DOM**:
The light DOM lives outside the component's shadow DOM, and is basically anything that is not shadow DOM. For example, the `<h1>Hello world</h1>` up there lives in the light DOM. The term light DOM is used to distinguish it from the Shadow DOM. It's perfectly fine to make web components using light DOM, but you miss out on the great features of shadow DOM.
- **Open Shadow DOM**:
Since the latest version (V1) of the shadow DOM specification, we can now use  `open` or `closed` shadow DOM. Open shadow DOM allows us to create a sub DOM tree next to the light DOM to provide encapsulation for our components. Our shadow DOM can still be pierced by javascript like so: `document.querySelector('our-element').shadowRoot`. One of the downsides of shadow DOM is that web components are still relatively young, and many external libraries don't account for it.
- **Closed Shadow DOM**:
Closed shadow roots are not very applicable, as it prevents any external javascript from piercing the shadowroot. Closed shadow DOM makes your component less flexible for yourself and your end users and should generally be avoided. Some examples of elements that do use a closed shadow DOM are the `<video>` element.

## [HTML Template]

The HTML `<template>` tag allows us to write reusable chunks of DOM. Inside a template, scripts don't run, images don't load, and styling/mark up is not rendered. A template tag itself is not even considered to be in the document, until it's activated. HTML templates are great, because for every instance of our element, only one template is used.

## [Custom Elements]

With custom elements, developers gain the ability to create their own DOM elements. In other words, they can define new HTML elements. These elements can either be totally new elements, which means that they extend the HTMLElement interface, or extend one of the existing HTML elements. It’s also possible to inherit from one of the existing elements. But normally that’s not the recommended way to create an element. If you decide to inherit from a native element, you should keep in mind that your element should support all the native APIs of the element you are inheriting from. This can be quite complicated, because just imagine how many types an `<input>` tag can support. For example `<my-cool-element>`.

In order to extend or upgrade a native element, you need to create a class which extends the native HTML element that you need, then define your own custom element. The difference from the previous case is that you need to add a third parameter to customElements.define and specify which native element you are extending. In order to tell the browser that you want to use this new behavior you need to use the ‘is’ attribute in your HTML.

**Custom Element Lifecycle:**
- `connectedCallback()`: This method is automatically called as soon as the component is attached to the DOM. This is the best place to get hold of an element’s input attribute and define the rendering behavior.
- `attributeChangedCallback()`: This method is automatically called as soon as any of the input attributes of your element are changed.
- `disconnectedCallback()`: This method is automatically called when the custom element is disconnected from the document's DOM.
- `adoptedCallback()`: This method is automatically called when the custom element is moved to a new document.

```javascript
class MyElement extends HTMLElement {

    constructor() {
        // always call super() first
        super(); 
        console.log('constructed!');
    }

    connectedCallback() {
        console.log('connected!');
    }

    disconnectedCallback() {
        console.log('disconnected!');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        console.log(`Attribute: ${name} changed!`);
    }

    adoptedCallback() {
        console.log('adopted!');
    }
}

window.customElements.define('my-element', MyElement);
```

**Constructor()**
The `constructor` runs whenever an element is created, but before the element is attached to the document. We'll use the constructor for setting some initial state, event listeners, and creating the shadow DOM.

**connectedCallback()**
The `connectedCallback` is called when the element is inserted to the DOM. It's a good place to run setup code, like fetching data, or setting default attributes.

**disconnectedCallback()**
The `disconnectedCallback` is called whenever the element is removed from the DOM. We can use the `disconnectedCallback` to remove any event listeners, or cancel intervals.

**attributeChangedCallback(name, oldValue, newValue)**
The `attributeChangedCallback` is called any time your element's observed attributes change. We can observe an element's attributes by implementing a static `observedAttributes` getter, like so:

```javascript
static get observedAttributes() {
    return ['my-attr'];
}
```
In this case, any time the `my-attr` attribute is changed, the `attributeChangedCallback` will run. Only attributes listed in the `observedAttributes` getter are affected in the `attributeChangedCallback`.

**adoptedCallback()**
The adoptedCallback is called each time the custom element is moved to a new document. You'll only run into this use case when you have `<iframe>` elements in your page.

**Registering our element**
And finally, though not part of the lifecycle, we register our element to the `CustomElementRegistry` like so:

```javascript
window.customElements.define('my-element', MyElement);
```

The `CustomElementRegistry` is an interface that provides methods for registering custom elements and querying registered elements. The first argument of the registries' define method will be the name of the element, so in this case it'll register `<my-element>`, and the second argument passes the class we made.

**Naming Custom Elements**
Custom element names must always contain a hyphen. For example: `<my-element>`. Custom elements also cannot be self-closing because HTML only allows a few elements to be self-closing. These are called void elements, like `<br/>` or `<img/>`, or elements that don't allow children nodes. Allowing self-closing elements would require a change in the HTML parser, which is a problem since HTML parsing is security sensitive. HTML producers need to be able to rely on how a given piece of HTML parses in order to be able to implement XSS-safe HTML generation.

###### Sources:
- https://www.webcomponents.org/introduction
- https://developer.mozilla.org/en-US/docs/Web/Web_Components
- https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m
- https://www.telerik.com/blogs/web-components-101-an-introduction-to-web-components
- https://dev.to/thepassle/web-components-from-zero-to-hero-4n4m
- https://w3ctag.github.io/webcomponents-design-guidelines/
- https://github.com/webcomponents/gold-standard/wiki
- https://developers.google.com/web/fundamentals/web-components/best-practices
- https://developer.mozilla.org/en-US/docs/Web/Web_Components