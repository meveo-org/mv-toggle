import { LitElement, html, css } from "lit-element";
import "./mv-toggle.js";
import "mv-container";

export class MvToggleDemo extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, attribute: false, reflect: true },
      disabled: { type: Boolean },
      label: { type: String },
      value: { type: String, attribute: false, reflect: true },
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
      
      mv-container {
        --mv-container-min-width: 650px;
      }
      
      fieldset > label, label > input {
        cursor: pointer;
      }
      
      fieldset {
        width: 120px;
        margin-left: 10px;
        border:2px solid red;
        -moz-border-radius:8px;
        -webkit-border-radius:8px;	
        border-radius:8px;
        color: #818181;
      }
      
      legend {
        font-weight: 500;
        color: red;
      }  
   `;
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = true;
    this.label = "Click toggle";
    this.value = "NO";
    this.theme = "light";
  }

  render() {
    const isLightTheme = this.theme === "light";
    const toggleTheme = isLightTheme ? "dark" : "light";
    const textColor = `color: ${isLightTheme ? "" : "#FFFFFF"}`;
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label><input type="radio" name="theme" value="light" checked @change="${this.radioChange}" />Light</label>
        <label><input type="radio" name="theme" value="dark" @change="${this.radioChange}" />Dark</label>
      </fieldset>
      <mv-container .theme="${this.theme}" style="${textColor}">
        <div class="container">
          <div class="toggle-item">
            <mv-toggle
              size="large"
              .theme="${toggleTheme}"
            ></mv-toggle>
            <h3>Large</h3>
          </div>
          
          <div class="toggle-item">
            <mv-toggle
              ?checked="${true}"
              size="medium"
              .theme="${toggleTheme}"
            ></mv-toggle>
            <h3>Medium</h3>
          </div>
          
          <div class="toggle-item">
            <mv-toggle
              ?checked="${false}"
              size="small"
              .theme="${toggleTheme}"
            ></mv-toggle>
            <h3>Small</h3>
          </div>
          
          <div class="toggle-item">
            <mv-toggle
              ?checked="${false}"
              size="tiny"
              .theme="${toggleTheme}"
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
              .theme="${toggleTheme}"
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
              .theme="${toggleTheme}"
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
             .theme="${toggleTheme}"
           ></mv-toggle>
           <div class="value${this.checked ? " checked" : ""}">${this.value}</div>
        </div>
      </mv-container>
    `;
  }

  handleClickToggle(event) {
    const { detail: { value, checked } } = event;
    this.value = value.isChecked ? "YES" : "NO";
    this.checked = checked;
  }

  radioChange = originalEvent => {
    const { target: { value } } = originalEvent;
    if (value === "light") {
      this.theme = "light";
    } else {
      this.theme = "dark";
    }
  };
}

customElements.define("mv-toggle-demo", MvToggleDemo);
