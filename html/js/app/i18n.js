var i18n = {
  "en": {

    "#settings-template": {
      "title": "Settings",
      "show_notifications": "Show notifications?:"
    },

    "#nothing-to-see-template": {
      "title": "There is nothing to see"
    },

    "#pull-request-template": {
      "sent_a_pull_request": "Sent a pull request to",
      "diff_files": "Diff files",
      "merge": "Merge pull request",
      "cancel": "Cancel",
      "confirm": "Confirm Merge"
    },

    "#login-template": {
      "get_token": "Get Token"
    },

    "#menu-template": {
      "watching"      : "Watching",
      "notifications" : "Notifications",
      "pull_requests" : "Pull Requests",
      "public_events" : "Public Events",
      "settings"      : "Settings",
      "quit"          : "Quit"
    },

    "#fork-event-template": {
      "forked": "forked",
      "to"    : "to"
    },

    "#download-event-template": {
      "created_download": "created download",
      "from": "from"
    },

    "#team-add-event-template": {
      "added": function(user, repo, team) {
        var output = "";

        if(!!user) output += "user " + user.login;
        if(!!repo) output += "repository" + repo.name;

        output += " to team ";
        output += '<a href="' + team.url +  '">';
        output += '<span class="repo_name">' + team.name + '</span>';
        output += '</a>';

        return output;
      }
    },

    "#public-event-template": {
      "open_sourced": "open sourced"
    },

    "#watch-event-template": {
      "starred": "starred"
    },

    "#delete-event-template": {
      "deleted": function(type, reference, url, repo) {
        var output = "&#160; deleted " + type + " " + reference + " from ";
        output += '<a href="' + url + '">';
        output += '<span class="issue">' + repo.name + '</span>';
        output += '</a>';

        return output;
      }
    }
  }
};
