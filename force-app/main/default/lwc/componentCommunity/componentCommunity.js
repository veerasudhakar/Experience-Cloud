import { LightningElement } from 'lwc';
import getDetailsByTypewithOther from '@salesforce/apex/CummintyClass.getDetailsByTypewithOther';
const c = [
    {label:'Course Name',fieldName:'ProgramName',type:'url',
    typeAttributes: { label:{fieldName:'Course_Name__c'},target:'__blank'} },
    {label:'Faculty Name',fieldName:'Name',type:'text'},
    {label:'Program Type',fieldName:'Program_Type__c',type:'Picklist'},
    {label:'Program Date',fieldName:'Program_Date__c',type:'Date/Time'},
    {label:'Program End Date',fieldName:'Program_End_Date__c',type:'Date/Time'},
    

  
  ];
  

export default class ComponentCommunity extends LightningElement {
    other;
    customer;
    prospect;
    error;
    col1=c;
    SalesforceHandler(event)
    {
        getDetailsByTypewithOther().then((result)=>{
         let tempRecs = [];
         result.forEach((record) => 
         {
              let temprec = Object.assign({},record);
              temprec.ProgramName = '/' + temprec.Id;
              tempRecs.push(temprec);
            
         });
         this.other = tempRecs;
         this.error = undefined;
        }).catch((error)=>{
          this.error = error;
        });
        
       
    }
}

    /*PythonHandler(event)
    {
        getDetailsByTypewithCustomer().then(result=>{
          let tempRecs = [];
        result.forEach((record) => 
        {
            let temprec = Object.assign({},record);
            temprec.ProgramName = '/' + temprec.Id;
            tempRecs.push(temprec);
            
        });
         this.customer = tempRecs;
        }).catch(error=>{
            this.error=error;
        })

    }
    JavaHandler(event)
    {
        getDetailsByTypewithProspect().then(result=>{
            let tempRecs = [];
        result.forEach((record) => 
        {
            let temprec = Object.assign({},record);
            temprec.ProgramName = '/' + temprec.Id;
            tempRecs.push(temprec);
            
        });
           this.prospect = tempRecs;
        }).catch(error=>{
            this.error=error;
        })

    }*/
}
    
       
      /* handleRowAction(event){
            const dataRow = event.detail.row;
            window.console.log('dataRow@@ ' + dataRow);
            this.ProgramRow=dataRow;
            window.console.log('ProgramRow## ' + programRow);
            this.modalContainer=true;
        }*/
        
      /* closeModalAction(){
        this.modalContainer=false;
       }
       handleClick(event){        
        const valueParam = this.value;
        const selectedFieldsValueParam = this.selectedFieldsValue;
        
    } */
