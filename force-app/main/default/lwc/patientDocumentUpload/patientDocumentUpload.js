import { LightningElement,track } from 'lwc';
import getPendingAccounts from '@salesforce/apex/AccountController.getPendingAccounts';

const columnList = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Account Number', fieldName: 'AccountNumber' },
    { label: 'Documents Upload', type: 'fileUpload', fieldName: 'Id', typeAttributes: { acceptedFileFormats: '.jpg,.jpeg,.pdf,.png',fileUploaded:{fieldName: 'IsDocumentComplete__c'} } }
];

export default class PatientDocumentUpload extends LightningElement {
    @track data = [];
    @track columns = columnList;
    connectedCallback() {
        getPendingAccounts().then(res => { 
            console.log('res:'+res);
            this.data = res; 
        }
        ).catch(err => console.error('err:'+err));
        console.log('columns => ', columnList);
        
        console.log(this.data);
    }
    handleUploadFinished(event) {
        event.stopPropagation();
        console.log('data => ', JSON.stringify(event.detail.data));
    }
}