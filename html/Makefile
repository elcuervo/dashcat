jsdir = js/app

modules = ${jsdir}/base.js \
	  ${jsdir}/login/app.js \
	  ${jsdir}/login/views/login.js \
	  ${jsdir}/main/collections/dashcat_collection.js \
	  ${jsdir}/main/models/notification.js \
	  ${jsdir}/main/models/user.js \
	  ${jsdir}/main/models/pull_request.js \
	  ${jsdir}/main/models/event.js \
	  ${jsdir}/main/views/nothing_to_see.js \
	  ${jsdir}/main/collections/pull_requests.js \
	  ${jsdir}/main/collections/dashcat_events_collection.js \
	  ${jsdir}/main/collections/events.js \
	  ${jsdir}/main/collections/notifications.js \
	  ${jsdir}/main/collections/public_events.js \
	  ${jsdir}/main/views/loading_screen.js \
	  ${jsdir}/main/views/base_item_view.js \
	  ${jsdir}/main/views/head_tail_auto_refresh.js \
	  ${jsdir}/main/views/notification.js \
	  ${jsdir}/main/views/notifications.js \
	  ${jsdir}/main/views/diff_viewer.js \
	  ${jsdir}/main/views/pull_request.js \
	  ${jsdir}/main/views/pull_requests.js \
	  ${jsdir}/main/views/menu.js \
	  ${jsdir}/main/views/event.js \
	  ${jsdir}/main/views/events.js \
	  ${jsdir}/main/app.js \
	  ${jsdir}/init.js

app.js: ${modules}
	cat $^ | yuicompressor --type js -o js/$@

clean:
	rm js/app.js
