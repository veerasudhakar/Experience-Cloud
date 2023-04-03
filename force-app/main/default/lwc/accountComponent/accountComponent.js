import { LightningElement,track,wire} from 'lwc';
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';
//import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
//import { getPicklistValues } from 'lightning/uiObjectInfoApi';Account Picklist Code (*)
//import Account_Industry from '@salesforce/schema/Account.Industry';Account Picklist Code (*)
//import { getObjectInfo } from 'lightning/uiObjectInfoApi';Account Picklist Code (*)
//import ACCOUNT_OBJECT from '@salesforce/schema/Account';Account Picklist Code (*)
import getLatestAccounts from '@salesforce/apex/accountDetails.getAccountList';
const COLS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Stage', fieldName: 'Phone', type: 'text' },
    { label: 'Amount', fieldName: 'Industry', type: 'text' }
];
export default class AccountComponent extends LightningElement {
    /*
    Name
    //Industry
    selectedIndustry = '';
    industryOptions = [];

    @wire(getPicklistValues, {
        recordTypeId: '012000000000000AAA', // Replace with your record type ID
        fieldApiName: INDUSTRY_FIELD
       // console.log('defaultRecordTypeId'+data.defaultRecordTypeId)

        //console.log('recordTypeInfos'+JSON.stringify(data.recordTypeInfos))


    })
    industryPicklistValues({data, error}) {
        if (data) {
            this.industryOptions = data.values.map(option => ({
                label: option.label,
                value: option.value
            }));
        } else if (error) {
            console.error(error);
        }
    }

    handleIndustryChange(event) {
        this.selectedIndustry = event.detail.value;
    }
    */
   /*Account Picklist Code (*)
    selected = [];
    options = [];
  
 @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    @wire(getPicklistValues,
        {
            recordTypeId: '$accountInfo.data.defaultRecordTypeId',
            fieldApiName: Account_Industry
        }
    )
    AccountIndustryValues({data,error}){
        if(data){
         this.options = data.values;
        }
        else if(error){
       console.log('error====> ' +  JSON.stringify(error));
        }
    };


    handleChange(event){
  this.selected = event.detail.value;
    }
    */

    cols = COLS;
    @track isSpinner = false;
    @track accountList = [];

    connectedCallback() {
        this.isSpinner = true;
    }

    @wire(getLatestAccounts) fetchAccList(result) {
        this.isSpinner = false;
        if (result.data) {
            this.accountList = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accountList = [];
        }
    }
}