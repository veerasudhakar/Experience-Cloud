import { LightningElement, wire } from 'lwc';
import getAccountsAndContacts from '@salesforce/apex/AccountContactController.getAccountsAndContacts';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import CONTACT_FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import { getFieldValue } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import { loadStyle } from 'lightning/platformResourceLoader';
import TREEGRID_STYLES from '@salesforce/resourceUrl/treeGridStyles';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

export default class AccountContactTreeGrid extends NavigationMixin(LightningElement) {
    @wire(getAccountsAndContacts)
    accounts;

    // Field definitions for the tree grid
    accountColumns = [
        {label: 'Account Name', fieldName: ACCOUNT_NAME_FIELD.fieldApiName, type: 'text', sortable: true},
        {label: 'Contact Name', type: 'text', sortable: true,
            fieldName: 'contactName', 
            typeAttributes: {
                iconName: 'standard:contact',
                label: { fieldName: 'contactName' },
                target: '_blank'
            }
        },
        {label: 'Email', fieldName: CONTACT_EMAIL_FIELD.fieldApiName, type: 'email', sortable: true}
    ];

    // Convert the account and contact data to a tree grid compatible format
    get treeGridData() {
        if (this.accounts.data) {
            let accountMap = new Map();
            this.accounts.data.forEach(account => {
                let contacts = account.Contacts ? account.Contacts.records : [];
                accountMap.set(account.Id, {...account, Contacts: null, children: contacts});
            });

            let treeData = [];
            accountMap.forEach((value, key) => {
                if (!value.ParentId) {
                    treeData.push(value);
                } else {
                    let parent = accountMap.get(value.ParentId);
                    if (parent) {
                        if (!parent.children) {
                            parent.children = [];
                        }
                        parent.children.push(value);
                    }
                }
            });

            return treeData;
        } else {
            return [];
        }
    }

    // Format the contact name column
    formatContactName(data, column) {
        let contact = data[column.fieldName];
        if (contact) {
            return contact.FirstName + ' ' + contact.LastName;
        } else {
            return '';
        }
    }

    // Handle row selection in the tree grid
    handleRowSelection(event) {
        let accountId = event.detail.selectedRows[0].Id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}