public with sharing class programCalender {
    public class ProgramException extends Exception {}
    
    /**
     * @description: To retrieve the most recent events
     */
    @AuraEnabled(cacheable=true)
    public static List<Program__c> fetchPrograms() {
        return [SELECT Id,Name, Program_Time__c FROM Program__c 
                ORDER BY CreatedDate DESC
                LIMIT 100];
    }

    /**
     * @description To create an event from web component 
     * @param event - json string with event details - title, start and end for now
     */
    @AuraEnabled
    public static Id createProgram(String program){

        //The following logic to be replaced with your respective event object
        if(String.isBlank(program)){
            return null;
        }
        Map<String, Object> programMap = (Map<String, Object>) JSON.deserializeUntyped(program);
        
        Program__c newProgram = new Program__c();
        newProgram.Name = programMap.get('Name') != null ? (String)programMap.get('Name') : null;

        //String ProgramDate = programMap.get('Date') != null ? 
                           // ((String)programMap.get('Date')).replace('T', ' ').replace('.000Z', '') : 
                           // null;
        //String ProgramEndDate = programMap.get('end') != null ? 
                           // ((String)programMap.get('end')).replace('T', ' ').replace('.000Z', '') : 
                           // null;
       String ProgramTime = programMap.get('Time') != null ? 
                            ((String)programMap.get('Time')).replace('T', ' ').replace('.000Z', '') : 
                            null;                    

        //newProgram.Program_Date__c = ProgramDate != null ? Date(ProgramDate) : null;
       // newProgram.Program_End_Date__c = ProgramEndDate != null ? Date.valueOfGmt(ProgramEndDate) : null;
       // newProgram.Program_Time__c = ProgramTime != null ? time.valueOfGmt(ProgramTime) : null;
        // newEvent.IsAllDayEvent = eventMap.get('start') != null ? eventMap.get('start') : null;
        insert newProgram;

        return newProgram.Id;

    }

    /**
     * @description To delete an event from web component 
     * @param eventid - event id to delete from the component
     */
    @AuraEnabled
    public static void deleteProgram(Id programid) {
        
        if(programid != null){
            delete [SELECT Id FROM Program__c Where Id=:programid];
        }else{
           // throw new EventException('Program id is not passed');
        }

    }
}