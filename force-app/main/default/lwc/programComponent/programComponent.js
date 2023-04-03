import { LightningElement,wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import Program_Type from '@salesforce/schema/Program__c.Program_Type__c';
export default class ProgramComponent extends LightningElement {
    selectedProgramType = '';
    ProgramTypeOptions = [];

    @wire(getPicklistValues, {
        recordTypeId: 'a055g000008XMkqAAG', // Replace with your record type ID
        fieldApiName: Program_Type
       // console.log('defaultRecordTypeId'+data.defaultRecordTypeId)

        //console.log('recordTypeInfos'+JSON.stringify(data.recordTypeInfos))


    })
    programtypePicklistValues({data, error}) {
        if (data) {
            this.ProgramTypeOptions = data.values.map(option => ({
                label: option.label,
                value: option.value
            }));
        } else if (error) {
            console.error(error);
        }
    }

    handleIndustryChange(event) {
        this.selectedProgramType = event.detail.value;
    }
}