public with sharing class AccountController1 {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        List<Account> accounts = [SELECT Id, Name, Phone, BillingCity, BillingCountry
                                  FROM Account];
        return accounts;
    }

    @AuraEnabled
    public static Account createAccount(Account account) {
        insert account;
        return account;
    }
}