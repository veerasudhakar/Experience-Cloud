import { LightningElement, track,wire} from 'lwc';
import getDataFromContact from '@salesforce/apex/lwcAppExampleApex.getDataFromContact';

const columns=[
    {
        label: 'View',
        type: 'button-icon',
        initialWidth: 75,
        typeAttributes: {
            iconName: 'action:preview',
            title: 'Preview',
            variant: 'border-filled',
            alternativeText: 'View'
        }
      },
      {
        label: 'First Name',
        fieldName: 'FirstName'
    },
    {
        label: 'Last Name',
        fieldName: 'LastName'
    },
    {
        label: 'Email',
        fieldName: 'Email'
    },
    {
        label: 'Phone',
        fieldName: 'Phone'
    }
];

 
export default class LwcDataTableRowAction extends LightningElement {
  @track columns = columns;
  @track contactRow={};
  @track rowOffset = 0;  
  @track modalContainer = false;
   @wire(getDataFromContact) wireContact;
 
   handleRowAction(event){
      const dataRow = event.detail.row;
      window.console.log('dataRow@@ ' + dataRow);
      this.contactRow=dataRow;
      window.console.log('contactRow## ' + dataRow);
      this.modalContainer=true;
   }
 
   closeModalAction(){
    this.modalContainer=false;
   }

 
}