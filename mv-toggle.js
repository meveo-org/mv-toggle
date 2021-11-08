import { LitElement, html, css } from "lit-element";

export class MvToggle extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, attribute: true, reflect: true, state: true },
      disabled: { type: Boolean, attribute: true, reflect: true},
      label: { type: String, attribute: true },

      //  valid size values are: "large", "medium", "small", "tiny"
      //  default: "large"
      size: { type: String, attribute: true },
      value: { type: Object, attribute: true, reflect: true },

      //  valid theme values are: "light", "dark"
      //    default: "dark"
      theme: { type: String, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
	    --mv-toggle-label-font-family: var(--font-family, Arial);
	    --mv-toggle-label-font-size: var(--font-size-m, 10pt);
	    --width: var(--mv-toggle-custom-size, 100px);
        --height: calc(var(--width) / 2);
        --slider-size: calc((var(--width) / 2) - 2px);
        --not-checked-input-dark-background: var(--mv-toggle-not-checked-dark-background, #CCCCCC);
        --checked-input-dark-background: var(--mv-toggle-checked-dark-background, #48c9c4);
        --slider-dark-background: var(--mv-toggle-slider-dark-background, #3F4753);
        --not-checked-input-light-background: var(--mv-toggle-not-checked-light-background, #CCCCCC);
        --checked-input-light-background: var(--mv-toggle-checked-light-background, #2196F3);
        --slider-light-background: var(--mv-toggle-slider-light-background, #FFFFFF);
      }
      
      .toggle {
        position: relative;
        display: inline-block;
        width: var(--width);
        height: var(--height);
      }
      
      .toggle.medium {
        width: 50px;
        height: 25px;
      }
      
      .toggle.medium > .slider:before {
        height: 23px;
        width: 23px;
      }
      
      .toggle.medium > input:checked + .slider:before {
        -webkit-transform: translateX(23px);
        -ms-transform: translateX(23px);
        transform: translateX(23px);
      }
      
      .toggle.small {
        width: 30px;
        height: 15px;
      }
      
      .toggle.small > .slider:before {
        height: 13px;
        width: 13px;
      }
      
      .toggle.small > input:checked + .slider:before {
        -webkit-transform: translateX(13px);
        -ms-transform: translateX(13px);
        transform: translateX(13px);
      }
      
      .toggle.tiny {
        width: 20px;
        height: 10px;
      }
      
      .toggle.tiny > .slider:before {
        height: 8px;
        width: 8px;
      }
      
      .toggle.tiny > input:checked + .slider:before {
        -webkit-transform: translateX(8px);
        -ms-transform: translateX(8px);
        transform: translateX(8px);
      }
      
      .toggle input { 
        opacity: 0;
        width: 0;
        height: 0;
      }
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--not-checked-input-color);
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:disabled + span {
        opacity: 0.5;
        cursor: default;
      }
      
      input:disabled + span::before {
        opacity: 0.5;
        cursor: default;
      }
      
      .slider::before {
        position: absolute;
        content: "";
        height: var(--slider-size);
        width: var(--slider-size);
        left: 2px;
        bottom: 1px;
        background-color: var(--slider-color);
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: var(--checked-input-color);
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider::before {
        -webkit-transform: translateX(var(--slider-size));
        -ms-transform: translateX(var(--slider-size));
        transform: translateX(var(--slider-size));
      }
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;
      }
      
      .toggle-label {
        margin-left: 10px;
        cursor: pointer;
        font-family: var(--mv-toggle-label-font-family);
        font-size: var(--mv-toggle-label-font-size);
      }
      
      label {
        display: inline-block;
        line-height: var(--height);
      }
      
      label.medium {
        line-height: 25px;
      }
      
      label.small {
        line-height: 15px;
      }
      
      label.tiny {
        line-height: 10px;
      }
      
      .light {
        --not-checked-input-color: var(--not-checked-input-light-background);
        --checked-input-color: var(--checked-input-light-background);
        --slider-color: var(--slider-light-background);
      }
      
      .dark {
        --not-checked-input-color: var(--not-checked-input-dark-background);
        --checked-input-color: var(--checked-input-dark-background);
        --slider-color: var(--slider-dark-background);
      }
   `;
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.label = null;
    this.size = "large";
    this.theme = "dark";
  }

  render() {
    const { handleClick, label } = this;
    return html`
      <label class="${this.size} ${this.theme}">
        <span class="toggle ${this.size}">
          <input
            type="checkbox"
            @click="${handleClick}"
            .disabled="${this.disabled}"
            .checked="${this.checked}"
          />
          <span class="slider round"></span>
        </span>
        ${label
          ? html`<span class="toggle-label">${this.label}</span>`
          : html``}
      </label>
    `;
  }

  handleClick(originalEvent) {
    originalEvent.stopPropagation();
    const { value, checked } = this;
    this.dispatchEvent(
      new CustomEvent("click-toggle", {
        detail: { value, checked: !checked, originalEvent }
      })
    );
  }
}

customElements.define("mv-toggle", MvToggle);
