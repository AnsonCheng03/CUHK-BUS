//Functions

function modechange() {
  const mode = document.querySelector('input[name="mode"]:checked').value;
  document
    .querySelectorAll('*[mode]:not([mode="' + mode + '"])')
    .forEach((element) => {
      element.style.display = "none";
    });
  document.querySelectorAll('*[mode="' + mode + '"]').forEach((element) => {
    element.style.display = "unset";
  });
}

function getLocation(item) {
  globalThis.item = item;
  document.getElementById("details-box").style.display = "flex";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, Positionfailed, {
      timeout: 500,
    });
  } else {
    window.alert(Translation["GPS-notsupp"]);
    document.getElementById("details-box").style.display = "none";
  }
}

function Positionfailed(position) {
  window.alert(Translation["GPS-error"]);
  document.getElementById("details-box").style.display = "none";
}

function showPosition(position) {
  for (var i = 0; i < GPSdata.length; i++) {
    GPSdata[i]["distance"] = distanceBetweenTwoPlace(
      position.coords.latitude,
      position.coords.longitude,
      GPSdata[i].lat,
      GPSdata[i].lng,
      "K"
    );
  }
  GPSdata.sort(function (a, b) {
    return parseFloat(a.distance) - parseFloat(b.distance);
  });
  if (GPSdata[0]["distance"] > 0.5) {
    document.getElementById("GPSresult").innerHTML =
      '<div style="float:center; height:100px; display: flex; align-items: center;"><p id="details-box-heading" style="display:inline; color: black; margin: auto;">' +
      Translation["nearst_warning"] +
      "</p></div>" +
      '<div style="height:100px; text-align: center; margin-top: 20px"><span class="map-submit-btn" onclick=\'document.getElementById("details-box").style.display = "none"; \'>' +
      Translation["cancel_btntxt"] +
      "</span><span class=\"map-submit-btn\" onclick='printneareststation();'>" +
      Translation["continue_btntxt"] +
      "</span></div>" +
      "<br>";
  } else {
    printneareststation();
  }
}

function changevaluebyGPS(item, locname, loccode) {
  item = item.split("-")[0];
  if (document.querySelector('input[name="mode"]:checked').value == "station") {
    document.getElementById(item).value = loccode;
    sessionStorage.setItem("routesearch-" + item, loccode);
  } else {
    document.getElementById(item + "bd").value = locname + " (" + loccode + ")";
    sessionStorage.setItem(
      "routesearch-" + item + "bd",
      locname + " (" + loccode + ")"
    );
  }
  document.getElementById("details-box").style.display = "none";
  autoSubmitForm();
}

function printneareststation() {
  var htmlcode;
  document.getElementById("GPSresult").innerHTML = "";
  for (var i = 0; i < 3; i++) {
    htmlcode = "";
    htmlcode =
      htmlcode +
      '<div class="gpsOptions" onclick="changevaluebyGPS(\'' +
      item +
      "','" +
      GPSdata[i]["location"] +
      "','" +
      GPSdata[i]["code"] +
      "');\"><div class=GpsText'>" +
      GPSdata[i]["location"];
    if (GPSdata[i]["attr"]) {
      htmlcode = htmlcode + "(" + GPSdata[i]["attr"] + ")";
    }
    GPSdata[i]["distance"].toFixed(3) * 1000 > 1000
      ? (GPSdatamodi = "> 9999")
      : (GPSdatamodi = GPSdata[i]["distance"].toFixed(3) * 1000);
    htmlcode =
      htmlcode +
      "</div><div class='gpsMeter'>" +
      GPSdatamodi +
      " m</div></div>";
    document.getElementById("GPSresult").innerHTML =
      document.getElementById("GPSresult").innerHTML + htmlcode;
  }
}

function distanceBetweenTwoPlace(
  firstLat,
  firstLon,
  secondLat,
  secondLon,
  unit
) {
  var firstRadlat = (Math.PI * firstLat) / 180;
  var secondRadlat = (Math.PI * secondLat) / 180;
  var theta = firstLon - secondLon;
  var radtheta = (Math.PI * theta) / 180;
  var distance =
    Math.sin(firstRadlat) * Math.sin(secondRadlat) +
    Math.cos(firstRadlat) * Math.cos(secondRadlat) * Math.cos(radtheta);
  if (distance > 1) {
    distance = 1;
  }
  distance = Math.acos(distance);
  distance = (distance * 180) / Math.PI;
  distance = distance * 60 * 1.1515;
  if (unit == "K") {
    distance = distance * 1.609344;
  }
  if (unit == "N") {
    distance = distance * 0.8684;
  }
  return distance;
}

function map_show(mode, text) {
  switch (mode) {
    case 0:
      document.getElementById("map-search-heading").innerHTML =
        document.getElementById(text.split("-")[0] + "-label").innerText +
        "<br>";
      document.getElementById("map-search").style.display = "unset";
      break;
    case 1:
      if (text == "submit")
        document.getElementById("map-search").style.display = "none";
      if (text == "close")
        document.getElementById("map-search").style.display = "none";
      break;
    default:
      break;
  }
}

function submitform(form, replacecontent, target = "/") {
  if (!window.navigator.onLine) window.location.reload();
  const elm = document.querySelector(replacecontent);
  elm.innerHTML = "";
  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);
  xhr.withCredentials = true;
  xhr.open("POST", target);
  xhr.onreadystatechange = function () {
    if (
      document.querySelector(replacecontent) &&
      this.response !== "" &&
      this.readyState == 4
    ) {
      elm.innerHTML = this.response;
      Array.from(elm.querySelectorAll("script")).forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }
  };
  xhr.send(formData);
  sessionStorage.setItem("routesearch-submit", "submitted");
  return false;
}

window.addEventListener("load", () => {
  sessionStorage.setItem("loadstate", "load");

  //Save input

  document.querySelectorAll('input[type="text"], select').forEach((elm) => {
    const v = "routesearch-" + elm.name;

    if (sessionStorage.getItem(v)) {
      elm.value = sessionStorage.getItem(v);
    }

    elm.addEventListener("change", () => {
      sessionStorage.setItem(v, elm.value);
    });
  });

  document
    .querySelectorAll('input[type="checkbox"], checkbox')
    .forEach((elm) => {
      const v = "routesearch-" + elm.name;
      if (sessionStorage.getItem(v)) {
        if (sessionStorage.getItem(v) == "true") elm.checked = true;
        else if (sessionStorage.getItem(v) == "false") elm.checked = false;
        elm.dispatchEvent(new Event("change"));
      }
      elm.addEventListener("change", () => {
        sessionStorage.setItem(v, elm.checked);
      });
    });

  document.querySelectorAll('input[type="radio"]').forEach((elm) => {
    const v = "routesearch-" + elm.name;

    if (sessionStorage.getItem(v)) {
      document
        .querySelectorAll('input[name="' + elm.name + '"]')
        .forEach((elem) => {
          if (elem.value == sessionStorage.getItem(v)) elem.checked = true;
          else elem.checked = false;
        });
      elm.dispatchEvent(new Event("change"));
    }

    elm.addEventListener("change", () => {
      sessionStorage.setItem(
        v,
        document.querySelector('input[name="' + elm.name + '"]:checked').value
      );
    });
  });

  if (sessionStorage.getItem("routesearch-submit"))
    if (sessionStorage.getItem("routesearch-submit") == "submitted")
      submitform(
        document.querySelector("form"),
        ".routeresult",
        "routesearch/index.php"
      );
});

window.addEventListener("pageshow", () => {
  if (!sessionStorage.getItem("loadstate")) location.reload();
  sessionStorage.removeItem("loadstate");
});
