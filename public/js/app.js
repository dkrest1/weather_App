// call()
//   .then((data) => console.log(`${data.forcast} ${data.location}`))
//   .catch((error) => console.log(error));

const weatherForm = document.querySelector("form");
const forminput = document.querySelector("input");
const messageOne = document.querySelector(".message-1");
const messageTwo = document.querySelector(".message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = forminput.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  async function call() {
    const response = await fetch(
      `http://localhost:3000/weather?address=${search}`
    );
    const resJson = await response.json();
    return resJson;
  }

  call().then((data) => {
    if (data.error) {
      messageOne.textContent = `please the location you inserted is invalid`;
    } else {
      messageOne.textContent = `${data.location}`;
      messageTwo.textContent = `${data.forcast}`;
    }
  });
});
