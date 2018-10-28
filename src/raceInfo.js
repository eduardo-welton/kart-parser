const moment = require('moment');
// Pacote para formatação de tempo.
require('moment-duration-format');

function getRaceTime(currentPilot) {
    let raceTime = 0;
    for (let idx = 0; idx < currentPilot.laps.length; idx++) {
        const lap = currentPilot.laps[idx];
        raceTime += lap.lapTimeInMilliSeconds;
    }
    return raceTime;
}

function formatDuration(duration) {
    const formatDuration = moment.duration(duration, 'ms')
    const result =  formatDuration.format("mm:ss.SSS", {trim: false})
    return result;
}

module.exports = {
    getRaceResult(pilotsInfo) {
        pilotsInfo.forEach(pilotInfo => {
            // Primeiro, calculamos o tempo gasto de cada piloto na corrida.
            pilotInfo.raceTime = getRaceTime(pilotInfo);
            pilotInfo.fomattedRaceTime = formatDuration(pilotInfo.raceTime);
        });

        pilotsInfo = pilotsInfo.sort((pilot1, pilot2) => {
            // Vamos ordenar primeiro pela quantidade de voltas (em ordem decrescente) 
            // Após isso, ordenamos pelo tempo gasto em corrida (em ordem crescente) 
            return pilot2.laps.length - pilot1.laps.length || pilot1.raceTime - pilot2.raceTime;
        });

        let result = pilotsInfo.map((pilotInfo, idx) => {
            return {
                position: idx +1,
                pilotId: pilotInfo.pilotId,
                pilotName: pilotInfo.pilotName,
                elapsedLaps: pilotInfo.laps.length,
                elapsedTime: pilotInfo.fomattedRaceTime
            }
        });

        return result;
    },

    getFirstPlace(pilotsInfo) {
        let firstPlacePilot = null;

        pilotsInfo.forEach(currentPilot => {
            if (currentPilot.laps.length < 4)
                return;
            currentPilot.raceTime = getRaceTime(currentPilot);
            if (!firstPlacePilot || firstPlacePilot.raceTime > currentPilot.raceTime)
                firstPlacePilot = currentPilot
        });

        return firstPlacePilot;
    }
}