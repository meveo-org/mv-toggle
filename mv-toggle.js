import { LitElement, html, css } from 'lit-element';

export class MvToggle extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, attribute: true },
      disabled: { type: Boolean, attribute: true },
      label: { type: String, attribute: true },
      size: { type: String, attribute: true },
      value: { type: Object, attribute: true }
    };
  }

  static get styles() {
    return css`
      :host {
				font-family: var(--font-family, Arial);
				font-size: var(--font-size-m, 10pt);				
      }
      
      .toggle {
        position: relative;
        display: inline-block;
        width: var(--mv-toggle-width, 100px);
        height: var(--mv-toggle-height, 50px);
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
        background-color: var(--mv-toggle-not-checked, #CCCCCC);
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
        height: var(--mv-slider-size, 48px);
        width: var(--mv-slider-size, 48px);
        left: 2px;
        bottom: 1px;
        background-color: var(--mv-slider-color, #3F4753);
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: var(--mv-toggle-checked, #48c9c4);
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider::before {
        -webkit-transform: translateX(var(--mv-slider-size, 48px));
        -ms-transform: translateX(var(--mv-slider-size, 48px));
        transform: translateX(var(--mv-slider-size, 48px));
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
      }
      
      label {
        display: inline-block;
        line-height: var(--mv-toggle-height, 50px);
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
   `;
  }

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
    this.label = null;
    this.size = "large";
  }

  render() {
    const { handleClick, label } = this;
    return html`
      <label class="${this.size}">
        <span class="toggle ${this.size}">
          <input
           type="checkbox"
           @click="${handleClick}"
           ?disabled="${this.disabled}"
           ?checked="${this.checked}"
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

customElements.define('mv-toggle', MvToggle);
