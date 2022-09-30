import chartService from "@/services/chartService";



describe("GetRndColor", () => {
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {

        let res = chartService.random_rgba()
        console.log(res)
        expect(res).toBeTruthy()
    });

    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        let input = ["project1","project2"]
        let res = chartService.getRandomColor(input)
        console.log(res)
        expect(res.length).toEqual(input.length)
        expect(res).toBeTruthy()
    });

    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
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
            [ -38880, -38880 ]
        ]


        let res = chartService.extractDatesProjectDuration(fakeTimeEntires)
        console.log(res)
        expect(res).toBeTruthy()
      expect(res).toStrictEqual(expectedSort)
    });

    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        let fakeDateA =  "2052-08-03T09:00:00.801Z"
        let fakeDateB = "2052-08-03T10:00:00.801Z"
   //     let expected = 2
        let res = chartService.getTimeDiff(fakeDateA,fakeDateB)
        console.log(res)
        expect(res).toBeTruthy()
   //     expect(res).toEqual(expected)
    });

});

describe("getTimeDiff", ()=>{
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        let fakeDateA =  "2052-08-03T09:00:00.801Z"
        let fakeDateB = "2052-08-03T10:00:00.801Z"
   //     let expected = 1
        let res = chartService.getTimeDiff(fakeDateA,fakeDateB)
        console.log(res)
        expect(res).toBeTruthy()
 //       expect(res).toEqual(expected)
    });
})

describe("getColor_projectSpecific", ()=>{
    it("given a array of projects the method returnjs a color map that defines one color for each different project", ()=>{
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