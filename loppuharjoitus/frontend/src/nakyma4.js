document.getElementById("loader").style.display = "none";
let labels = [];
let values = [];

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
  let valitsin = document.getElementById("dataValitsin");
  document.getElementById("otsikko").innerText =
    valitsin.options[valitsin.selectedIndex].text;
  document.getElementById("datanNimi").innerText =
    valitsin.options[valitsin.selectedIndex].text;
  document.getElementById("loader").style.display = "block";
  var Parent = document.getElementById("myBody");
  while (Parent.hasChildNodes()) {
    Parent.removeChild(Parent.firstChild);
  }
  let tunnit = document.getElementById("valikko").value;
  let haettava = document.getElementById("dataValitsin").value;
  labels = [];
  values = [];
  const serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/${haettava}/${tunnit}`
  );
  let data = await serverResponse.json();
  tunnit = data.length;

  const table = document.getElementById("myTable");
  data.reverse();
  for (var indexY = 0; indexY < tunnit; indexY++) {
    var row = table.getElementsByTagName("tbody")[0].insertRow(indexY);
    var cell = row.insertCell(0);
    cell.innerText = data[indexY].date_time.split("T")[0];

    var cell = row.insertCell(1);
    cell.innerText = data[indexY].date_time.split("T")[1].split(".")[0];

    var cell = row.insertCell(2);
    cell.innerText = data[indexY][haettava];

    labels.push(
      data[indexY].date_time.split(":")[0] +
        ":" +
        data[indexY].date_time.split(":")[1]
    );
    values.push(data[indexY][haettava]);
  }

  values.reverse();
  labels.reverse();
  lineChart.data.datasets[0].data = values;
  lineChart.data.datasets[0].label =
    valitsin.options[valitsin.selectedIndex].text;
  lineChart.data.labels = labels;
  lineChart.update();
  document.getElementById("loader").style.display = "none";
}
