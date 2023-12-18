const dateInput = document.querySelector("#input-date");
const discountInput = document.querySelector("#input-discount");
const fileInput = document.querySelector("#input-file");

const filenameInput = document.querySelector("#filename");
const downloadBtn = document.querySelector("#download-btn");

let fileContent = "";

function downloadFile(filename, content) {
  //console.log("test");
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);
  element.setAttribute("id", "link");

  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

async function handleFile(event) {
  const file = event.target.files[0];
  const content = await file.text();
  return content;
}

function processData(text) {
  const [year, month] = dateInput.value.split("-");
  const [year_discount, month_discount, day_discount] = discountInput.value.split("-");
  const lines = text.split("\n");
 
  let result = "";
  const cod = "45"

  for (const line of lines) {
    const fields = line.trim().split("\t");
    const absences = fields[1].split(",");
    console.log(fields)
    
    for (const day of absences) {
      const formatedDay = day.trim().padStart(2, "0");
      const formatedDate = `${formatedDay}/${month}/${year}`;

      const formatedDay_discount = day_discount.trim().padStart(2, "0");
      const formatedDate_discount = `${formatedDay_discount}/${month_discount}/${year_discount}`;

      result += `${fields[0]}\t${cod}\t${formatedDate}\t${formatedDate}\t\t${formatedDate_discount}\r\n`;
    }

  }

  return result;
}

function processFilename(filename) {
  const regex = /\.txt$/;
  if (regex.test(filename)) return filename;
  return `${filename}.txt`;
}

downloadBtn.addEventListener("click", () => {
  if (fileContent == "") return
  if (filenameInput.value == "") return;

  const filename = processFilename(filenameInput.value);
  const result = processData(fileContent);
  downloadFile(filename, result);
});

fileInput.addEventListener("change", async (e) => {
  fileContent = await handleFile(e);
});


