const fileParser = require('../src/fileParser');
const raceInfo = require('../src/raceInfo');

test('Grouping lap info', async () => {
    const parsedLines = [
        { dateTime: "23:49:08.277", pilotId: 1, pilotName: "SONIC", lapNumber: 1, lapTimeInMilliSeconds: 62852, averageSpeed: 44.275 },
        { dateTime: "23:49:10.858", pilotId: 2, pilotName: "KNUCKLES", lapNumber: 1, lapTimeInMilliSeconds: 64352, averageSpeed: 43.243 },
        { dateTime: "23:50:11.447", pilotId: 1, pilotName: "SONIC", lapNumber: 2, lapTimeInMilliSeconds: 63170, averageSpeed: 44.053 },
        { dateTime: "23:50:14.860", pilotId: 2, pilotName: "KNUCKLES", lapNumber: 2, lapTimeInMilliSeconds: 64002, averageSpeed: 43.480 },
        { dateTime: "23:51:14.216", pilotId: 1, pilotName: "SONIC", lapNumber: 3, lapTimeInMilliSeconds: 62769, averageSpeed: 44.334 },
        { dateTime: "23:51:18.576", pilotId: 2, pilotName: "KNUCKLES", lapNumber: 3, lapTimeInMilliSeconds: 63716, averageSpeed: 43.675 },
        { dateTime: "23:52:17.003", pilotId: 1, pilotName: "SONIC", lapNumber: 4, lapTimeInMilliSeconds: 62787, averageSpeed: 44.321 },
        { dateTime: "23:52:22.586", pilotId: 2, pilotName: "KNUCKLES", lapNumber: 4, lapTimeInMilliSeconds: 64010, averageSpeed: 43.474 }
    ];

    const raceInfo = fileParser.groupRaceByPilot(parsedLines);

    expect(raceInfo.length).toBe(2);

    expect(raceInfo[0].pilotId).toBe(1);
    expect(raceInfo[0].pilotName).toBe("SONIC");
    expect(raceInfo[0].laps.length).toBe(4);

    expect(raceInfo[0].laps[0].dateTime).toBe("23:49:08.277");
    expect(raceInfo[0].laps[0].lapNumber).toBe(1);
    expect(raceInfo[0].laps[0].lapTimeInMilliSeconds).toBe(62852);
    expect(raceInfo[0].laps[0].averageSpeed).toBe(44.275);
    expect(raceInfo[0].laps[1].dateTime).toBe("23:50:11.447");
    expect(raceInfo[0].laps[1].lapNumber).toBe(2);
    expect(raceInfo[0].laps[1].lapTimeInMilliSeconds).toBe(63170);
    expect(raceInfo[0].laps[1].averageSpeed).toBe(44.053);
    expect(raceInfo[0].laps[2].dateTime).toBe("23:51:14.216");
    expect(raceInfo[0].laps[2].lapNumber).toBe(3);
    expect(raceInfo[0].laps[2].lapTimeInMilliSeconds).toBe(62769);
    expect(raceInfo[0].laps[2].averageSpeed).toBe(44.334);
    expect(raceInfo[0].laps[3].dateTime).toBe("23:52:17.003");
    expect(raceInfo[0].laps[3].lapNumber).toBe(4);
    expect(raceInfo[0].laps[3].lapTimeInMilliSeconds).toBe(62787);
    expect(raceInfo[0].laps[3].averageSpeed).toBe(44.321);

    expect(raceInfo[1].pilotId).toBe(2);
    expect(raceInfo[1].pilotName).toBe("KNUCKLES");
    expect(raceInfo[1].laps.length).toBe(4);

    expect(raceInfo[1].laps[0].dateTime).toBe("23:49:10.858");
    expect(raceInfo[1].laps[0].lapNumber).toBe(1);
    expect(raceInfo[1].laps[0].lapTimeInMilliSeconds).toBe(64352);
    expect(raceInfo[1].laps[0].averageSpeed).toBe(43.243);
    expect(raceInfo[1].laps[1].dateTime).toBe("23:50:14.860");
    expect(raceInfo[1].laps[1].lapNumber).toBe(2);
    expect(raceInfo[1].laps[1].lapTimeInMilliSeconds).toBe(64002);
    expect(raceInfo[1].laps[1].averageSpeed).toBe(43.48);
    expect(raceInfo[1].laps[2].dateTime).toBe("23:51:18.576");
    expect(raceInfo[1].laps[2].lapNumber).toBe(3);
    expect(raceInfo[1].laps[2].lapTimeInMilliSeconds).toBe(63716);
    expect(raceInfo[1].laps[2].averageSpeed).toBe(43.675);
    expect(raceInfo[1].laps[3].dateTime).toBe("23:52:22.586");
    expect(raceInfo[1].laps[3].lapNumber).toBe(4);
    expect(raceInfo[1].laps[3].lapTimeInMilliSeconds).toBe(64010);
    expect(raceInfo[1].laps[3].averageSpeed).toBe(43.474);
});

test('Getting race result', async () => {
    const pilotsInfo = await fileParser.getLapInfosFromFile("./tests/testfile_mario_kart.txt");
    const raceResults = raceInfo.getRaceResult(pilotsInfo);

    expect(raceResults).not.toBeNull();
    expect(raceResults.length).toBe(2)

    expect(raceResults[0].position).toBe(1)
    expect(raceResults[0].pilotId).toBe(3)
    expect(raceResults[0].pilotName).toBe("MARIO")
    expect(raceResults[0].elapsedLaps).toBe(4)
    expect(raceResults[0].elapsedTime).toBe("04:11.578")

    expect(raceResults[1].position).toBe(2)
    expect(raceResults[1].pilotId).toBe(23)
    expect(raceResults[1].pilotName).toBe("BOWSER")
    expect(raceResults[1].elapsedLaps).toBe(4)
    expect(raceResults[1].elapsedTime).toBe("04:17.722")
});

test('Getting race result - Inexistint file', async () => {
    let error = null;
    try {
        await fileParser.getLapInfosFromFile("./tests/file_that_not_exists.txt");
    }
    catch (err) {
        error = err;
    }

    expect(error).not.toBeNull();
});