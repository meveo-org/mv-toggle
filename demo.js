import { LitElement, html, css, unsafeCSS } from "lit-element";
import "./mv-toggle.js";

export class MvToggleDemo extends LitElement {
  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }
      
      .container {
        text-align: center;
        width: 100%;
        margin-top: 100px;
      }
      
      .toggle-item {
        display: inline-block;
        margin-right: 15px;
      }
      
      .custom-color {
        --mv-toggle-not-checked: #449D44;
        --mv-toggle-checked: #C9302C;
        --mv-slider-color: #FFFFFF;
      }
      
      .custom-size {
        --mv-toggle-custom-size: 80px;
      }
      
      .container-demo {
        display: flex;
        align-items: center;
        justify-content: center;        
        width: 100%;
      }
      
      .value {
        padding: 3px 10px;
        margin-left: 20px;
        font-size: 16px;
        color: #DF013A;
        background-color: #F8E0E0;
        line-height: 18px;
      }

      .value.checked {
        color: #088A29;
        background-color: #CEF6CE;
      }
   `;
  }

  static get properties() {
    return {
      checked: { type: Boolean, attribute: false, reflect: true },
      disabled: { type: Boolean },
      label: { type: String },
      value: { type: String, attribute: false, reflect: true }
    };
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = true;
    this.label = "Click toggle";
    this.value = "NO";
  }

  render() {
    return html`
      <div class="container">
        <div class="toggle-item">
          <mv-toggle
            size="large"
          ></mv-toggle>
          <h3>Large</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${true}"
            size="medium"
          ></mv-toggle>
          <h3>Medium</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${false}"
            size="small"
          ></mv-toggle>
          <h3>Small</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${false}"
            size="tiny"
          ></mv-toggle>
          <h3>Tiny</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${false}"
            ?disabled="${this.disabled}"
            size="small"
          ></mv-toggle>
          <h3>Disable</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${false}"
            size="small"
            .label="${this.label}"
          ></mv-toggle>
          <h3>Toggle with label</h3>
        </div>
      </div>
      
      <div class="container">
        <div class="toggle-item">
          <mv-toggle
            class="custom-color"
            size="large"
          ></mv-toggle>
          <h3>Custom color</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            class="custom-size"
          ></mv-toggle>
          <h3>Custom size</h3>
        </div>
      </div>
      
      <div class="container-demo">
         <mv-toggle
           .value="${{ isChecked: !this.checked }}"
           .checked="${!!this.checked}"
           @click-toggle="${this.handleClickToggle}"
           .label="${this.label}"
           size="large"
         ></mv-toggle>
         <div class="value${this.checked ? " checked" : ""}">${this.value}</div>
      </div>
    `;
  }

  handleClickToggle(event) {
    const { detail: { value, checked } } = event;
    this.value = value.isChecked ? "YES" : "NO";
    this.checked = checked;
  }
}

customElements.define("mv-toggle-demo", MvToggleDemo);
