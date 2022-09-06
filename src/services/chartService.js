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

}


}