var mcgg = {};
// 2.5 Minutes
var refreshInterval = 150000;

mcgg.init = function() {
	// mcgg.extaLifePlayers();

	mcgg.extraLifeTeamWidget(29888);
	setInterval(mcgg.extraLifeTeamWidget(29888), refreshInterval);
};

mcgg.extraLifeTeamWidget = function(teamID) {
	$.ajax({
		url: "http://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=" + teamID + "&format=json"
	}).done(function(data) {
		console.log(data);
		var container = $(".js-extralife"),
				percentage = data.totalRaisedAmount / data.fundraisingGoal * 100;
				team = "<div class='extralife-brands'><span class='extralife-team'>Team: " + data.name + "</span><span class='extralife-and'>+</span><span class='extralife-extralife'></span></div>";
				raised = "<span class='extralife-raised'>Raised: $" + data.totalRaisedAmount + "</span>",
				bar = "<span class='extralife-bar'><span class='extralife-bar-inner' style='width:" + percentage + "%;'></span></span>";
				goal = "<span class='extralife-goal'>Our Goal: $" + data.fundraisingGoal + "</span>",
				template = team + raised + bar + goal;

		container.html("");
		container.append(template);
	});
};

mcgg.extaLifePlayers = function() {
	players = [224886, 232519, 238556, 218911, 232437, 230505, 233384, 234193, 238073];

	$.each(players, function(index, value) {
	  mcgg.extraLifePlayerWidget(value);
	});
}

mcgg.extraLifePlayerWidget = function(participantID) {
	$.ajax({
		url: "http://www.extra-life.org/index.cfm?fuseaction=donorDrive.participant&participantID=" + participantID + "&format=json"
	}).done(function(data) {
		console.log(data);
		var preWrapper = "<div class='extralifeplayer extralifeplayer-" + participantID + "'></div>",
				avatar = "<span class='extralifeplayer-avatar'><img src='http:" + data.avatarImageURL + "'/></span>",
				team = "<span class='extralifeplayer-name'>" + data.displayName + "</span>",
				raised = "<span class='extralifeplayer-raised'>Raised: $" + data.totalRaisedAmount + "</span>",
				goal = "<span class='extralifeplayer-goal'>Goal: $" + data.fundraisingGoal + "</span>",
				template = avatar + team + raised + goal;

		$(".js-extralifeplayers").append(preWrapper);
		$(".extralifeplayer-" + participantID).html("").append(template);

		setInterval(function(){
			$(".extralifeplayer-" + participantID).html("").append(template);
		}, refreshInterval);
	});
};

$(function() { mcgg.init(); });
