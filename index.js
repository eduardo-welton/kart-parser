const fileParser = require('./src/fileParser');
const raceInfo = require('./src/raceInfo');

async function main() {
    const pilotsInfo = await fileParser.getLapInfosFromFile(process.argv[2]);
    const raceResults = raceInfo.getRaceResult(pilotsInfo);

    console.log(`=====================================================================`);
    console.log(`                       RESULTADO DA CORRIDA                          `);
    console.log(`=====================================================================`);
    raceResults.forEach((raceResult)=> {
        console.log(`Posição Chegada : ${raceResult.position}º`);
        console.log(`Código Piloto : ${raceResult.pilotId}`);
        console.log(`Nome Piloto : ${raceResult.pilotName}`);
        console.log(`Qtde Voltas Completadas: ${raceResult.elapsedLaps}`);
        console.log(`Tempo Total de Prova: ${raceResult.elapsedTime}`);        
        console.log("");
    });
    console.log(`=====================================================================`);
}

main();