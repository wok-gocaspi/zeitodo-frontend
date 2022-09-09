

export default {

 random_rgba() {
    let o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}
,

    getRandomColor(projects) {
           let colors = [];
           projects.forEach(() => {
              colors.push(this.random_rgba())
           });
           return colors

},

    extractDatesProjectDuration(timeEntries){
        let dates = []
        let projects = []
        let durations = []
        timeEntries.sort((a,b) =>{
            a = a.start.split('-').join('');
            b = b.start.split('-').join('');
            return a > b ? 1 : a < b ? -1 : 0;
        });
        timeEntries.forEach((entry) =>  {
            dates.push(entry.start)
            projects.push(entry.project)
            durations.push(this.getTimeDiff(entry.start,entry.end))
        })
        return [dates,projects,durations]
    },
    getTimeDiff(dateA,dateB){
        return this.convertMsToH(new Date(dateB)-new Date(dateA))
    },
    convertMsToH(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;

    minutes = minutes % 60;

    // 👇️ If you don't want to roll hours over, e.g. 24 to 00
    // 👇️ comment (or remove) the line below
    // commenting next line gets you `24:00:00` instead of `00:00:00`
    // or `36:15:31` instead of `12:15:31`, etc.
   // hours = hours % 24;

    return hours;
},
}