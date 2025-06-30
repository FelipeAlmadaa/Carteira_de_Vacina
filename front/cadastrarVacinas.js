async function fetchRegisteredVaccines() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Você precisa fazer login para ver suas vacinas.");
    window.location.href = "login.html";
    return [];
  }

  try {
    const response = await fetch("https://carteira-de-vacina.onrender.com/api/vacinas", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.filter(v => v.aplicada).map(v => v.codigo);
  } catch (error) {
    console.error("Erro ao buscar vacinas cadastradas:", error);
    alert("Erro ao buscar vacinas cadastradas.");
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM carregado, buscando vacinas registradas...");
  const registeredVaccines = await fetchRegisteredVaccines();
  console.log("Vacinas registradas recebidas:", registeredVaccines);

  const filterButtons = document.querySelectorAll(".filter-button");
  const vaccineSections = document.querySelectorAll(".vaccine-section");
  const confirmRegisterButton = document.getElementById("confirmRegisterButton");
  const registerVaccineButtons = document.querySelectorAll(".register-vaccine-button");

  const selectedVaccines = new Set();

  registerVaccineButtons.forEach((button) => {
    const vaccineId = button.dataset.vaccineId;
    if (registeredVaccines.includes(vaccineId)) {
      button.disabled = true;
      button.textContent = "Vacina Registrada";
      button.classList.add("registered");
    }
  });

  showVaccineSection("18-plus");

  function showVaccineSection(ageGroupSuffix) {
    vaccineSections.forEach((section) => {
      section.classList.toggle(
        "hidden",
        section.id !== `section-${ageGroupSuffix}`
      );
    });

    filterButtons.forEach((button) => {
      button.classList.toggle(
        "active",
        button.dataset.ageGroup === ageGroupSuffix
      );
    });
  }

  function toggleVaccineSelection(button) {
    const vaccineId = button.dataset.vaccineId;

    if (selectedVaccines.has(vaccineId)) {
      selectedVaccines.delete(vaccineId);
      button.textContent = "Registrar Vacina";
      button.classList.remove("selected");
    } else {
      selectedVaccines.add(vaccineId);
      button.textContent = "Selecionada";
      button.classList.add("selected");
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      showVaccineSection(this.dataset.ageGroup);
    });
  });

  registerVaccineButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toggleVaccineSelection(this);
    });
  });

  confirmRegisterButton.addEventListener("click", function () {
    if (selectedVaccines.size === 0) {
      alert("Selecione pelo menos uma vacina.");
      return;
    }

    const vacinas = Array.from(selectedVaccines);
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa fazer login para registrar vacinas.");
      window.location.href = "login.html";
      return;
    }

    fetch("https://carteira-de-vacina.onrender.com/api/vacinas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vacinas }),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Vacinas registradas com sucesso!");
          window.location.href = "telaPrincipal.html";
        }
      })
      .catch((error) => {
        console.error("Erro ao registrar vacinas:", error);
        alert("Erro ao registrar vacinas.");
      });
  });
});
