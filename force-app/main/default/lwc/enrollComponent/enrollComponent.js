import { LightningElement,track,api } from 'lwc';
import ENTROLLED_OBJECT from '@salesforce/schema/Enroll_Course__c';
import CONTACT_FIELD from '@salesforce/schema/Enroll_Course__c.Contact__c';
import PROGRAM_FIELD from '@salesforce/schema/Enroll_Course__c.Program__c';
import EMAIL_FIELD from '@salesforce/schema/Enroll_Course__c.Email__c';
import STATUS_FIELD from '@salesforce/schema/Enroll_Course__c.status__c';
export default class EnrollComponent extends LightningElement {
    @track isShowModal = false;

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

    @api objName=ENTROLLED_OBJECT
    fields=[CONTACT_FIELD,PROGRAM_FIELD,EMAIL_FIELD,STATUS_FIELD]
    handleSuccess(event)
    {
        console.log('event.detail.Id',event.detail.id)
    }
}