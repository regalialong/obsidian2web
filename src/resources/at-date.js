// @ts-check

class AtDate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const innerText = this.innerText || this.textContent;
    const dateText = innerText?.trim().slice(4) ?? "";

    const date = new Date(dateText);

    const formatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "long",
      timeStyle: "long",
    });

    const shadow = this.attachShadow({ mode: "open" });

    const time = document.createElement("time");
    time.setAttribute("datetime", dateText);
    const slot = document.createElement("slot");

    time.appendChild(slot);
    shadow.appendChild(time);

    const stylesheet = new CSSStyleSheet();

    stylesheet.replace(`
      :host {
        background: var(--color-ui-1, #6683);
        border: 1px solid var(--color-tx-2, #6688);
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
        content: "${formatter.format(date)}";
        position: relative;
        z-index: 4;
      }
      :host:where(::selection) {
        background: red;
      }
    `);

    shadow.adoptedStyleSheets = [stylesheet];
  }
}

customElements.define("at-date", AtDate);
