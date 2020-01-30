import { LitElement, html, css } from "lit-element";
import "./mv-toggle.js";
import "mv-font-awesome";

export class MvToggleDemo extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, attribute: false, reflect: true },
      disabled: { type: Boolean },
      label: { type: String },
      value: { type: String, attribute: false, reflect: true },
      open: { type: Boolean, attribute: true },
      theme: { type: String, attribute: true }
    };
  }

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
        --mv-toggle-not-checked-dark-background: #449D44;
        --mv-toggle-checked-dark-background: #C9302C;
        --mv-toggle-slider-dark-background: #FFFFFF;
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
      
      mv-fa[icon="lightbulb"] {
        font-size: 50px;
        cursor: pointer;
        margin: 20px;
      }
      
      .theme {
        display: flex;
        justify-content: flex-start;
      }
   `;
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = true;
    this.label = "Click toggle";
    this.value = "NO";
    this.open = false;
    this.theme = "dark";
  }

  render() {
    return html`
      <div class="theme">
        <mv-fa icon="lightbulb" style="color: ${this.open ? "yellow" : ""}" @click=${this.toggleLightBulb}></mv-fa>
      </div>
      <div class="container">
        <div class="toggle-item">
          <mv-toggle
            size="large"
            .theme="${this.theme}"
          ></mv-toggle>
          <h3>Large</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${true}"
            size="medium"
            .theme="${this.theme}"
          ></mv-toggle>
          <h3>Medium</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${false}"
            size="small"
            .theme="${this.theme}"
          ></mv-toggle>
          <h3>Small</h3>
        </div>
        
        <div class="toggle-item">
          <mv-toggle
            ?checked="${false}"
            size="tiny"
            .theme="${this.theme}"
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
            .theme="${this.theme}"
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
            .theme="${this.theme}"
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
           .theme="${this.theme}"
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

  toggleLightBulb = () => {
    this.open = !this.open;
    if (this.open) {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-toggle-demo", MvToggleDemo);
