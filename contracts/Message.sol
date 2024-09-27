// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.27;

contract Message {
    address public owner;

    string public message;

    constructor() {
        owner = msg.sender;
    }

    event MessgaeSet(address setter, string message);
    event OwnershipTransfered(address previousOwner, address newOwner);

    function setMessage(string calldata _message) public {
        require(msg.sender != address(0), "You can't set your own message");
        require(msg.sender == owner, "You are not the owner");
        message = _message;

        emit MessgaeSet(msg.sender, message);
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function transferOwnership(address _newOwner) public {
        require(msg.sender == owner, "You are not the owner");
        require(
            _newOwner != address(0),
            "You can't transfer ownership to zero"
        );

        emit OwnershipTransfered(owner, _newOwner);

        owner = _newOwner;
    }
}

// view reading from the state
