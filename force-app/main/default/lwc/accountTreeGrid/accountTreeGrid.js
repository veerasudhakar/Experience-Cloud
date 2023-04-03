import { LightningElement,wire} from 'lwc';


import { getObjectInfo } from 'lightning/uiObjectInfoApi'; //Tree grid Basic
import { getRecord } from 'lightning/uiRecordApi';

import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PARENT_ACCOUNT_FIELD from '@salesforce/schema/Account.ParentId';

export default class AccountTreeGrid extends LightningElement {
    columns = [     //Treee grid Basic
        { label: 'Account Name', fieldName: 'Name', type: 'text' },
        { label: 'Parent Account', fieldName: 'ParentId', type: 'text' }
    ];
    data = [];
    expandedRows = [];

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountObjectInfo;

    @wire(getRecord, { recordId: '$accountRecordId', fields: [NAME_FIELD, PARENT_ACCOUNT_FIELD] })
    accountRecord;

    connectedCallback() {
        this.loadAccounts();
    }

    loadAccounts() {
        // Load account data from server or use static data
        this.data = [
            {
                Id: '001',
                Name: 'Acme Corporation',
                ParentId: null,
                _children: [
                    {
                        Id: '002',
                        Name: 'Acme West',
                        ParentId: '001'
                    },
                    {
                        Id: '003',
                        Name: 'Acme East',
                        ParentId: '001',
                        _children: [
                            {
                                Id: '004',
                                Name: 'Acme East - Division A',
                                ParentId: '003'
                            },
                            {
                                Id: '005',
                                Name: 'Acme East - Division B',
                                ParentId: '003'
                            }
                        ]
                    }
                ]
            }
        ];
    }

    handleRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        // Do something with the selected rows
    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        // Do something with the row and action
    } //Treee grid Basic

   
    
}