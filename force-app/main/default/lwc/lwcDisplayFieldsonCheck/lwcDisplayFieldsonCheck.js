import { LightningElement, api } from 'lwc';
 
export default class LwcDisplayFieldsonCheck extends LightningElement {
    renderContactForm = true;
    @api recordId;
    @api objectApiName='Account'; 
    showFields = true;
    
    toggleFields() {
      this.showFields = !this.showFields;
    }
    handleAccountSuccess(event){
        this.accountId = event.detail.id;
     
        
     
        let contactForm = this.template.querySelector('lightning-record-edit-form[data-id="contactForm"]');
        contactForm.submit(); // this DOES NOT fire the 'onsubmit' event, 
                              // but it does submit, however, the Contact records' AccountId field is null!
     }
 
}