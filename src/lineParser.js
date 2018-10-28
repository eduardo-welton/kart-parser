const StringMask = require("string-mask");
const moment = require('moment');

module.exports = {
    formatAverageSpeed(averageSpeed) {
        const result = parseFloat(averageSpeed.replace(',', '.'));
        return result;
    },
    formatLapTime(lapTime) {
        var formatter = new StringMask('00:00:00.000', { reverse: true });
        lapTime = lapTime.replace(/[.:]/g, '');

        let result = formatter.apply(lapTime);
        result = moment.duration(result);

        return result.asMilliseconds();
    },
    parseLine(rawLine) {
        /*
            Regex: (\d+:\d+\d+:\d+\.\d+)\s+(\d+)\s\S\s(\S+)\s+(\d+)\s+(\d+:\d+\.\d+)\s+(\d+\,\d+)
            Vamos utilizar regex para realizar o parser para reconhecer a linha, da seguinte forma:

            =======================================================================================
            (\d+:\d+\d+:\d+\.\d+)   => Captura o horário no formato HH:MM:ss.mmm
            \s+                     => Espaço em branco (1 ou +)
            (\d+)                   => Captura o id do piloto
            \s                      => Espaço em branco (1)
            \S                      => Qualquer coisa diferente de espaço (seja hífen ou traço)
            \s                      => Espaço em branco (1)
            (\S+)                   => Captura o nome do piloto (Até o primeiro espaço em branco)
            \s+                     => Espaço em branco (1 ou +)
            (\d+)                   => Captura a volta do piloto (informação numérica)
            \s+                     => Espaço em branco (1 ou +)
            (\d+:\d+\.\d+)          => Captura o tempo da Volta
            \s+                     => Espaço em branco (1 ou +)
            (\d+\,\d+)              => Captura a velocidade média do piloto
            =======================================================================================
        */
        const bodyMatch = /(\d+:\d+\d+:\d+\.\d+)\s+(\d+)\s\S\s(\S+)\s+(\d+)\s+(\d+:\d+\.\d+)\s+(\d+\,\d+)/.exec(rawLine);

        if (bodyMatch) {
            const lap = {
                dateTime: bodyMatch[1],
                pilotId: parseInt(bodyMatch[2]),
                pilotName: bodyMatch[3],
                lapNumber: parseInt(bodyMatch[4]),
                lapTimeInMilliSeconds: this.formatLapTime(bodyMatch[5]),
                averageSpeed: this.formatAverageSpeed(bodyMatch[6]),
            }

            return lap;
        }
    }
}