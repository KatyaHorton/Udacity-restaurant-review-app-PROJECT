/* --------------- registration of the Service Worker --------------- */


// check if the SW is supported in that browser 
if (navigator.serviceWorker) {
	
// call passing in the URL of the script 
//since .register returns a promiss 
  navigator.serviceWorker.register('/sw.js')
	//log  a message if everything worked out 
  .then(registration => {
    console.log(`Registration successful, scope is ${registration.scope}`);

// log a failure message if it did not worked out 
  }).catch(error => {
    console.log(`Service worker registration failed, error: ${error}`);
  });
}


