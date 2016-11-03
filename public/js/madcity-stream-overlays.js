var mcgg = {};

mcgg.init = function() {
	mcgg.extraLifeWidget();
	// setInterval(mcgg.extraLifeWidget, 2000);
};

mcgg.extraLifeWidget = function() {
	$.ajax({
		url: "http://www.extra-life.org/index.cfm?fuseaction=donorDrive.team&teamID=29888&format=json"
	}).done(function(data) {
		console.log(data);
		var container = $(".js-extralife"),
				team = "<span class='extralife-team'>Team: " + data.name + "</span>",
				raised = "<span class='extralife-raised'>Raised: " + data.totalRaisedAmount + "</span>",
				goal = "<span class='extralife-goal'>Our Goal: " + data.fundraisingGoal + "</span>";
		
		container.html("");
		container.append(team);
		container.append(raised);
		container.append(goal);
	});
};

$(function() { mcgg.init(); });
