pragma solidity ^0.4.0;
import "./Log.sol";

contract DataObject {
    string public id;
    address[] public logList;

    function DataObject(string mongoID) public{
        id = mongoID;
    }
    
    function addEvent(address __address) public returns (address newlog) {
        logList.push(__address);
        return __address;
    }
    
    function getLogList() public returns (address[] list) {
        return logList;
    }
}


