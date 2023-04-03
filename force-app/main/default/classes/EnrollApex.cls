public with sharing class EnrollApex {
    //@AuraEnabled
    // Public static List<Enroll_Course__c> fetchEnroll (){
    //     return [SELECT Id, Name, Program__c,Contact__c, Email__c FROM Enroll_Course__c];
        
    // }
    @AuraEnabled(cacheable=true)
    public static List<Enroll_Course__c> getEnrolls() {
        List<Enroll_Course__c> enrolls = [SELECT Id, Name, Program__c,Contact__c, Email__c,Status__c FROM Enroll_Course__c];
                                 
        return enrolls;
    }
    @AuraEnabled
    public static void createEnroll(Enroll_Course__c Enroll) {
        insert Enroll;
    }
    // @AuraEnabled
    // public static Account createAccount(Account account) {
    //     insert account;
    //     return account;
    // }
    // @AuraEnabled
    // public static Id createEvent(String event){
        
    //     //The following logic to be replaced with your respective event object
    //     if(String.isBlank(event)){
    //         return null;
    //     }
    //     Map<String, Object> eventMap = (Map<String, Object>) JSON.deserializeUntyped(event);
        
    //     Enroll_Course__c course = new Enroll_Course__c();
    //     //newEvent.Name = eventMap.get('title') != null ? (String)eventMap.get('title') : null;
    //     course.Email__c = eventMap.get('Email__c') != null ? (String)eventMap.get('Email__c') : null;
    //     //course.Name = eventMap.get('Name') != null ? (String)eventMap.get('Name') : null;
    //     course.Program__c = eventMap.get('Program__c') != null ? (String)eventMap.get('Program__c') : null;
    //     course.Contact__c = eventMap.get('Contact__c') != null ? (String)eventMap.get('Contact__c') : null;
    //     insert course;
    //     system.debug('course'+course);
    //     return course.Id;
        
    // }
}