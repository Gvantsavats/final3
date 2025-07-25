const productsContainer = document.getElementById("products");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

fetch("https://warrior.ge/api/products")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      console.log(product);

      const productCard = document.createElement("div");
      productCard.classList.add("product");

      productCard.innerHTML = `
        <img src="${product.photo}" />
        <h3>${product.brand}</h3>
        <p>${product.description}</p>
        <p>Price: ${product.price}₾</p>
        ${product.discount_price ? `<p>ფასდაკლებული ${product.discount_price}₾</p>` : ""}
        <button class="more-info-btn" data-id="${product.id}">დეტალურად</button>
      `;

      const moreInfoButton = productCard.querySelector(".more-info-btn");
      moreInfoButton.addEventListener("click", () => {
        modal.style.display = "block";
      });

      productsContainer.appendChild(productCard);
    });
  });
  function showModal(product) {
    const modalContent = document.getElementById("modalContent");
  
 
    modalContent.innerHTML = `
      <h2>${product.brand} - ${product.title}</h2>
      <img src="${product.photo}" alt="${product.title}" />
      <p>${product.description}</p>
      <p>Price: ${product.price}₾</p>
      ${product.discount_price ? `<p>ფასდაკლებული:${product.discount_price}₾</p>` : ""}
    `;
  

    modal.style.display = "block";
  }
  
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});


const form = document.getElementById("myform");
const errorsContainer = document.getElementById("formErrors");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  let errors = [];

  if (name.length < 3) {
    errors.push("სახელი უნდა შეიცავდეს მინიმუმ 3 სიმბოლოს.");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errors.push("ელ.ფოსტა არასწორია.");
  }

  const phonePattern = /^[0-9]{3}[- ]?[0-9]{3}[- ]?[0-9]{3}$/;
  if (!phonePattern.test(phone)) {
    errors.push("ტელეფონის ნომერი არასწორია, გთხოვთ მიუთითოთ ხელახლა.");
  }

  if (message === "") {
    errors.push("გთხოვთ, მიუთითეთ შეტყობინება.");
  }

  if (errors.length > 0) {
    errorsContainer.innerHTML = errors.map((err) => `<p>${err}</p>`).join("");
  } else {
    errorsContainer.innerHTML =
      "<p style='color: green;'>ფორმა წარმატებით გაიგზავნა ✅</p>";
    form.reset();
  }
});
const toggleBtn = document.getElementById("toggleTheme");
