export default {
    /*
    ALL_DIFFERENT_PROJECTS(){
  return ["ProjektX", "ZeiToDo","Employee-Register","Audi"]
    },

     */
    ALL_DIFFERENT_PROJECT_COLORS(){
 return ['indigo','cyan','orange','green']
    },
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

    getColor_projectSpecific(projects){
        let colorMap = []
        let coloredProjects = []
        projects.forEach(project =>{

            if (!coloredProjects.includes(project)){
                coloredProjects.push(project)
                colorMap.push(this.random_rgba())
            } else {
               let colorIndex = coloredProjects.indexOf(project)
                let colorOfSetProject = colorMap[colorIndex]
                colorMap.push(colorOfSetProject)
            }
        })
        return colorMap
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
            durations.push(this.getTimeDiff(entry.start,entry.end) - this.getTimeDiff(entry.breakStart,entry.breakEnd))
        })
        return [dates,projects,durations]
    },
    getTimeDiff(dateA,dateB){
        return this.convertMsToMinutes(new Date(dateB)-new Date(dateA))
    },
    convertMsToH(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
      return Math.floor(minutes / 60);
    },
    convertMsToMinutes(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        return Math.floor(seconds / 60)
    },
    allArrayElementsAreZero(floatArray){
        if(!Array.isArray(floatArray)){
            return true
        }
        let sum = 0
        floatArray.forEach(entry =>{
        sum += entry
        })
        return sum == 0 ? true:false
    }

}