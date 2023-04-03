import { LightningElement } from 'lwc';  
//import fetchAccounts from '@salesforce/apex/AccountOppoController.fetchAccountAndRelatedContacts';  
import fetchAccountAndRelatedContacts from '@salesforce/apex/AccountOppoController.fetchAccountAndRelatedContacts';
const DELAY = 350;  
export default class accountSearchLWC extends LightningElement {  
    
    // gridColumns = [ { Tree Grid Old one
    //     type: 'text',
    //     fieldName: 'Name',
    //     label: 'Name'
    // },
    // {
    //     type: 'text',
    //     fieldName: 'Industry',
    //     label: 'Industry'
    // },
    // {
    //     type: 'text',
    //     fieldName: 'FirstName',
    //     label: 'FirstName'
    // },
    // {
    //     type: 'text',
    //     fieldName: 'LastName',
    //     label: 'LastName'
    // },
    // {
    //     type: 'text',
    //     fieldName: 'OpptyName',
    //     label: 'Opportunity Name'
    // },
    // {
    //     type: 'text',
    //     fieldName: 'StageName',
    //     label: 'Opportunity Status'
    // } ];
    // gridData;
    // error;  
    // searchKey;
    
    // handleKeyChange( event ) {  

    //     this.searchKey = event.target.value;
    // }

    // handleSearch() {

    //     console.log( 'Search Key is ' + this.searchKey );
    
    //     if ( this.searchKey ) {  
    
    //         fetchAccounts( { searchKey: this.searchKey } )    
    //         .then( result => {  
                
    //             console.log( 'Retrieved data is ' + JSON.stringify( result ) );
    //             let tempData = JSON.parse( JSON.stringify( result ) );

    //             for ( let i = 0; i < tempData.length; i++ ) {
                    
    //                 let cons = tempData[ i ][ "Contacts" ];
    //                 delete tempData[ i ][ "Contacts" ];
    //                 let childRecords = cons ? cons : [];
    //                 let opps = tempData[ i ][ "Opportunities" ];


    //                 for ( let opp in opps ) {

    //                     opps[ opp ].OpptyName = opps [ opp ].Name;
    //                     delete opps [ opp ].Name;
    //                     childRecords.push( opps[ opp ] );

    //                 }

    //                 delete tempData[ i ][ "Opportunities" ];                
    //                 console.log( 'Child Records ' + JSON.stringify( childRecords ) );
    //                 tempData[ i ]._children = childRecords;

    //             }

    //             console.log( 'Final Data ' + JSON.stringify( tempData ) );
    //             this.gridData = tempData;
    
    //         } )  
    //         .catch( error => {  
    
    //             this.error = error;  
    
    //         } );  
    
    //     } else  {
        
    //         this.gridData = undefined;  
        
    //     }
    
    // }  Tree Grid Old one

    gridData;

    gridColumns = [
        {
            type: 'text',
            fieldName: 'Name',
            label: 'Name'
        },
        {
            type: 'text',
            fieldName: 'Phone',
            label: 'Phone'
        },
        {
            type: 'text',
            fieldName: 'AccountNumber',
            label: 'Account Number'
        },
        {
            type: 'text',
            fieldName: 'FirstName',
            label: 'First Name'
        },
        {
            type: 'text',
            fieldName: 'LastName',
            label: 'Last Name'

        }
    ];

    handleKeyChange(event) {
        // Debouncing this method: Do not actually invoke the Apex call as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            fetchAccountAndRelatedContacts({ searchKey: searchKey }).then((result) => {
                let data = JSON.parse(JSON.stringify(result));
                for (let i = 0; i < data.length; i++) {
                    data[i]._children = data[i]['Contacts'];
                    delete data[i]['Contacts'];
                }
                this.gridData = data;
            }).catch((error) => {
                console.log(error);
                this.gridData = undefined;
            });
        }, DELAY);
    }
    
}  