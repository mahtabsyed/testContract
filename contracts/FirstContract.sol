pragma solidity ^0.4.2;

// This is just a simple FirstContract


contract FirstContract {
	
	address owner;

	function FirstContract() {
		// Sender of the message i.e. my primary external account
		owner = msg.sender;
	}

	function getBalanceOwner() returns(uint) {
		return owner.balance;
	}

    function getBalanceGuest(address guest) returns(uint) {
		if(guest == 0)
			throw;
		
		return guest.balance;		
	}

	event LogSplitSend(address indexed from, address indexed receiverA, address indexed receiverB, uint splitAmount);
	
	function splitSend(uint amount, address receiverA, address receiverB) payable returns(bool) {
		uint splitAmount = amount / 2;

		if(receiverA == 0 || receiverB == 0) throw;

		if (!receiverA.send(splitAmount) || !receiverB.send(splitAmount) )
			throw;

		LogSplitSend(owner, receiverA, receiverB, splitAmount);
		return true;
	}


}
