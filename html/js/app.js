var DashCat=new Backbone.Marionette.Application({isAuthorized:function(){return !!this.token},logout:function(){return localStorage.removeItem("oauth_token")}});DashCat.clientId="*********";DashCat.secret="********************";DashCat.__defineGetter__("token",function(){return localStorage.getItem("oauth_token")});DashCat.__defineSetter__("token",function(a){return localStorage.setItem("oauth_token",a)});DashCat.settings=function(a){switch(true){case typeof a=="object":_.extend(DashCat.configuration,a);break;case typeof a=="string":return DashCat.configuration[a];break}localStorage.setItem("configuration",JSON.stringify(DashCat.configuration))};var settings=localStorage.getItem("settings");DashCat.configuration=settings&&JSON.parse(settings)||{notificate:true};marked.setOptions({gfm:true,pedantic:false,sanitize:true});DashCat.start();var Login=DashCat.module("Login",{startWithParent:false,define:function(){var a=new Backbone.Marionette.Application();$(document).ajaxStart(function(){$("#octocat").addClass("big_glowing")});$(document).ajaxStop(function(){$("#octocat").removeClass("big_glowing")});$("#container").hide();this.addInitializer(function(){a.addRegions({main:"#login"});a.addInitializer(function(){var b=new LoginView();a.main.show(b)});a.start()});this.addFinalizer(function(){a.main.close()})}});var LoginView=Backbone.Marionette.ItemView.extend({template:"#login-template",id:"login_menu",events:{"submit form":"getAuthorizations"},onRender:function(){$("#username").focus()},loadMainView:function(a){DashCat.token=a;DashCat.Login.stop();DashCat.Main.start()},getAuthorizations:function(c){var d=this.$("#username").val();var b=this.$("#password").val();var a=this;if(!d||!b){return this.badAuth()}$.ajax({url:"https://api.github.com/authorizations",headers:{Authorization:"Basic "+btoa(d+":"+b)},success:function(e){var f=_.filter(e,function(g){return g.app.name=="Dashcat"});if(_.isEmpty(f)){a.requestToken(d,b)}else{a.loadMainView(_.first(f).token)}},error:function(e){if(e.status==401){a.badAuth()}else{console.error(arguments)}}});return false},badAuth:function(){this.$el.find(".fail-message").text("Bad username/password");return false},requestToken:function(c,b){var a=this;$.ajax({url:"https://api.github.com/authorizations",type:"POST",headers:{Authorization:"Basic "+btoa(c+":"+b)},data:JSON.stringify({scopes:"repo",client_id:DashCat.clientId,client_secret:DashCat.secret}),success:function(d){a.loadMainView(d.token)}});return false}});var DashCatCollection=Backbone.Collection.extend({initialize:function(a){this.options=a;this.loading=$.Deferred();if(!!this.afterInitialize){this.afterInitialize.call(this)}this.fetcher=this.fetch({cache:false})},whenAll:function(a){return jQuery.when.apply(jQuery,a).pipe(function(){return Array.prototype.slice.call(arguments)})},});var Notification=Backbone.Model.extend({});var User=Backbone.Model.extend({url:"https://api.github.com/user"});var PullRequest=Backbone.Model.extend({});var Event=Backbone.Model.extend({});var NothingToSeeView=Backbone.Marionette.ItemView.extend({template:"#nothing-to-see-template"});var PullRequestsCollection=DashCatCollection.extend({model:PullRequest,url:"https://api.github.com/issues?filter=all",add:function(e,b){var d=_.select(e,function(f){return f.pull_request&&f.pull_request.diff_url});var c=[];var a=[];_.each(d,function(f){var h=f.repository.url+"/pulls/"+f.number;var g=$.ajax({url:h,success:function(i){f.pull_info=i;if(i.merged){a.push(f)}}});c.push(g)});this.whenAll(c).then(_.bind(function(){var f=_.without(d,a);Backbone.Collection.prototype.add.call(this,f,b);this.loading.resolve()},this))}});var DashCatEventsCollection=DashCatCollection.extend({model:Event});var EventsCollection=DashCatEventsCollection.extend({afterInitialize:function(){this.url="https://api.github.com/users/"+this.options.user+"/received_events"}});var NotificationsCollection=DashCatEventsCollection.extend({model:Notification,url:"https://api.github.com/notifications",add:function(c,a){var b=[];_.each(c,function(e){var d=e.subject.url;var f=$.ajax({url:d,success:function(g){e.payload=g}});b.push(f)});this.whenAll(b).then(_.bind(function(){Backbone.Collection.prototype.add.call(this,c,a);this.loading.resolve()},this))}});var PublicEventsCollection=DashCatEventsCollection.extend({url:"https://api.github.com/events"});var LoadingScreen=Backbone.Marionette.ItemView.extend({id:"loading",template:"#loading-template"});var BaseItemView=Backbone.Marionette.ItemView.extend({emptyView:NothingToSeeView,events:{"click a":"openBrowser"},openBrowser:function(a){if(macgap){a.preventDefault();macgap.app.open(a.currentTarget.href)}},templateHelpers:function(){var a=this.model;var d=function(){var e=a.get("repository")&&a.get("repository")["private"];if(!!a.get("public")||!e){return"public-action"}else{return"private-action"}};var c={time:function(e){return moment(e).fromNow()},creationTag:function(e){return'<span class="created_at" data-time="'+e+'">'+this.time(e)+"</span>"},sha:function(e){return e.substr(0,7)},cleanUrl:function(e){return e.replace("api.","").replace("/repos","")},visibilityClass:d()};if(this.helpers){var b=typeof this.helpers=="function"?this.helpers():this.helpers;_.extend(c,b)}return c}});var BasicEventView=BaseItemView.extend({tagName:"li",initialize:function(){var a=this.type().match(/[A-Z][a-z]+/g).join("-").toLowerCase();this.template="#"+a+"-template";if(!$(this.template).length){this.template="#not-implemented-event-template"}},helpers:function(){var a=this.type().match(/[A-Z][a-z]+/g);var c=a.slice(0,-1).join("-").toLowerCase();var b={eventName:a,eventClass:c};return _.extend(b,this.viewHelpers()||{})}});var Helpers={PushEvent:{branch:function(){var a=this.payload.ref.split("/");return a.pop()}},GistEvent:{action:function(a){return a+"d"}}};var HeadTailAutoRefresh=Backbone.Marionette.CollectionView.extend({tagName:"ol",emptyView:NothingToSeeView,initialize:function(){setInterval(_.bind(this.refreshAndAppendCollection,this),5000)},updateTime:function(){var a=this.$el.find("[data-time]");_.each(a,function(b){var c=$(b);var d=c.data("time");c.html(moment(d).fromNow())})},refreshAndAppendCollection:function(b){var b=b||function(){};var a=this;this.collection.fetch({add:true,success:function(){a.updateTime();b.call(this)},metadata:{prepend:true,}})},appendHtml:function(b,e,d){var c=e.model;var a=b.$el;if(c.metadata&&c.metadata.prepend){a.prepend(e.el);if(e.notificationContent){var f=e.notificationContent();this.notify(f)}}else{a.append(e.el)}},notify:function(a){if(DashCat.settings("notificate")&&typeof macgap!="undefined"){macgap.growl.notify({title:a.title,content:a.content})}else{console.log(a)}},onShow:function(){var a=this;if(navigator.userAgent.match(/(iPod|iPhone|iPad)/)){$("#content").css({height:"100%"})}new iScroll("content",{onScrollMove:function(){if(this.y>20){$("#pull").fadeIn();if(this.y>50){this.refresh=true}}else{$("#pull").fadeOut()}},refresh:function(){},onScrollEnd:function(){if(this.refresh){a.refreshAndAppendCollection(function(){$("#placeholder").fadeOut(function(){$("#placeholder").remove()})});a.refreshPlaceholder();this.refresh=false}$("#pull").fadeOut()}});document.addEventListener("touchmove",function(b){b.preventDefault()},false)},refreshPlaceholder:function(){this.$el.prepend($("#loader-template").html())},onRender:function(){new Backbone.InfiniScroll(this.collection,{includePage:true,add:true})}});var NotificationView=BasicEventView.extend({type:function(){var a=this.model.get("subject").type;if(a=="Issue"){a="IssueCommentEvent"}return a},viewHelpers:function(){var b={user:this.model.get("payload").user,actor:this.model.get("payload").user,created_at:this.model.get("updated_at"),repo:this.model.get("repository")};var a=this.model.get("subject").type;if(ExtraHelpers[a]){_.extend(b,ExtraHelpers[a])}return b}});var ExtraHelpers={};var SettingsView=Backbone.Marionette.ItemView.extend({template:"#settings-template",events:{"change #notifications":"toggleNotifications"},templateHelpers:function(){return{notificate:!!DashCat.settings("notificate")}},toggleNotifications:function(a){var b=a.target;DashCat.settings({notificate:b.checked})}});var NotificationsView=HeadTailAutoRefresh.extend({id:"notifications",template:"#notifications-template",getItemView:function(a){switch(a.get("subject").type){case"PullRequest":return PullRequestView;default:return NotificationView}},});var DiffViewer=Backbone.Marionette.ItemView.extend({template:"#diff-viewer-template",events:{"click button.back":"back"},initialize:function(a){this.content=a.diffContent},back:function(){DashCat.Main.app.content.show(DashCat.Main.app.previousView);return false},templateHelpers:function(){return{diffy:_.pairs(new Diffy(this.content)),content:this.content}}});var PullRequestView=BaseItemView.extend({tagName:"li",template:"#pull-request-template",ui:{mergeable:".mergeable",commit:".commit_merge",message:".commit_message"},events:{"click .diff_it":"loadDiff","click .merge_it":"loadCommitBox","click .cancel_merge":"cancelMerge","submit #merge_commit":"mergeCommit"},helpers:function(){var e=this.info=this.model.get("pull_info")||this.model.get("payload");var c=this.model.get("user")||e.user;var d=this.model.get("number")||e.number;var f=this.model.get("title")||e.title;var a=this.model.get("body")||e.body;var b=this.model.get("mergeable")||e.mergeable;return{user:c,html_url:e.html_url,number:d,body:a,mergeable:b,title:f,mergeState:"state-"+e.mergeable_state}},loadDiff:function(){var a=this.info.url;var b=$.ajax({url:a,cache:false,headers:{Accept:"application/vnd.github.diff"}});DashCat.Main.app.showLoadingScreen();b.done(function(c){var d=new DiffViewer({diffContent:c});DashCat.Main.app.content.show(d)})},loadCommitBox:function(){this.ui.mergeable.hide();this.ui.commit.show();this.ui.commit.find(".commit_message").focus();return false},cancelMerge:function(){this.ui.mergeable.show();this.ui.commit.hide();return false},mergeCommit:function(c){c.preventDefault();var b=this.info.url+"/merge";var a=this.ui.message.val();var d=$.ajax({type:"PUT",url:b,data:JSON.stringify({commit_message:a})});d.done(_.bind(function(e){this.close()},this))},notificationContent:function(){var b=this.info=this.model.get("pull_info")||this.model.get("payload");var c=this.model.get("title")||b.title;var a=this.model.get("body")||b.body;return{title:c,content:a}}});var PullRequestsView=HeadTailAutoRefresh.extend({id:"pull-requests",itemView:PullRequestView,template:"#pull-requests-template"});var MenuView=Backbone.Marionette.ItemView.extend({template:"#menu-template",events:{"click #privateEvents":"privateEvents","click #publicEvents":"publicEvents","click #notificationsEvents":"notificationsEvents","click #pullRequests":"pullRequests","click #settings":"settings","click #quit":"exit"},initialize:function(){this.app=DashCat.Main.app},notificationsEvents:function(){this.activate("#notificationsEvents",this.app.notificationsCollection,this.app.notificationsCollection.loading,this.app.notificationsView)},privateEvents:function(){this.activate("#privateEvents",this.app.eventsCollection,this.app.eventsCollection.fetcher,this.app.eventsView)},pullRequests:function(){this.activate("#pullRequests",this.app.pullRequestsCollection,this.app.pullRequestsCollection.loading,this.app.pullRequestsView);this.app.pullRequestsCollection.on("add",function(a,b){})},publicEvents:function(){this.activate("#publicEvents",this.app.publicEventsCollection,this.app.publicEventsCollection.fetcher,this.app.publicEventsView)},settings:function(){var a="#settings";if(this.isSelected(a)){$(window).scrollTop(0);return}this.select(a);this.app.content.show(Main.app.settingsView)},onRender:function(){this.privateEvents()},activate:function(d,c,b,a){if(this.isSelected(d)){$(window).scrollTop(0);return}this.select(d);if(c.isEmpty()){this.app.showLoadingScreen()}b.done(_.bind(function(){this.makeVisible(a)},this))},makeVisible:function(a){this.app.content.show(a);this.app.previousView=a},isSelected:function(a){return this.$(a).find(".menu-icon.selected").length>0},select:function(a){this.$(".menu-icon").removeClass("selected");this.$(a).find(".menu-icon").addClass("selected")},exit:function(){DashCat.Main.stop();DashCat.logout();DashCat.Login.start()}});var EventView=BasicEventView.extend({type:function(){return this.model.get("type")},viewHelpers:function(){var a={visibilityClass:this.model.get("public")?"public-action":"private-action",};if(Helpers[this.model.get("type")]){_.extend(a,Helpers[this.model.get("type")])}return a}});var EventsView=HeadTailAutoRefresh.extend({id:"items",itemView:EventView,template:"#events-template"});var Main=DashCat.module("Main",{startWithParent:false,define:function(a){this.addInitializer(function(){a.app=new Backbone.Marionette.Application();$("#container").show();a.app.addRegions({menu:"#menu",content:"#content"});a.app.addInitializer(function(){DashCat.user=new User();var b=new MenuView({model:DashCat.user});this.loadingScreen=new LoadingScreen;this.showLoadingScreen=function(){this.content.show(this.loadingScreen)};this.showLoadingScreen();if(DashCat.token){$(document).ajaxError(function(c){if(c.status==401){b.exit()}else{console.error(arguments)}});$(document).ajaxStart(function(){$("#loader").show()});$(document).ajaxStop(function(){$("#loader").hide()});$.ajaxSetup({headers:{Authorization:"token "+DashCat.token,Accept:"application/vnd.github.v3.full+json"}})}DashCat.user.fetch({success:function(){a.app.notificationsCollection=new NotificationsCollection();a.app.eventsCollection=new EventsCollection({user:DashCat.user.get("login")});a.app.pullRequestsCollection=new PullRequestsCollection();a.app.publicEventsCollection=new PublicEventsCollection();a.app.notificationsCollection.on("change",function(c,d){if(typeof macgap!="undefined"){macgap.dock.badge=""+d.length}});a.app.notificationsView=new NotificationsView({collection:a.app.notificationsCollection});a.app.eventsView=new EventsView({collection:a.app.eventsCollection});a.app.pullRequestsView=new PullRequestsView({collection:a.app.pullRequestsCollection});a.app.publicEventsView=new EventsView({collection:a.app.publicEventsCollection});a.app.settingsView=new SettingsView();a.app.menu.show(b)}})});a.app.start()});this.addFinalizer(function(){$("#container").hide();DashCat.user=null;a.app.menu.close();a.app.content.close();if(typeof macgap!="undefined"){macgap.dock.badge=""}})}});$(function(){if(!DashCat.isAuthorized()){DashCat.Login.start()}else{DashCat.Main.start()}});
