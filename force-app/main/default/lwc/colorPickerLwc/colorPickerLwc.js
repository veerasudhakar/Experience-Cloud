import { LightningElement } from 'lwc';

export default class ColorPickerLwc extends LightningElement {
    colorHandleChange(event){
        const colorInpCodeVal = event.target.value;
        const inpColorCodeEvent = new CustomEvent('changecolorbg',{      
            detail:{colorInpCodeVal},
        });
        this.dispatchEvent(inpColorCodeEvent);
      }
}