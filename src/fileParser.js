const LineByLineReader = require('line-by-line');
const lineParser = require('./lineParser');
const fs = require('fs');

module.exports = {
    groupRaceByPilot(laps) {
        const lapsByPilot = {};

        laps.forEach(lap => {
            const idx = lap.pilotId;

            if (!lapsByPilot[idx]) {
                lapsByPilot[idx] = {};
                lapsByPilot[idx].pilotId = lap.pilotId;
                lapsByPilot[idx].pilotName = lap.pilotName;
                lapsByPilot[idx].laps = [];
            }

            delete lap.pilotId;
            delete lap.pilotName;
            lapsByPilot[idx].laps.push(lap)
        });

        const result = [];

        for (const pilot in lapsByPilot) {
            const element = lapsByPilot[pilot];
            result.push(element);
        }

        return result;
    },
    getLapInfosFromFile(filePath) {
        const self = this;
        return new Promise((resolve, reject) => {

            const laps = []
            const lr = new LineByLineReader(filePath);

            lr.on('error', function (err) {
                reject(err);
            });

            lr.on('line', function (rawLine) {
                const lap = lineParser.parseLine(rawLine);
                if (lap)
                    laps.push(lap);
                lr.resume();
            });

            lr.on('end', function () {
                const result = self.groupRaceByPilot(laps);
                resolve(result);
            });
        })
    }
}