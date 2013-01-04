i18n["en"] = {
  "name": "English",

  "#settings-template": {
    "title": "Settings",
    "show_notifications": "Show notifications?",
    "choose_language": "Select your language"
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
  },

  "#commit-comment-event-template": {
    "commented": function(comment, repo, body, sha) {
      var output = 'commented commit';
      output    += '<a href="' + comment.html_url + '">';
      output    += '<span class="commit">' + sha + '</span>';
      output    += '</a>';
      output    += 'on';
      output    += repo.name;
      output    += '<blockquote>' + body + '</blockquote>';

      return output;
    }
  },

  "#pull-request-review-comment-event-template": {
    "commented": function(repo, comment) {
      var output = 'commented on pull request';
      output += '<a href="' + comment._links.html.href + '">';
      output += '<span class="issue">';
      output += repo.name + '#' + comment._links.pull_request.href.split("/")[-1];
      output += '</span>';
      output += '</a>';
      output += '<blockquote>' + comment.body + '</blockquote>';

      return output;
    }
  },

  "#gollum-event-template": {
    "edited": "Edited Wiki"
  },

  "#create-event-template": {
    "created": "Created "
  },

  "#follow-event-template": {
    "started_following": "started following"
  },

  "#pull-request-event-template": {
    "action_title": function(action) {
      return (action || "sent") + " a Pull Request";
    },
    "commits": "Commits",
    "additions": "Additions",
    "deletions": "Deletions"
  },

  "#issue-comment-event-template": {
    "commented": "Commented on"
  },

  "#push-event-template": {
    "pushed": function(branch, url, repo) {
      var output = 'pushed to ';
      output += '<span class="ref">' + branch + '</span>';
      output += ' at ';
      output += '<a href="' + url + '"><span class="repo_name"> ' + repo.name + '</span></a>';

      return output;
    }
  }
}
