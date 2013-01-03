appdir = js/app

libs = js/libs/moment.min.js \
       js/libs/jquery.js \
       js/libs/marked.js \
       js/libs/diffy.js \
       js/libs/iscroll.js \
       js/libs/underscore.js \
       js/libs/backbone.js \
       js/libs/backbone.marionette.js \
       js/libs/backbone.infiniscroll.js

app = ${appdir}/base.js \
      ${appdir}/i18n.js \
      ${appdir}/login/app.js \
      ${appdir}/login/views/login.js \
      ${appdir}/main/collections/dashcat_collection.js \
      ${appdir}/main/models/notification.js \
      ${appdir}/main/models/user.js \
      ${appdir}/main/models/pull_request.js \
      ${appdir}/main/models/event.js \
      ${appdir}/main/collections/pull_requests.js \
      ${appdir}/main/collections/dashcat_events_collection.js \
      ${appdir}/main/collections/events.js \
      ${appdir}/main/collections/notifications.js \
      ${appdir}/main/collections/public_events.js \
      ${appdir}/main/views/loading_screen.js \
      ${appdir}/main/views/base_item_view.js \
      ${appdir}/main/views/nothing_to_see.js \
      ${appdir}/main/views/basic_event_view.js \
      ${appdir}/main/views/head_tail_auto_refresh.js \
      ${appdir}/main/views/notification.js \
      ${appdir}/main/views/settings.js \
      ${appdir}/main/views/notifications.js \
      ${appdir}/main/views/diff_viewer.js \
      ${appdir}/main/views/pull_request.js \
      ${appdir}/main/views/pull_requests.js \
      ${appdir}/main/views/menu.js \
      ${appdir}/main/views/event.js \
      ${appdir}/main/views/events.js \
      ${appdir}/main/app.js \
      ${appdir}/init.js

libs.js: ${libs}
	cat $^ | yuicompressor --type js -o js/$@

app.js: ${app}
	cat $^ | yuicompressor --type js -o js/$@

all: libs.js app.js

clean:
	rm js/app.js
	rm js/libs.js
