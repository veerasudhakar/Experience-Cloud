public with sharing class CummintyClass {
    @AuraEnabled(cacheable=true)
    public static List<Program__c> getDetailsByTypewithOther()
    {
        return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course__c from Program__c WHERE Course__c='Salesforce'];
    }

    @AuraEnabled(cacheable=true)
    public static List<Program__c> getDetailsByTypewithCustomer()
    {
        return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course__c from Program__c WHERE Course__c='Python'];
    }

        @AuraEnabled(cacheable=true)
    public static List<Program__c> getDetailsByTypewithProspect()
    {
        return [Select id,Name,Program_Type__c,Program_Date__c,Program_End_Date__c,Course__c from Program__c WHERE Course__c='Java'];
    }
}