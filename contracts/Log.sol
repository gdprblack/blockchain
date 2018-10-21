pragma solidity ^0.4.0;

contract Log {
    
    enum logType {DataEncrypted, AccessRequest, AccessSigned, AccessAttemptSuccess, AccessAttemptFail, MinSignatureAchieved}
    logType public _type;
    uint public timestamp;
    string public user;
    string public metadata;
    
    function Log(uint __type, uint __timestamp, string __user, string __metadata) {
        _type = logType(__type);
        timestamp = __timestamp;
        user = __user;
        metadata = __metadata;
    }
    
    function getType() returns (logType){
        return _type;
    }
    
    function getUser() returns (string){
        return user;
    }
    
    function getTimestamp() returns (uint){
        return timestamp;
    }
    
    function getMetadata() returns (string){
        return metadata;
    }
}
