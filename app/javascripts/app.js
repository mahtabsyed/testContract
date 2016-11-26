var accounts;
var account;


function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};


function refreshBalance() {
  var fc = FirstContract.deployed();
  console.log("FirstContract Address:" + FirstContract.deployed().address);

/* 
// Works well
// Get Balance of Owner
fc.getBalanceOwner.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
     balance_element.innerHTML = web3.fromWei(value.valueOf(),"ether");
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
  */


// Get Balance of Owner
  fc.getBalanceOwner.call().then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = web3.fromWei(value.valueOf(),"ether");
    console.log("Balance of Owner is " + balance_element.innerHTML)
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });


// Get Balance of Receiver A
var receiverAAddress = document.getElementById("receiverAAddress").value;
console.log("receiverAAddress: "+ receiverAAddress);

fc.getBalanceGuest.call(receiverAAddress).then(function(value) {
    var receiverABalance = document.getElementById("receiverABalance");
    receiverABalance.innerHTML = web3.fromWei(value.valueOf(),"ether");
    console.log("Balance of ReceiverA is " + receiverABalance.innerHTML)
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });


// Get Balance of Receiver B
var receiverBAddress = document.getElementById("receiverBAddress").value;
console.log("receiverBAddress: "+ receiverAAddress);

fc.getBalanceGuest.call(receiverBAddress).then(function(value) {
    var receiverBBalance = document.getElementById("receiverBBalance");
    receiverBBalance.innerHTML = web3.fromWei(value.valueOf(),"ether");
    console.log("Balance of ReceiverB is " + receiverBBalance.innerHTML)
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
   
}


function splitSend() {
  var fc = FirstContract.deployed();
  var amount = document.getElementById("amount").value;
  var receiverAAddress = document.getElementById("receiverAAddress").value;
  var receiverBAddress = document.getElementById("receiverBAddress").value;
  
  // TODO - call fc.splitSend with right arguments 
  // fc.splitSend(amount, receiverAAddress, receiverBAddress)
  refreshBalance();
};



window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

    refreshBalance();
  });
}
