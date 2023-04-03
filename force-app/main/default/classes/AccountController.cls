public with sharing class AccountController {
    @AuraEnabled
    public static List<Account> getPendingAccounts() {
        return [SELECT Id,Name, AccountNumber,IsDocumentComplete__c from Account];
    }
}