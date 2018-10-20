pragma solidity ^0.4.0;

contract DataObject {
    string public id;
    enum eventType {DataEncrypted, AccessRequest, AccessSigned, AccessAttemptSuccess, AccessAttemptFail, MinSignatureAchieved}
    struct Event {
        uint timestamp;
        string User;
        eventType t;
        string metadata;
    }
    Event[] public eventList;
    event EventAdded(uint indexed _type, string indexed _user);
    
    function DataObject(string mongoID) public{
        id = mongoID;
    }
    
    function addEvent(uint timestamp, string user, uint tpe, string meta) {
        eventList.push(Event(timestamp, user, eventType(tpe), meta));
        EventAdded(tpe, user);
    }
}