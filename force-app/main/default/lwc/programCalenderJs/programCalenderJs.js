import { LightningElement,wire,track } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';
import fetchPrograms from '@salesforce/apex/programCalender.fetchPrograms';
import createProgram from '@salesforce/apex/programCalender.createProgram';
import deleteProgram from '@salesforce/apex/programCalender.deleteProgram';
import { refreshApex } from '@salesforce/apex';
export default class ProgramCalenderJs extends LightningElement {
    fullCalendarJsInitialised = false;

//Fields to store the event data -- add all other fields you want to add
Name;
ProgramDate;
ProgramEndDate;
ProgramTime;

programsRendered = false;//To render initial events only once
openSpinner = false; //To open the spinner in waiting screens
openModal = false; //To open form

@track
programs = []; //all calendar events are stored in this field

//To store the orignal wire object to use in refreshApex method
programOriginalData = [];

//Get data from server - in this example, it fetches from the event object
@wire(fetchPrograms)
programObj(value){
    this.programOriginalData = value; //To use in refresh cache

    const {data, error} = value;
    if(data){
        //format as fullcalendar event object
        console.log(data);
        let events = data.map(programs => {
            return { id : programs.Id, 
                    Name : programs.Name, 
                    Program_Date__c : programs.Program_Date__c,
                    Program_End_Date__c : programs.Program_End_Date__c,
                    Program_Time__c : programs.Program_Time__c,
                    allDay : programs.IsAllDayProgram};
        });
        this.programs = JSON.parse(JSON.stringify(programs));
        console.log(this.programs);
        this.error = undefined;

        //load only on first wire call - 
        // if events are not rendered, try to remove this 'if' condition and add directly 
        if(! this.programsRendered){
            //Add events to calendar
            const ele = this.template.querySelector("div.FullCalendarJS");
            $(ele).fullCalendar('renderPrograms', this.programs, true);
            this.programsRendered = true;
        }
    }else if(error){
        this.programs = [];
        this.error = 'No programs are found';
    }
}

/**
* Load the fullcalendar.io in this lifecycle hook method
*/
renderedCallback() {
  // Performs this operation only on first render
  if (this.fullCalendarJsInitialised) {
     return;
  }
  this.fullCalendarJsInitialised = true;

  // Executes all loadScript and loadStyle promises
  // and only resolves them once all promises are done
    Promise.all([
        loadScript(this, FullCalendarJS + "/FullCalendarJS/jquery.min.js"),
        loadScript(this, FullCalendarJS + "/FullCalendarJS/moment.min.js"),
        loadScript(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.js"),
        loadStyle(this, FullCalendarJS + "/FullCalendarJS/fullcalendar.min.css"),
    ])
    .then(() => {
        //initialize the full calendar
    this.initialiseFullCalendarJs();
    })
    .catch((error) => {
    console.error({
        message: "Error occured on FullCalendarJS",
        error,
    });
    });
}

initialiseFullCalendarJs() {
    const ele = this.template.querySelector("div.fullcalendarjs");
    const modal = this.template.querySelector('div.modalclass');
    console.log(FullCalendar);

    var self = this;

    //To open the form with predefined fields
    //TODO: to be moved outside this function
    function openActivityForm(ProgramDate, ProgramEndDate,ProgramTime){
        self.ProgramDate = ProgramDate;
        self.ProgramEndDate = ProgramEndDate;
        self.ProgramTime = ProgramTime;
        self.openModal = true;
    }
    //Actual fullcalendar renders here - https://fullcalendar.io/docs/v3/view-specific-options
    $(ele).fullCalendar({
        header: {
            left: "prev,next today",
            center: "title",
            right: "month,agendaWeek,agendaDay",
        },
        defaultDate: new Date(), // default day is today - to show the current date
        defaultView : 'agendaWeek', //To display the default view - as of now it is set to week view
        navLinks: true, // can click day/week names to navigate views
        // editable: true, // To move the events on calendar - TODO 
        selectable: true, //To select the period of time

        //To select the time period : https://fullcalendar.io/docs/v3/select-method
        select: function (ProgramDate, ProgramEndDate, ProgramTime) {
            let ProDate = ProgramDate.format();
            let ProEndDate = ProgramEndDate.format();
            let ProTime = ProgramTime.format();
            
            openActivityForm(ProDate, ProEndDate, ProTime);
        },
        
        programLimit: true, // allow "more" link when too many events
        programs: this.programs, // all the events that are to be rendered - can be a duplicate statement here
    });
}

//TODO: add the logic to support multiple input texts
handleKeyup(event) {
    this.title = event.target.value;
}

//To close the modal form
handleCancel(event) {
    this.openModal = false;
}

//To save the event
handleSave(event) {
    let programs = this.programs;
    this.openSpinner = true;

    //get all the field values - as of now they all are mandatory to create a standard event
    //TODO- you need to add your logic here.
    this.template.querySelectorAll('lightning-input').forEach(ele => {
        if(ele.name === 'Name'){
           this.Name = ele.value;
       }
       if(ele.name === 'ProgramDate'){
            this.ProgramDate = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
        }
        if(ele.name === 'ProgramEndDate'){
            this.ProgramEndDate = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
        }
        if(ele.name === 'ProgramTime'){
            this.ProgramTime = ele.value.includes('.000Z') ? ele.value : ele.value + '.000Z';
        }
    });
   
    //format as per fullcalendar event object to create and render
    let newprogram = {Name : this.Name, ProgramDate : this.ProgramDate, ProgramEndDate: this.ProgramEndDate, ProgramTime: this.ProgramTime};
    console.log(this.programs);

    //Close the modal
    this.openModal = false;
    //Server call to create the event
    createProgram({'program' : JSON.stringify(newprogram)})
    .then( result => {
        const ele = this.template.querySelector("div.fullcalendarjs");

        //To populate the event on fullcalendar object
        //Id should be unique and useful to remove the event from UI - calendar
        newprogram.id = result;
        
        //renderEvent is a fullcalendar method to add the event to calendar on UI
        //Documentation: https://fullcalendar.io/docs/v3/renderEvent
        $(ele).fullCalendar( 'renderProgram', newprogram, true );
        
        //To display on UI with id from server
        this.events.push(newprogram);

        //To close spinner and modal
        this.openSpinner = false;

        //show toast message
        this.showNotification('Success!!', 'Your program has been logged', 'success');

    })
    .catch( error => {
        console.log(error);
        this.openSpinner = false;

        //show toast message - TODO 
        this.showNotification('Oops', 'Something went wrong, please review console', 'error');
    })
}

/**
* @description: remove the event with id
* @documentation: https://fullcalendar.io/docs/v3/removeEvents
*/
removeProgram(event) {
    //open the spinner
    this.openSpinner = true;

    //delete the event from server and then remove from UI
    let programid = event.target.value;
    deleteEvent({'programid' : programid})
    .then( result => {
        console.log(result);
        const ele = this.template.querySelector("div.fullcalendarjs");
        console.log(programid);
        $(ele).fullCalendar( 'removeEvents', [programid] );

        this.openSpinner = false;
        
        //refresh the grid
        return refreshApex(this.programOriginalData);

    })
    .catch( error => {
        console.log(error);
        this.openSpinner = false;
    });
}

/**
*  @description open the modal by nullifying the inputs
*/
addProgram(event) {
    this.ProgramDate = null;
    this.ProgramEndDate = null;
    this.Name = null;
    this.ProgramTime = null;
    this.openModal = true;
}

/**
 * @description method to show toast events
 */
showNotification(title, message, variant) {
    console.log('enter');
    const evt = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
    });
    this.dispatchEvent(evt);
}
}