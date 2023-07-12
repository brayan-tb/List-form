const error = (mensagem) => {
    const message = document.querySelector("#message");
    message.style.color = "red"
    message.textContent = mensagem
    console.log(mensagem);
};

const submit = () => {

    const loaderIcon = document.querySelector("#loading");
    console.log(loaderIcon)
    loaderIcon.style.display = "block"
    document.querySelector("#save").setAttribute("disabled", true);
    document.querySelector("#saveText").textContent = " ";
    
    setTimeout(function() {
        // Envio do formulário
        const nameInput = document.querySelector("input#name").value;
        const recommendRadio = document.querySelector(
            "input[type=radio][name=recommend]:checked"
        ).value;
        const featuresCheckbox = document.querySelectorAll("input[type=checkbox][name=features]:checked");
        const ratingSelect = document.querySelector("select#rating").value;
        let featuresItems = [];
    
        featuresCheckbox.forEach((element) => {
            featuresItems.push(element.value);
        });
    
        const html = `
            <li>
                <div class="item"></div>
                <div class="item-details">
                    <div class="item-name">${nameInput}</div>
                    <div class="item-features">${featuresItems.toString()}</div>
                    <div class="item-rating">Avaliação: ${ratingSelect}</div>
                    <div class="item-recommend">Recomendaria: ${recommendRadio}</div>
                </div>
            </li>
        `;
    
        const itemList = document.querySelector(".list-item");
        itemList.innerHTML += html;

        // let loaderIcon = document.querySelector("#loading");
        console.log(loaderIcon.style)
        loaderIcon.style.display = "none"
        document.querySelector("#save").disabled = false;
        document.querySelector("#saveText").textContent = "Salvar";
        document.querySelector("button#reset").click();

        const message = document.querySelector("#message");
        message.style.color = "green"
        message.textContent = "Salvo com sucesso!"
        
      }, 2000);
      

};

const handleSubmit = (onSubmit, onError, self) => {
    const nameInput = self.querySelector("input#name");
    const recommendRadio = self.querySelector(
        "input[type=radio][name=recommend]:checked"
    );
    const featuresCheckbox = self.querySelectorAll(
        "input[type=checkbox][name=features]:checked"
    );
    const ratingSelect = self.querySelector("select#rating");
    const nameLength = nameInput.value.length;

    if (nameLength < 2) {
        return onError("Nome do produto inválido!");
    }
    if (
        !recommendRadio ||
        featuresCheckbox.length < 1 ||
        ratingSelect.value.length < 1
    ) {
        return onError("Opção não selecionada!");
    }

    onSubmit(self);
};

window.onload = () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        handleSubmit(submit, error, this);
    });
};
