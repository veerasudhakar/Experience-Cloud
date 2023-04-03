import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import USER_ID from '@salesforce/user/Id';
export default class UserDetails extends NavigationMixin(LightningElement) {
    USER_ID=''
    encodeDefaultFieldValues
    connectedCallback() {
        this.getUserInfo();
    }
    
    getUserInfo() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'userInfo'
            }
        })
        .then((response) => {
            const user = JSON.parse(decodeURIComponent(response.url.split('#')[1].split('?')[1]));
            console.log(user);
            // Display the user's details in the LWC
        })
        .catch((error) => {
            console.log(error);
            // Display an error message to the user
            const event = new ShowToastEvent({
                title: 'Error',
                message: 'An error occurred while retrieving user information',
                variant: 'error'
            });
            this.dispatchEvent(event);
        });
    }
}