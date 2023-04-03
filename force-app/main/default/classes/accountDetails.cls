public with sharing class accountDetails {
   /*
        @AuraEnabled(cacheable=true)
        public static List<Account> fetchEvents() {
            return [SELECT Id, Name, Industry FROM Account];
        }
*/
@AuraEnabled(cacheable=true)
public static List<Account>  getAccountList(){
    return [SELECT Id, Name,Phone,Industry FROM Account order by createddate desc LIMIT 5];
}
    
}