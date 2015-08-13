Template.proposal_form.helpers({
  hasData: function(data) {
    var session = Session.get(data)
    if (session && session != "") {
      return true;
    }
  },
  isFilled: function(input) {
    if (input && input != "") {
      return true
    }
  },
  allFilled: function() {
    if (Session.get('clientName') && Session.get('clientEmail') && Session.get('projectType') && Session.get('budget') && Session.get('projectDescription')) {
      console.log("Truth")
      return true;
    }
  },
  isEmail: function() {

  }
  name: function() {
    var name = Session.get('clientName');
    return name;
  },
  email: function() {
    var email = Session.get('email');
    return email;
  },
  project: function() {
    var project = Session.get('projectType');
    return project;
  },
  budget: function() {
    var budget = Session.get('budget');
    return budget;
  }
});

Template.proposal_form.events({
  'keyup #clientName': function(event) {
    Session.set('clientName', $("#clientName").val());
  },
  'keyup #clientEmail': function(event) {
    Session.set('clientEmail', $("#clientEmail").val());
  },
  'click input:checkbox': function(event) {
    var checkedValues = $('input:checkbox:checked').map(function() {
      return this.value;
    }).get();
    Session.set('projectType', checkedValues)
  },
  'click input:radio': function(event) {
    var budget = $('input:radio:checked').val();
    Session.set('budget', budget)
  },
  'keyup #projectDescription': function(event) {
    Session.set('projectDescription', $("#projectDescription").val());
  },
  'click #send-email-button': function(event) {
    event.preventDefault();
    var contactForm = $(event.currentTarget),
      fname = Session.get('clientName'),
      email = Session.get('clientEmail'),
      type = Session.get("projectType"),
      budget = Session.get("budget"),
      summary = Session.get('projectDescription');
    var isFilled = function(input) {
      if (input && input != "") {
        return true
      }
    }
    if (isFilled(fname) && isFilled(email) && isFilled(type) && isFilled(budget) && isFilled(projectDescription)) {
      var email = {
        to: 'cole@twnsnd.co',
        from: email,
        subject: "Proposal Lead: " + fname + " wants to do " + type + " for " + budget,
        text: "Hey Cole, you have a new freelance lead. " + fname + " wants to do " + type + " for " + budget + ". SUMMARY: " + summary,
      };
      Meteor.call('sendEmail', email.to, email.from, email.subject, email.text);
      alert("Sending!");
    } else {
      alert("Error!");
      return false;
    }
  }
});