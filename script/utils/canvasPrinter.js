

const fontSize = 25;

const canvas = document.getElementById("canvas");
printToCanvas();
function printToCanvas(title = undefined) {

  var ctx = canvas.getContext('2d');
  var padding = 6;

  var hx = 927;
  var wx = 1900;

  canvas.height = hx;
  canvas.width = wx;

  hx = 927 - padding * 2;
  wx = 1900 - padding * 2;

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;

  var hasTitle = title != undefined;
  var titlePadding = hasTitle ? 01 : 0;

  var w_spacing = wx / Table.timeList.length;
  var h_spacing = hx / (7 + titlePadding);

  function putText(text, i, j, leftBias = 0) {
    ctx.fillText(text, w_spacing * (i + leftBias) + (w_spacing / 2) - (text.width(fontSize + "px Arial") / 2) + padding, h_spacing * j + (h_spacing / 2) + (fontSize / 2) + padding);
  }
  function putTextFirst(text, i, j) {
    ctx.fillText(text, w_spacing * i + (w_spacing / 2) - (text.width(fontSize + "px Arial") / 2) + padding, h_spacing * j + (h_spacing / 3) + (fontSize / 2) + padding);
  }
  function putTextSecond(text, i, j) {
    ctx.fillText(text, w_spacing * i + (w_spacing / 2) - (text.width(fontSize + "px Arial") / 2) + padding, h_spacing * j + ((h_spacing / 3) * 2) + (fontSize / 2) + padding);
  }
  function fillSquare(i, j, n) {
    ctx.fillStyle = "white";
    for (let k = 0; k < n; k++) {
      ctx.fillRect(w_spacing * (i + k) + 1 + padding, h_spacing * j + 1 + padding, w_spacing+2, h_spacing - 2);
    }
    ctx.fillStyle = "black";
  }

  for (let i = 0; i < Table.timeList.length + 2; i++) {
    ctx.moveTo(w_spacing * i + padding, 0 + padding);
    ctx.lineTo(w_spacing * i + padding, hx + padding);
    ctx.moveTo(w_spacing * i + padding, 0 + padding);
    ctx.lineTo(w_spacing * i + padding, hx + padding);

  }
  for (let i = 0; i < 8 + titlePadding; i++) {
    ctx.moveTo(0 + padding, h_spacing * i + padding);
    ctx.lineTo(wx + padding, h_spacing * i + padding);
    ctx.moveTo(0 + padding, h_spacing * i + padding);
    ctx.lineTo(wx + padding, h_spacing * i + padding);
  }
  // ctx.moveTo(0,0);
  ctx.font = fontSize + "px Arial";
  putTextFirst("Time", 0, 0 + titlePadding);
  putTextSecond("Week", 0, 0 + titlePadding);

  for (let i = 0; i < dayList.length; i++) {
    const element = dayList[i];
    putText(element, 0, i + 1 + titlePadding)
  }

  ctx.stroke();

  for (let i = 0; i < Table.timeList.length - 1; i++) {
    putTextFirst(intToTime(Table.timeList[i]), i + 1, 0 + titlePadding)
    putText("-", i + 1, 0 + titlePadding)
    putTextSecond(intToTime(Table.timeList[i + 1]), i + 1, 0 + titlePadding)
  }


  for (let i = 0; i < Table.table.length; i++) {
    const ei = Table.table[i];
    var bias = 0;
    for (let j = 0; j < ei.length; j++) {
      const ej = Table.base[ei[j]];
      var subs = "";
      var teach = "";
      if (ej.class_type == 0) {
        for (let k = 0; k < ej.subjects.length; k++) {
          const sub = ej.subjects[k];
          subs += getFirstLetters(sub.subject)

        }
        for (let k = 0; k < ej.subjects.length; k++) {
          const sub = ej.subjects[k];
          teach += getFirstLetters(sub.teacher)

        }
        subs += "(" + teach + ")";
      }
      if (ej.class_type == 1) {
        for (let k = 0; k < ej.subjects.length; k++) {
          const sub = ej.subjects[k];
          subs += getFirstLetters(sub.subject)

        }
        for (let k = 0; k < ej.subjects.length; k++) {
          const sub = ej.subjects[k];
          teach += getFirstLetters(sub.teacher)

        }
        subs += " LAB(" + teach + ")";
      }
      if (ej.class_type == 2) {
        subs = ej.subjects[0].subject;
      }


      if (ej.time_span - 1 > 0) {
        fillSquare(j + 1, i + 1 + titlePadding, ej.time_span - 1);
        putText(subs, j + 1 + bias, i + 1 + titlePadding, (ej.time_span - 1) / 2);
      }
      else
        putText(subs, j + 1 + bias, i + 1 + titlePadding);
      bias += ej.time_span - 1;
    }
  }
  if (hasTitle) {
    fillSquare(0, 0, Table.timeList.length-1);
    putText(title,Table.timeList.length/2 - .5 ,0);
  }
}

function tableAsImage() {
  printToCanvas();
  var dataURL = canvas.toDataURL("image/jpeg", 1.0);
  downloadImage(dataURL, 'my-canvas.jpeg');
}

function downloadImage(data, filename = 'untitled.jpeg') {
  var a = document.createElement('a');
  a.href = data;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
}

