public with sharing class AccountContactController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsAndContacts() {
        return [SELECT Id, Name, (SELECT Id, FirstName, LastName, Email FROM Contacts) FROM Account];
    }
}