// layout/header.html 요청 -> HTML 문구 텍스트
fetch("../../../layout/header.html")
  .then((response) => response.text())
  .then((responseText) => {
    document
      .querySelector(".container")
      .insertAdjacentHTML("afterbegin", responseText);
  });
