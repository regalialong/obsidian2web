// @ts-check

class AtDate extends HTMLElement {
  static observedAttributes = ["datetime"];

  /** @type {ShadowRoot} */
  shadow;

  /** @type {HTMLTimeElement} */
  time;

  static formatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
    timeStyle: "long",
  });

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });

    const stylesheet = new CSSStyleSheet();

    stylesheet.replace(`
      :host {
        background: var(--background-primary-alt, #6683);
        border: 1px solid var(--color-ui-1, #6688);
        border-radius: 0.75em;
        display: inline-block;
        padding: 0.1em 0.5em;
        line-height: inherit;
        cursor: text;
        position: relative;
        user-select: all;
      }
      time {
        position: absolute;
        width: calc(100% - 1em);
        height: calc(100% - 0.2em);
        left: 0;
        padding: 0 0.5em;
        color: transparent;
        overflow: hidden;
        z-index: 1;
        user-select: all;
        word-break: break-all;
        text-align: justify;
        text-justify: distribute;
        hyphens: auto;
      }
      span {
        user-select: none;
        width: 100%;
        position: absolute;
      }
      :host:after {
        content: attr(data-formatted-date);
        position: relative;
        z-index: 4;
      }
      :host:where(::selection) {
        background: red;
      }
    `);

    this.shadow.adoptedStyleSheets = [stylesheet];

    this.time = document.createElement("time");
    const slot = document.createElement("slot");
    this.time.appendChild(slot);
    this.shadow.appendChild(this.time);
  }

  attributeChangedCallback(...args) {
    this.render();
    console.log(args);
  }

  render() {
    const dateText = this.getAttribute("datetime") ?? "";
    const date = new Date(dateText);
    this.time.setAttribute("datetime", dateText);

    this.setAttribute("data-formatted-date", AtDate.formatter.format(date));
  }
}

customElements.define("at-date", AtDate);
