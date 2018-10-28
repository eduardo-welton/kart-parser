const lineParser = require('../src/lineParser');

test('Test with regular line - Line 1', async () => {
    const rawLine = "23:49:08.277      038 – F.MASSA                           1		1:02.852                        44,275";
    const lap = await lineParser.parseLine(rawLine);

    expect(lap.dateTime).toBe('23:49:08.277')
    expect(lap.pilotId).toBe(38);
    expect(lap.pilotName).toBe("F.MASSA");
    expect(lap.lapNumber).toBe(1);
    expect(lap.lapTimeInMilliSeconds).toBe(62852);
    expect(lap.averageSpeed).toBe(44.275);
});

test('Test with regular line - Line 2', async () => {
    const rawLine = "23:49:10.858      033 – R.BARRICHELLO                     1		1:04.352                        43,243"
    const lap = await lineParser.parseLine(rawLine);

    expect(lap.dateTime).toBe("23:49:10.858")
    expect(lap.pilotId).toBe(33);
    expect(lap.pilotName).toBe("R.BARRICHELLO");
    expect(lap.lapNumber).toBe(1);
    expect(lap.lapTimeInMilliSeconds).toBe(64352);
    expect(lap.averageSpeed).toBe(43.243);
});

