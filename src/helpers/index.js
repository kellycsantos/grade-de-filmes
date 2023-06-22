export default function temHorario(horarioFilme) {
  let horaAtual = new Date();
  let temHorario = [];

  //parm com array de horarios
  horarioFilme.map((item) => {
    let hFilme = item.split(":")[0];
    let mFilme = item.split(":")[1];

    //horario convertido em timestamp
    let hSessao = new Date().setHours(hFilme, mFilme);

    if (horaAtual > hSessao) {
      temHorario.push(false);
    }

    if (horaAtual < hSessao) {
      temHorario.push(true);
    }
  });

  return temHorario.includes(true);
}
