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
    dateSorter(a,b){

        if (a>b) {
            return 1
        }
        if (a<b){ return -1 }
    },

    extractDatesProjectDuration(timeEntries){
        let dates = []
        let projects = []
        let durations = []
        timeEntries.sort((a,b) =>{
            a = a.start.split('-').join('');
            b = b.start.split('-').join('');
            return this.dateSorter(a,b);
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


        return Math.floor(minutes / 60);
    },
}