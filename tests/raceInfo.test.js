const raceInfo = require('../src/raceInfo');

test('Get race result - Easy Solution', async () => {
    const races = [
        {
            pilotId: 1,
            pilotName: "SONIC",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 50 },
                { lapNumber: 2, lapTimeInMilliSeconds: 50 },
                { lapNumber: 3, lapTimeInMilliSeconds: 50 },
                { lapNumber: 4, lapTimeInMilliSeconds: 50 }
            ]
        },
        {
            pilotId: 2,
            pilotName: "KNUCKLES",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 90 },
                { lapNumber: 2, lapTimeInMilliSeconds: 90 },
                { lapNumber: 3, lapTimeInMilliSeconds: 90 },
                { lapNumber: 4, lapTimeInMilliSeconds: 90 }
            ]
        },
        {
            pilotId: 3,
            pilotName: "TAILS",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 180 },
                { lapNumber: 2, lapTimeInMilliSeconds: 180 },
                { lapNumber: 3, lapTimeInMilliSeconds: 180 },
                { lapNumber: 4, lapTimeInMilliSeconds: 180 }
            ]
        },
        {
            pilotId: 4,
            pilotName: "ROBOTNIK (DR. EGG)",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 180 },
                { lapNumber: 2, lapTimeInMilliSeconds: 180 },
                { lapNumber: 3, lapTimeInMilliSeconds: 180 },
                { lapNumber: 4, lapTimeInMilliSeconds: 180 }
            ]
        },
        {
            pilotId: 5,
            pilotName: "Dick Dastardly",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 90 },
                { lapNumber: 2, lapTimeInMilliSeconds: 30 }
            ]
        }
    ];

    const raceResult = raceInfo.getRaceResult(races);
    
    expect(raceResult).not.toBeNull();
    expect(raceResult.length).toBe(5);

    expect(raceResult[0].position).toBe(1);
    expect(raceResult[0].pilotId).toBe(1);
    expect(raceResult[0].pilotName).toBe("SONIC");
    expect(raceResult[0].elapsedLaps).toBe(4);
    expect(raceResult[0].elapsedTime).toBe("00:00.200");

    expect(raceResult[1].position).toBe(2);
    expect(raceResult[1].pilotId).toBe(2);
    expect(raceResult[1].pilotName).toBe("KNUCKLES");
    expect(raceResult[1].elapsedLaps).toBe(4);
    expect(raceResult[1].elapsedTime).toBe("00:00.360");

    expect(raceResult[2].position).toBe(3);
    expect(raceResult[2].pilotId).toBe(3);
    expect(raceResult[2].pilotName).toBe("TAILS");
    expect(raceResult[2].elapsedLaps).toBe(4);
    expect(raceResult[2].elapsedTime).toBe("00:00.720");

    expect(raceResult[3].position).toBe(4);
    expect(raceResult[3].pilotId).toBe(4);
    expect(raceResult[3].pilotName).toBe("ROBOTNIK (DR. EGG)");
    expect(raceResult[3].elapsedLaps).toBe(4);
    expect(raceResult[3].elapsedTime).toBe("00:00.720");

    expect(raceResult[4].position).toBe(5);
    expect(raceResult[4].pilotId).toBe(5);
    expect(raceResult[4].pilotName).toBe("Dick Dastardly");
    expect(raceResult[4].elapsedLaps).toBe(2);
    expect(raceResult[4].elapsedTime).toBe("00:00.120");
})

test('Get first place for race - Faster with incomplete lap count', async () => {
    const races = [
        {
            pilotId: 1,
            pilotName: "SONIC",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 50 },
                { lapNumber: 2, lapTimeInMilliSeconds: 50 }
            ]
        },
        {
            pilotId: 2,
            pilotName: "KNUCKLES",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 90 },
                { lapNumber: 2, lapTimeInMilliSeconds: 90 },
                { lapNumber: 3, lapTimeInMilliSeconds: 90 },
                { lapNumber: 4, lapTimeInMilliSeconds: 90 }
            ]
        },
        {
            pilotId: 3,
            pilotName: "ROBOTNIK (DR. EGG)",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 180 },
                { lapNumber: 2, lapTimeInMilliSeconds: 180 },
                { lapNumber: 3, lapTimeInMilliSeconds: 180 },
                { lapNumber: 4, lapTimeInMilliSeconds: 180 }
            ]
        },
        {
            pilotId: 4,
            pilotName: "ROBOTNIK (DR. EGG)",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 180 },
                { lapNumber: 2, lapTimeInMilliSeconds: 180 },
                { lapNumber: 3, lapTimeInMilliSeconds: 180 },
                { lapNumber: 4, lapTimeInMilliSeconds: 180 }
            ]
        },
        {
            pilotId: 5,
            pilotName: "Dick Dastardly",
            laps: [
                { lapNumber: 1, lapTimeInMilliSeconds: 90 },
                { lapNumber: 2, lapTimeInMilliSeconds: 30 }
            ]
        }
    ];

    const firstPlace = raceInfo.getFirstPlace(races);

    // expect(firstPlace.pilotId).toBe(2);
    // expect(firstPlace.pilotName).toBe("KNUCKLES");
    // expect(firstPlace.raceTime).toBe(360);
})