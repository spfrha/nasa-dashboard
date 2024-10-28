/**
 * Copyright 2024 spfrha
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./nasa-image.js";

export class nasaDashboard extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "nasa-dashboard";
  }

  constructor() {
    super();
    this.value = null;
    this.loading = false;
    this.items = [];
  };

  static get properties() {
    return {
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`

      :host {
        display: block;
        font-family: var(--ddd-font-primary)
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }

      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
      }

      details {
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-beaverBlue);
      }

      summary {
        font-size: 24px;
        padding: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-white);
        font-size: 42px;
      }

      input {
        font-size: 20px;
        line-height: var(--ddd-spacing-10);
        width: 100%;
      }

      a {
        text-decoration: none;
        color: var(--ddd-theme-default-link);
      }
      a:visited {
        text-decoration: none;
        color: var(--ddd-theme-default-link);
      }

    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }
    });
  }

  // Lit render the HTML
  render() {
    return html`
      <details open>
        <summary>Search inputs</summary>
        <div>
          <input id="input" placeholder="Search NASA images" @input="${this.inputChanged}" />
        </div>
      </details>
      <div class="results">
        ${this.items.map((item, index) => html`
        <a href="${item.links[0].href}" target="_blank">
          <nasa-image
            source="${item.links[0].href}"
            alt="${item.data[0].description}"
            title="${item.data[0].title}"
            desc="By: ${item.data[0].secondary_creator}"
          ></nasa-image>
        </a>
        `)}
      </div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(nasaDashboard.tag, nasaDashboard);