let labels = [];
let values = [];
let values2 = [];

var ctx = document.getElementById("myChart");
var lineChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "",
        data: values,
        borderColor: "#c45850",
      },
      {
        label: "",
        data: values2,
        borderColor: "#28b463",
      },
    ],
  },
  options: {
    layout: {
      padding: {
        left: 5,
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 25,
      },
    },
  },
});

async function alusta() {
  document.getElementById("loader").style.display = "block";

  let valitsin = document.getElementById("dataValitsin");
  let valitsin2 = document.getElementById("dataValitsin2");

  let tunnit = document.getElementById("valikko").value;
  let haettava = document.getElementById("dataValitsin").value;
  let haettava2 = document.getElementById("dataValitsin2").value;
  labels = [];
  values = [];
  values2 = [];
  let serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/${haettava}/${tunnit}`
  );
  let data = await serverResponse.json();
  serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/${haettava2}/${tunnit}`
  );
  let data2 = await serverResponse.json();
  tunnit = data.length;

  for (var indexY = 0; indexY < tunnit; indexY++) {
    labels.push(
      data[indexY].date_time.split(":")[0] +
        ":" +
        data[indexY].date_time.split(":")[1]
    );
    values.push(data[indexY][haettava]);
    values2.push(data2[indexY][haettava2]);
  }

  lineChart.data.datasets[0].data = values;
  lineChart.data.datasets[0].label =
    valitsin.options[valitsin.selectedIndex].text;
  lineChart.data.datasets[1].data = values2;
  lineChart.data.datasets[1].label =
    valitsin.options[valitsin2.selectedIndex].text;
  lineChart.data.labels = labels;
  lineChart.update();
  document.getElementById("loader").style.display = "none";
}
