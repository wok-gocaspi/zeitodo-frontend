import chartService from "@/services/chartService";



describe("GetRndColor", () => {
    it("random_rgba returns a string containing a randomized rgba code", async () => {

        let res = chartService.random_rgba()

        expect(res).toBeTruthy()
    });

    it("getRandomColor returns a random but valid rgba color code for each project in a given array of project-titles", async () => {
        let input = ["project1","project2"]
        let res = chartService.getRandomColor(input)

        expect(res.length).toEqual(input.length)
        expect(res).toBeTruthy()
    });

    it("given an array of time entries the function extractDatesProjectDuration returns three sorted arrays" +
        "the date array is sorted from last to most recent date, the project and durations array is sorted accordily to the sorted date array", async () => {
        let fakeTimeEntires = [
            {
                "userId": "6316ed4de7a88b65f17e47ff",
                "start": "2052-08-01T09:00:00.801Z",
                "end": "2052-08-03T10:00:00.801Z",
                "breakStart": "2024-08-01T12:00:00.801Z",
                "breakEnd": "2024-08-30T13:00:00.801Z",
                "project": "Bert"
            },
            {
                "userId": "6316ed4de7a88b65f17e47ff",
                "start": "2053-08-01T09:00:00.801Z",
                "end": "2053-08-03T10:00:00.801Z",
                "breakStart": "2024-08-01T12:00:00.801Z",
                "breakEnd": "2024-08-30T13:00:00.801Z",
                "project": "Bert"
            }
        ]

        let expectedSort = [
            [ '2052-08-01T09:00:00.801Z', '2053-08-01T09:00:00.801Z' ],
            [ 'Bert', 'Bert' ],
            [ -2332800000, -2332800000 ]
        ]


        let res = chartService.extractDatesProjectDuration(fakeTimeEntires)

        expect(res).toBeTruthy()
      expect(res).toStrictEqual(expectedSort)
    });

    it("given to dates, the function returns the differrence in milliseconds of the two dates", async () => {
        let fakeDateA =  "2052-08-03T09:00:00.801Z"
        let fakeDateB = "2052-08-03T10:00:00.801Z"
   //     let expected = 2
        let res = chartService.getTimeDiff(fakeDateA,fakeDateB)

        expect(res).toBeTruthy()
   //     expect(res).toEqual(expected)
    });

});

describe("ChartService, getTimeDiff", ()=>{
    it("given to dates, the function returns the differrence in milliseconds of the two dates", async () => {
        let fakeDateA =  "2052-08-03T09:00:00.801Z"
        let fakeDateB = "2052-08-03T10:00:00.801Z"
   //     let expected = 1
        let res = chartService.getTimeDiff(fakeDateA,fakeDateB)

        expect(res).toBeTruthy()
 //       expect(res).toEqual(expected)
    });
})

describe("ChartService, getColor_projectSpecific", ()=>{
    it("given a array of projects the method returns a color map that defines one color for each different project", ()=>{
        let projectArray = ["project1","project2","project1","project3",]
        let res = chartService.getColor_projectSpecific(projectArray)
        expect(res).toBeTruthy()
    })
})

describe("ChartService, dateSorting", ()=>{
    it("given a array of projects dates, the dates are sorted from to most recent date", ()=>{
        let fakeDateA =  "2052-08-03T09:00:00.801Z"
        let fakeDateB = "2052-08-05T10:00:00.801Z"
    //    let fakeDateC = "2052-08-07T10:00:00.801Z"
        let expectedABComparisson = 1
        let expectedBAComparisson = -1

        let resAB = chartService.dateSorter(fakeDateB,fakeDateA)
        expect(resAB).toEqual(expectedABComparisson)
    //    expect(res).toBeTruthy()
        let resBA = chartService.dateSorter(fakeDateA,fakeDateB)
        expect(resBA).toEqual(expectedBAComparisson)
        //    expect(res).toBeTruthy()
    })
})

describe("ChartService, ALL_DIFFERENT_PROJECT_COLORS returns the pre-defined project colors", ()=>{
    it("ALL_DIFFERENT_PROJECT_COLORS returns ['indigo','cyan','orange','green']", ()=>{
        let expectedColors = ['indigo','cyan','orange','green']
        let res = chartService.ALL_DIFFERENT_PROJECT_COLORS()
     //   expect(res).toBeTruthy()
        expect(res).toEqual(expectedColors)
    })
})
describe("ChartService, allArrayElementsAreZero", ()=>{
    it("given a array of numbers the function returns true if the input is not an array or all elements in the array are 0", ()=>{
        let zeroArray = [0,0,0,0]
        let nonZeroArray = [0,1,0,0]
        let notArray = "this is not an array"
        let resToZero = chartService.allArrayElementsAreZero(zeroArray)
        let resToNonZero = chartService.allArrayElementsAreZero(nonZeroArray)
        let resToNotArray = chartService.allArrayElementsAreZero(notArray)
      //  expect(res).toBeTruthy()
        expect(resToZero).toBe(true)
        expect(resToNonZero).toBe(false)
        expect(resToNotArray).toBe(true)
    })
})

describe("ChartService, convertMsToH", ()=>{
    it("given a number of milliseconds the function returns the amount of Hours to that amount of milliseconds", ()=>{
        let oneHour = 1000*60*60
        let twoHour = 2000*60*60
        let res1 = chartService.convertMsToH(oneHour)
     //   expect(res).toBeTruthy()
        expect(res1).toEqual(1)
        let res2 = chartService.convertMsToH(twoHour)
        expect(res2).toEqual(2)
    })
})

describe("ChartService, convertMsToM", ()=>{
    it("given a number of milliseconds the function returns the amount of Minutes to that amount of milliseconds", ()=>{
        let oneHour = 1000*60
        let twoHour = 2000*60
        let res1 = chartService.convertMsToMinutes(oneHour)
        //   expect(res).toBeTruthy()
        expect(res1).toEqual(1)
        let res2 = chartService.convertMsToMinutes(twoHour)
        expect(res2).toEqual(2)
    })
})

describe('ChartService, getDataOffset', function () {
    it('should slice the arrays of dates, projects and efforts determined by the parameter offset', function () {
        let fakeProjects = ["projectA", "projectB", "projectC"]
        let fakeDates = ["2022-09-28T06:00:00Z", "2022-09-28T11:00:00Z", "2022-10-03T18:00:00Z",]
        let fakeEfforts = [2,2,2]
        let offset =  "2022-10-01T18:00:00Z"
        let expectedProjects = ["projectC"]
        let expectedDates = ["2022-10-03T18:00:00Z"]
        let expectedEfforts = [2]

        let [actualDates,actualProjects,actualEfforts] = chartService.getDataOfset(fakeDates,fakeProjects,fakeEfforts,offset)

        expect(actualDates).toEqual(expectedDates)
        expect(actualProjects).toEqual(expectedProjects)
        expect(actualEfforts).toEqual(expectedEfforts)

    });
});