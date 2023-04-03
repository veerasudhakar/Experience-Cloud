import { LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Contact.AccountId';
import Contact from '@salesforce/schema/Contact';
export default class RecordForm extends LightningElement {
    fields = [NAME_FIELD];

    // Flexipage provides recordId and objectApiName
     recordId;
     objectApiName=Contact
}