/*
	Mission1. 도서 추가 기능
	+ 도서명과 가격을 입력 후 "확인" 버튼 클릭 또는 엔터키 입력 시 도서를 추가한다. 
	+ 도서명과 가격을 입력 후 "엔터키" 입력 시 도서가 추가된다.
	+ 입력값이 누락되었을 경우 추가되지 않는다. (예외사항)
	+ 도서 추가가 완료되면 입력 필드는 초기화한다.
	+ 도서 추가 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.

	Mission2. 도서 수정기능
	+ 도서 정보의 "수정" 버튼 클릭시 모달 창이 뜬다.
	+ 모달 창을 통해 도서명과 가격을 수정할 수 있다.
	- 모달창을 통해 신규 도서명, 가격을 입력받고 저장 버튼 클릭시 도서명과 가격을 수정할 수 있다.

	Mission3. 도서 삭제기능
	- 도서 정보의 "삭제" 버튼 클릭시 브라우저에 제공되는 confirm 창을 띄운다.
	- 해당 confirm 창에서 "확인" 버튼이 클릭되면 해당 도서가 삭제된다.
	- 도서 삭제 완료 시 도서의 갯수를 카운팅 하여 화면에 표현한다.
*/

const $ = (selector) => document.querySelector(selector);

function Product() {
  const updateBookCount = () => {
    const bookCount = $("#book-list").children.length;
    $("#book-count").innerText = bookCount;
  };

  const addBook = () => {
    const bookName = $("#book-name-input").value;
    const bookPrice = Number($("#book-price-input").value);

    if (!bookName || !bookPrice) {
      alert("값이 누락되었습니다. 값을 다 입력해주세요.");
      return;
    }

    const bookItem = `
				<li class="book-item">
					<div class="book-info">
						<span class="book-name">${bookName}</span>
						<span class="book-price">₩${bookPrice.toLocaleString("ko")}</span>
					</div>
					<div class="book-actions">
						<button class="edit-btn modal-toggle-btn" data-modal-target="editModal">수정</button>
						<button class="delete-btn">삭제</button>
					</div>
				</li>`;

    $("#book-list").insertAdjacentHTML("beforeend", bookItem);

    $("#book-regist-form").reset(); // 입력값 초기화
    $("#book-name-input").focus();

    updateBookCount();
  };

  const openEditModal = (e) => {
    const $bookItem = e.target.closest(".book-item");

    const bookName = $bookItem.querySelector(".book-name").innerText;
    const bookPrice = $bookItem
      .querySelector(".book-price")
      .innerText.replace("₩", "")
      .replace(/,/g, "");

    // NodeList를 Array 객체로 만들어 indexOf 사용
    const bookIndex = [...$("#book-list").children].indexOf($bookItem);

    $("#edit-book-index").value = bookIndex;
    $("#edit-book-name").value = bookName;
    $("#edit-book-price").value = bookPrice;
  };

  const deleteBook = (e) => {
    const $bookItem = e.target.closest(".book-item");
    const bookName = $bookItem.querySelector(".book-name").innerText;

    if (confirm(`${bookName}을(를) 정말 삭제하시겠습니까?`)) {
      $bookItem.remove();
      updateBookCount();
    }
  };

  const editBook = () => {
    const editBookIndex = $("#edit-book-index").value;
    const editBookName = $("#edit-book-name").value;
    const editBookPrice = Number($("#edit-book-price").value);

    const $bookToEdit = $("#book-list").children[editBookIndex];
    $bookToEdit.querySelector(".book-name").innerText = editBookName;
    $bookToEdit.querySelector(
      ".book-price"
    ).innerText = `₩${editBookPrice.toLocaleString()}`;

    $("#editModal .modal-close").click();
  };

  // Mission1. 도서 추가
  // 1) 엔터키 입력 또는 확인 버튼 클릭시 (form submit시)
  $("#book-regist-form").addEventListener("submit", (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    addBook();
  });

  // Mission2. 도서 수정 / 삭제
  $("#book-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
      openEditModal(e);
    } else if (e.target.classList.contains("delete-btn")) {
      deleteBook(e);
    }
  });

  $("#book-edit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    editBook();
  });
}

const product = new Product();
