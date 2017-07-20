import Ember from 'ember';

var currentUser = Ember.Object.create({
	name: 'defaultUser',
	totalFunds:0,
	cashAdvance:0,
	history:[]
});//object to represent current user in default/initial state

export default Ember.Route.extend({
	actions: {
		update(){
			//get all relevant info from form submit and currentUser
			var fixedRate=10; 

			var depositAmount=parseFloat($("#depositAmount").val());
			var withdrawlAmount=parseFloat($("#withdrawlAmount").val());
			var cashAdvance=parseFloat($("#cashAdvance").val());

			var currentFunds=parseFloat(currentUser.get('totalFunds'));
			var currentAdvance=parseFloat(currentUser.get('cashAdvance'));
			var hist=currentUser.get('history');

			//calcualte currentUser fields based on input data
			var funds=currentFunds+depositAmount-withdrawlAmount+cashAdvance;
        	if(cashAdvance!=0) funds=funds-fixedRate;
        	if(funds<0) {
        		$("#noFunds").show();
        		return false;
        	}
        	var advance=currentAdvance+cashAdvance;
        	hist.push({submissionNum:hist.length+1,
        			   deposited:depositAmount,
        			   withdrawn:withdrawlAmount,
        			   advance:cashAdvance,
        			   total:funds.toFixed(2)});
        	
        	//update fields
        	currentUser.set('totalFunds',funds.toFixed(2));
        	currentUser.set('cashAdvance',advance.toFixed(2));
        	currentUser.set('history',hist.toArray()); 
        	
        	//display success message
        	$("#success").show(); 
		},
	    toggleAccount() {//toggles visibility of account div
	    	$("#accountDetails").toggle();
	    },
	    toggleHistory() {//toggles visibility of transaction history div
	    	$("#history").toggle();
	    }
	},
	model(){
		return currentUser;
	}
});