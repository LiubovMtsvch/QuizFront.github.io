document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("signup-confirm-password").value;

      if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert("Регистрация успешна!");
          window.location.href = "dashboard.html";
        } else {
          alert(data.error || "Ошибка регистрации");
        }

      } catch (error) {
        alert("Не удалось подключиться к серверу");
        console.error(error);
      }
    });
  }
});
