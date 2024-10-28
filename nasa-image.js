import { LitElement, html, css } from "lit";

export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = '';
    this.source = '';
    this.alt = '';
    this.desc = '';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        alt: { type : String },
        desc: { type : String }
    };
  }

  static get styles() {
    return [css`

      div {
        width: 240px;
        height: 300px;
        font-size: 16px;
        font-weight: bold;
        border: black;
      }
      div:hover {
        background-color: var(--ddd-theme-default-keystoneYellow);
      }

      .card {
        display: inline-grid;
      }

      .title {
        height: var(--ddd-spacing-10);
        text-align: center;
      }

      .desc {
        height: var(--ddd-spacing-20);
        text-align: center;
      }

      img {
        width: 240px;
        height: 180px;
        display: block;
      }

      a {
        text-decoration: none;
      }

    `];
  }

  render() {
    return html`
    <div class="card">
        <img src="${this.source}" alt="${this.alt}"/>
        <div class="title">${this.title}</div>
        <div class="desc">${this.desc}</div>
    </div>
    `;
  }
  static get tag() {
    return "nasa-image";
  }
}

customElements.define(NasaImage.tag, NasaImage);