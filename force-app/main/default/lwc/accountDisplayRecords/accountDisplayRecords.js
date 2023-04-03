import { LightningElement, api } from 'lwc';
//import getAccounts from '@salesforce/apex/AccountController1.getAccounts';
//import createAccount from '@salesforce/apex/AccountController1.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class AccountDisplayRecords extends LightningElement {

    // accounts;
    // accountName = '';
    // accountPhone = '';
    // accountBillingCity = '';
    // accountBillingCountry = '';

    // @wire(getAccounts)
    // wiredAccounts({ error, data }) {
    //     if (data) {
    //         this.accounts = data;
    //     } else if (error) {
    //         console.error(error);
    //     }
    // }

    // handleNameChange(event) {
    //     this.accountName = event.target.value;
    // }

    // handlePhoneChange(event) {
    //     this.accountPhone = event.target.value;
    // }

    // handleBillingCityChange(event) {
    //     this.accountBillingCity = event.target.value;
    // }

    // handleBillingCountryChange(event) {
    //     this.accountBillingCountry = event.target.value;
    // }

    // handleCreate() {
    //     const account = {
    //         Name: this.accountName,
    //         Phone: this.accountPhone,
    //         BillingCity: this.accountBillingCity,
    //         BillingCountry: this.accountBillingCountry
    //     };
    //     createAccount({ account })
    //         .then(result => {
    //             this.accounts = [...this.accounts, result];
    //             this.accountName = '';
    //             this.accountPhone = '';
    //             this.accountBillingCity = '';
    //             this.accountBillingCountry = '';
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    @api recordId;
    @api objectApiName;
    fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
    handleSubmit(event){
        //you can change values from here
        //const fields = event.detail.fields;
        //fields.Name = 'My Custom  Name'; // modify a field
        console.log('Account detail : ',event.detail.fields);
        console.log('Account name : ',event.detail.fields.Name);
    }

}