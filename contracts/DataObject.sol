pragma solidity ^0.4.0;
import "./Log.sol"
contract DataObject {
    string public id;
    address[] public logList;

    function DataObject(string mongoID) public{
        id = mongoID;
    }
    
    function addEvent(uint timestamp, string user, uint tpe, string meta) {
        address log = new Log(tpe, timestamp, user, meta);
        logList.push(log);
    }
}



