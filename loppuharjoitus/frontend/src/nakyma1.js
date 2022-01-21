async function alusta() {
  const serverResponse = await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather`
  );
  let data = await serverResponse.json();

  const table = document.getElementById("myTable");
  for (var indexY = 0; indexY < 50; indexY++) {
    var row = table.getElementsByTagName("tbody")[0].insertRow(indexY);
    var cell = row.insertCell(0);
    cell.innerText = data[indexY].id;

    var cell = row.insertCell(1);
    cell.innerText = Object.keys(data[indexY].data)[0];

    var cell = row.insertCell(2);
    cell.innerText = Object.values(data[indexY].data)[0];

    var cell = row.insertCell(3);
    cell.innerText = data[indexY].device_id;

    var cell = row.insertCell(4);
    cell.innerText = data[indexY].date_time.split("T")[0];

    var cell = row.insertCell(5);
    cell.innerText = data[indexY].date_time.split("T")[1].split(".")[0];
  }
}

alusta();
