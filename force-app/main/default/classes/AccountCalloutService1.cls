public with sharing class AccountCalloutService1 {
    public static Http http = new Http();
    public static HTTPResponse response;
    public static HttpRequest request;
 
    public class NewAccountRequestWrapper {
        @AuraEnabled public String firstName {get; set;}
        @AuraEnabled public String lastName {get; set;}
        @AuraEnabled public String email {get; set;}
        @AuraEnabled public String phone {get; set;}
    }

    @AuraEnabled (cacheable=true)
    public static List<Account> searchAccounts(String keySearch){
        String strAccName = keySearch + '%';
        List<Account> accList = [SELECT Id, Name, Type, Phone, Industry, Website FROM Account WHERE Name LIKE: strAccName];        
        return accList;
    }    
    
    @AuraEnabled (cacheable=true)
    public static List<Contact> getAccountAndRelatedContacts(String accountId) {
        
        List<Contact> allConList = new List<Contact>();
        request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint('callout:Org2API/services/apexrest/v1/Contacts/' + accountId);
        request.setTimeout(120000);
            
        response = http.send(request); 
        System.debug('=='+response.getBody());
        List<Contact> conList = (List<Contact>)JSON.deserialize(response.getBody(), List<Contact>.class);            
        allConList.addAll(conList);
        return allConList;     
    }
}