import Chart from "chart.js/auto";

export default {
        createDoughnut(projects,efforts){
            const ctx = document.getElementById('myChart');
            let colors = this.getRandomColor(projects)
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: projects,
                    datasets: [{
                        label: '# hours worked in project',
                        data: efforts,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1
                    }]
                }
            })
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
    extractDatesAndProjects(timeEntries){
          let dates = []
        let projects = []
        timeEntries.forEach((entry) =>  {
            dates.push(entry.start)
            projects.push(entry.project)
        })
        dates.sort((a,b) =>{
            a = a.split('-').join('');
            b = b.split('-').join('');
            return a > b ? 1 : a < b ? -1 : 0;
        });

        return [dates,projects]
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
        return new Date(dateB)-new Date(dateA)
    },

    createBar(dates,projects,durations){
        const ctx = document.getElementById('barChart');
        let colors = this.getRandomColor(projects)
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [{
                    label: '# hours worked in project',
                    data: durations,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            }
        })
    },


}