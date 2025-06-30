
  // Garante que o contêiner só seja criado uma vez
  if (!document.getElementById("custom-alert-container")) {
    const container = document.createElement("div");
    container.id = "custom-alert-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.left = "50%";
    container.style.transform = "translateX(-50%)";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    document.body.appendChild(container);
  }

  // Substitui alert padrão por modal customizado
  window.alert = function (message) {
    const alertBox = document.createElement("div");
    alertBox.textContent = message;
    alertBox.style.backgroundColor = "#333";
    alertBox.style.color = "#fff";
    alertBox.style.padding = "12px 20px";
    alertBox.style.borderRadius = "8px";
    alertBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    alertBox.style.fontFamily = "Arial, sans-serif";
    alertBox.style.fontSize = "16px";
    alertBox.style.transition = "opacity 0.5s ease";
    alertBox.style.opacity = "1";

    // Adiciona ao container
    const container = document.getElementById("custom-alert-container");
    container.appendChild(alertBox);

    // Remove com fade após 3s
    setTimeout(() => {
      alertBox.style.opacity = "0";
      setTimeout(() => {
        alertBox.remove();
      }, 500); // tempo de fade
    }, 3000);
  };
