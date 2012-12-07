$(function() {
  if(!DashCat.isAuthorized()) {
    DashCat.Login.start();
  } else {
    DashCat.Main.start();
  }
});
