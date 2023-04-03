public with sharing class AccountOppoController {
    // @AuraEnabled( cacheable = true )  
    // public static List< Account > fetchAccounts( String searchKey ) {  
      
    //     String strKey = '%' + searchKey + '%';  
    //     System.debug( 'strKey is ' + strKey );
    //     return [
    //         SELECT Id, Name, Industry,
    //         ( SELECT Id, FirstName, LastName FROM Contacts ),
    //         ( SELECT Id, Name, Stagename FROM Opportunities )
    //         FROM Account
    //         WHERE Name LIKE: strKey LIMIT 10
    //     ];  
          
    // }
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccountAndRelatedContacts(String searchKey) {
        // Query the accounts and their related contacts based on the search key
        List<Account> accounts = [SELECT Id, Name, Phone, AccountNumber, 
                                  (SELECT Id, FirstName, LastName FROM Contacts) 
                                  FROM Account 
                                  WHERE Name LIKE :searchKey+'%' 
                                  ORDER BY Name ASC];
        return accounts;
    }
}