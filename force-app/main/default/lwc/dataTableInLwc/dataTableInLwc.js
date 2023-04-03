import { LightningElement,wire,track } from 'lwc';  
/*
import {refreshApex} from '@salesforce/apex';  
import getAllOps from '@salesforce/apex/OpportunityController.fetchOpportunityList';  
import deleteOpportunities from '@salesforce/apex/OpportunityController.deleteOpportunities';  
const COLS=[  
  {label:'Name',fieldName:'Name', type:'text'},  
  {label:'Stage',fieldName:'StageName', type:'text'},  
  {label:'Amount',fieldName:'Amount', type:'currency'}  
]; */ 

import getOpportunities from "@salesforce/apex/OpportunityController.fetchOpportunityList";  
 const COLS = [  
  {  
   label: "Name",  
   fieldName: "recordLink",  
   type: "url",  
   typeAttributes: { label: { fieldName: "Name" }, tooltip:"Name", target: "_blank" }  
  },  
  { label: "Stage", fieldName: "StageName", type: "text" },  
  { label: "Amount", fieldName: "Amount", type: "currency" }  
 ];  
export default class DataTableInLwc extends LightningElement {  
    /*
  cols=COLS;  
  @wire(getAllOps) oppList;  
  deleteRecord(){  
    var selectedRecords =  
     this.template.querySelector("lightning-datatable").getSelectedRows();  
    deleteOpportunities({oppList: selectedRecords})  
    .then(result=>{  
      return refreshApex(this.oppList);  
    })  
    .catch(error=>{  
      alert('Cloud not delete'+JSON.stringify(error));  
    })  
  } 
  */
  cols = COLS;  
  error;  
  @track oppList = [];  
  @wire(getOpportunities)  
  getOppList({ error, data }) {  
   if (data) {  
    var tempOppList = [];  
    for (var i = 0; i < data.length; i++) {  
     let tempRecord = Object.assign({}, data[i]); //cloning object  
     tempRecord.recordLink = "/" + tempRecord.Id;  
     tempOppList.push(tempRecord);  
    }  
    this.oppList = tempOppList;  
    this.error = undefined;  
   } else if (error) {  
    this.error = error;  
    this.oppList = undefined;  
   }  
  }   
}  