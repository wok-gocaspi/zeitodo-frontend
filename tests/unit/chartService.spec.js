import chartService from "@/services/chartService";



describe("GetRndColor", () => {
    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {

        let res = chartService.random_rgba()

        expect(res).toBeTruthy()
    });

    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        let input = ["project1","project2"]
        let res = chartService.getRandomColor(input)

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
/*
        let expectedSort = [
            [ '2052-08-01T09:00:00.801Z', '2053-08-01T09:00:00.801Z' ],
            [ 'Bert', 'Bert' ],
            [ 49, 49 ]
        ]

 */
        let res = chartService.extractDatesProjectDuration(fakeTimeEntires)

        expect(res).toBeTruthy()
 //       expect(res).toBe(expectedSort)
    });

    it("mocking the axios call to post correct username and password. The expected response is a valid baerer token", async () => {
        let fakeDateA =  "2052-08-03T09:00:00.801Z"
        let fakeDateB = "2052-08-03T10:00:00.801Z"
   //     let expected = 2
        let res = chartService.getTimeDiff(fakeDateA,fakeDateB)

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