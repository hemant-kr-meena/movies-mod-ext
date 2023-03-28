function MoviesMod() {
  let _this = this;
  this.current_url = window.location;
  this.current_host = window.location.host;

  // Step - 1 Find  All Download Urls
  /*
  URL: https://modlinks.xyz/archives/33679
  */
  this.find_and_visit = (visit = false) => {
    const fast_server_btn = document.querySelector(
      ".maxbutton-fast-server-gdrive"
    );
    if (fast_server_btn) {
      var href = fast_server_btn.getAttribute("href");
      if (!href) {
        alert("href attribute not found.");
      }
      const params = href.split("id=");
      const id = params[params.length - 1];
      if (id && visit) {
        //replace other host with blog.maxsilo.in
        const url = "https://blog.maxsilo.in/?id=" + id;
        window.location = url;
        console.log(["Original: " + href, "Converted: " + url]);
      }
    }
  };

  // Step - 2 Submit Landing Page URL
  /*
  URL: https://blog.maxsilo.in/
  */
  this.landing_page = () => {
    const form = document.getElementById("landing");
    if (form) form.submit();
    else _this.error("Oops! landing page form not found.", "", form);
  };

  // Step - 3 Decode script & generate url
  /*
  URL: https://blog.maxsilo.in/*
  */
  this.decode_hashing = (go = false) => {
    console.log("Dehasing Step -1");
    const body = document.body;
    const sk_bot = body.textContent.split("sumitbot_(");
    if (sk_bot.length > 2) {
      console.log(["Dehasing Step -2", sk_bot]);
      const sk_bot_2 = sk_bot[2].split(",");
      if (sk_bot_2.length > 2) {
        console.log(["Dehasing Step - 3", sk_bot_2]);
        const code = sk_bot_2[0].replaceAll("'", "");
        if (code) {
          console.log(["Dehased Code = ", code]);
          const url = document.location.origin + "/?go=" + code;
          if (go == true) {
            window.location = url;
          } else {
            console.log("Go URL: " + url);
          }
        } else {
          error_alert("Oops! something went wrong.", "Code not found.", code);
        }
      } else {
        error_alert(
          "Oops! something went wrong.",
          "sk_bot_2 Step - 2 Failure.",
          sk_bot_2
        );
      }
    } else {
      error_alert(
        "Oops! something went wrong.",
        "sk_bot Step -1 Failure.",
        sk_bot
      );
    }
  };
  // error handler function
  this.error = (title, message = "", data = "") => {
    const body = { title: title, message: message, data: data };
    console.log(body);
  };

  //init  core module
  this.init = () => {
    if (_this.current_url.toString().includes("modlinks.xyz/archives")) {
      _this.find_and_visit(true);
    } else if (
      _this.current_url.pathname == "/" &&
      _this.current_host == "blog.maxsilo.in"
    ) {
      _this.landing_page();
    } else if (
      _this.current_url.pathname != "/" &&
      _this.current_host == "blog.maxsilo.in"
    ) {
      _this.decode_hashing(true);
    }
  };
}
var moviesMod = new MoviesMod();
moviesMod.init();
