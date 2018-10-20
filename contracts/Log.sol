pragma solidity ^0.4.0;

contract Log {
    
    enum logType {DataEncrypted, AccessRequest, AccessSigned, AccessAttemptSuccess, AccessAttemptFail, MinSignatureAchieved}
    logType public _type;
    uint public timestamp;
    string public user;
    string public metadata;
    
    function Log(uint __type, uint __timestamp, string __user, string __metadata) {
        _type = logType(__type);
        user = __user;
        metadata = __metadata;
    }
}