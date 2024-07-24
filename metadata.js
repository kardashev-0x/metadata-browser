var clientInfo =  {
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  language: navigator.language,
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  screenWidth: screen.width,
  screenHeight: screen.height,
  screenAvailWidth: screen.availWidth,
  screenAvailHeight: screen.availHeight, 
  hardwareConcurrency: navigator.hardwareConcurrency,
  deviceMemory: navigator.deviceMemory
};

function calculateFingerprint() {
  var userAgent = normalizeString(navigator.userAgent);
  var platform = normalizeString(navigator.platform);
  var language = normalizeString(navigator.language);
  var timeZone = normalizeString(Intl.DateTimeFormat().resolvedOptions().timeZone);

  var fingerprintString = userAgent + platform + language + timeZone;
  var hash = sha256(fingerprintString);

  return hash;
}

function normalizeString(str) {
  return str.trim().toLowerCase();
}

function sha256(input) {
  var crypto = window.crypto || window.msCrypto;
  var buffer = new TextEncoder("utf-8").encode(input);
  return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
    return hex(hash);
  });
}

function hex(buffer) {
  var hexCodes = [];
  var view = new DataView(buffer);
  for (var i = 0; i < view.byteLength; i += 4) {
    var value = view.getUint32(i);
    var stringValue = value.toString(16);
    var padding = '00000000';
    var paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }
  return hexCodes.join("");
}

calculateFingerprint().then(function(fingerprint) {
  console.log("User-agent  : ", clientInfo.userAgent);
  console.log("Platform    : ", clientInfo.platform);
  console.log("Language    : ", clientInfo.language);
  console.log("Timezone    : ", clientInfo.timeZone);
  console.log("Resolution  : ", clientInfo.screenAvailWidth, "x", clientInfo.screenAvailHeight);
  console.log("Concurrency : ", clientInfo.hardwareConcurrency);
  console.log("Memory      : ", clientInfo.deviceMemory);
  console.log("SHA-256     : ", fingerprint);  
});
