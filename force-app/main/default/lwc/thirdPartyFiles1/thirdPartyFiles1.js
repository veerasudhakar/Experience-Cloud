import { LightningElement } from 'lwc';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS'
import {loadscript} from 'lightning/platformResourceLoader'
export default class ThirdPartyFiles1 extends LightningElement {
     islibLoaded=false
    renderedCallback(){
        if(this.isLibLoaded){ 
            return
        } else { 
            loadScript(this, FullCalendarJS+'/FullCalendarJS/FullCalendarJS/fullcalender.min').then(()=>{ 
                this.setDateOnScreen()
            }).catch(error=>{ 
                console.error(error)
            })
            this.isLibLoaded = true
        }
       
    }
}