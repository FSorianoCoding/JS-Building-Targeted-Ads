// get user's data
// Get the user's coordinates:
// We know the advertisement shouldn't attempt to display a message until we have the user's coordinates. 
// That makes this an asynchronous task. You can use a promise to make async/await syntax available and avoid callbacks.      
// First, resolve the position data and then return the latitude and longitude of the object via coords.latitude and coords.longitude. 
// Use async/await syntax to return the coordinates array after the promise is fulfilled.                                                        
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]
}
// console.log(getCoords());


// get user's time
function userTime(){
    const now = new Date()
    return now.getHours()      // 
}
// console.log(userTime())

// helper functions
// check time of day
function getMealTime(){
    const tod = userTime()  // tod stands for time of day.
    // if(tod > 20){return 'late night snack'}
    // else if (tod > 16) {return 'dinner'}
    // else if (tod > 11) {return 'lunch'}
    // else {return 'breakfast'}
    return tod > 20 ? 'late night snack' : tod > 16 ? 'dinner' : tod > 11 ? 'lunch' : 'breakfast'
}

// console.log(getMealTime())   time of day console logs and type of meal on developer tools in web browser

// build ads
// build ad 1
function buildAd1(){
    const mealTime = getMealTime()
    let content = document.querySelector('.ad1')
    let inner = document.createElement('p')
    inner.innerHTML = `We've got the best <span>${mealTime}</span> in town!`
    content.append(inner)
}
// buildAd1()

// build ad 2
function buildAd2(coordinates){
    const coords = coordinates
    const href = `http://www.google.com/maps/search/coffee/@${coords[0]}, ${coords[1]},15z/`;
    let content = document.querySelector('.ad2')
    let inner = document.createElement('p')
    inner.innerHTML = `It's time to try our coffee! <span><a href="${href}" target=_blank>We're this close!</a></span>`
    content.append(inner)
}
// console.log(buildAd1(getCoords()))


// event listeners
// on load, build ads
window.onload = async () => {
    buildAd1()
    const coords = await getCoords()
    buildAd2(coords)
}
