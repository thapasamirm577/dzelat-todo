let data: { id: number; name: string; age: string }[] = [];

const mainContainer = document.createElement("section");
mainContainer.setAttribute("id", "main-container");
document.body.appendChild(mainContainer);

const inputContainer = document.createElement("section");
inputContainer.setAttribute("id", "input-container");
mainContainer.appendChild(inputContainer);

document.body.setAttribute("style", "background-color: #010409; color: #fff;");
mainContainer.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 50px;"
);
inputContainer.setAttribute(
    "style",
    "width: 30%; min-width: 300px; padding: 20px; border-radius:8px; background-color: #0d1117; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-bottom: 20px;"
);

const btn = document.createElement("button");
btn.innerHTML = "Submit";
btn.setAttribute("id", "btn");
btn.setAttribute(
    "style",
    "background-color: #21262d; color: #fff; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;"
);

const header = document.createElement("h2");
inputContainer.appendChild(header);
header.innerHTML = "Enter Details";

header.setAttribute("style", " margin-bottom: 20px;");

const taskContainer = document.createElement("section");
taskContainer.setAttribute("id", "task-container");
taskContainer.setAttribute(
    "style",
    "width: 30%; min-width: 300px; padding: 20px; border-radius:8px; background-color: #0d1117; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-bottom: 20px;"
);

let list = document.createElement("ul");
let headerList = document.createElement("h3");
headerList.innerHTML = "List of Data";
headerList.setAttribute("style", "margin-bottom: 20px;");

list.setAttribute("style", "list-style-type: none;margin: 0;padding: 0;");

let form = document.createElement("form");
let inputName = document.createElement("input");
let inputAge = document.createElement("input");
let inputWrapper = document.createElement("div");
inputWrapper.setAttribute("class", "input-wrapper");
let inputWrapper2 = document.createElement("div");
inputWrapper2.setAttribute("class", "input-wrapper");
inputWrapper.appendChild(inputName);
inputWrapper2.appendChild(inputAge);
form.appendChild(inputWrapper);
form.appendChild(inputWrapper2);

inputContainer.appendChild(form);
let br = document.createElement("br");
form.appendChild(btn);

inputSetAttribute(inputName, {
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Enter name",
    required: "true",
    autofocus: "true",
    value: "",
    style: "width: 100%; background-color: transparent; height: 35px; color: #fff; border-radius: 4px; font-size: 16px; border: 1px solid rgba(255,255,255,0.5); padding: 5px 10px; outline: none;",
});

inputSetAttribute(inputAge, {
    type: "number",
    id: "age",
    name: "age",
    placeholder: "Enter age",
    required: "true",
    autofocus: "false",
    value: "",
    style: "width: 100%; background-color: transparent; height: 35px; color: #fff; border-radius: 4px; font-size: 16px; border: 1px solid rgba(255,255,255,0.5); padding: 5px 10px; outline: none;",
});

inputWrapper.setAttribute("style", "margin-bottom: 10px;");
inputWrapper2.setAttribute("style", "margin-bottom: 10px;");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    let nameHere = document.getElementById("name") as HTMLInputElement;
    let age = document.getElementById("age") as HTMLInputElement;
    if (nameHere.value.trim() === "" || age.value.trim() === "") {
        alert("Please enter valid data");
        return;
    }
    if (btn.innerHTML === "Submit") {
        let lengthData = data.length;
        let id: number;
        if (lengthData == 0) {
            id = 1;
        } else {
            id = data[lengthData - 1].id + 1;
        }
        const newData = {
            id: id,
            name: nameHere.value,
            age: age.value,
        };
        data.push(newData);
        nameHere.value = "";
        age.value = "";
        displayData(nameHere, age);
    }

    if (btn.innerHTML === "Update") {
        e.preventDefault();
        let hiddenId = document.getElementById(
            "hiddenInputId"
        ) as HTMLInputElement;
        const isExist = data?.find((x) => x.id === Number(hiddenId.value));
        if (isExist) {
            data.filter((x) => {
                if (x.id === Number(hiddenId.value)) {
                    x.name = nameHere.value;
                    x.age = age.value;
                }
                return x;
            });
        }
        nameHere.value = "";
        age.value = "";
        btn.innerHTML = "Submit";
        hiddenId.parentNode!.removeChild(hiddenId);
        displayData(nameHere, age);
    }
});

function displayData(nameHere: HTMLInputElement, age: HTMLInputElement) {
    if (data.length == 0) {
        return;
    } else {
        mainContainer.appendChild(taskContainer);
        taskContainer.insertBefore(headerList, taskContainer.firstChild);
        taskContainer.insertBefore(list, taskContainer.nextSibling);
        list.innerHTML = "";
        let i = 0;
        data.forEach((item) => {
            i++;
            let li = document.createElement("li");
            let appendedlistVal = `${i}. ${item.name} is ${item.age} years old`;
            li.setAttribute("id", `child${item.id}`);
            li.innerHTML = appendedlistVal;

            let deleteIcon = document.createElement("i");
            deleteIcon.setAttribute("class", "fas fa-trash");
            deleteIcon.setAttribute(
                "style",
                "margin-left: 10px; color: #f85149;"
            );
            let deleteBtn = document.createElement("button");

            deleteBtn.setAttribute("id", `delete${item.id}`);
            deleteBtn.appendChild(deleteIcon);

            const editBtn = document.createElement("button");
            editBtn.setAttribute("id", `edit${item.id}`);
            const editIcon = document.createElement("i");
            editIcon.setAttribute("class", "fas fa-edit");
            editIcon.setAttribute("style", "margin-left: 10px; color: #fff;");

            let actionBtnContainer = document.createElement("div");
            actionBtnContainer.setAttribute("class", "action-btn-container");
            actionBtnContainer.appendChild(editBtn);
            actionBtnContainer.appendChild(deleteBtn);
            editBtn.appendChild(editIcon);

            li.appendChild(actionBtnContainer);

            list.appendChild(li);
            li.setAttribute(
                "style",
                "margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;"
            );

            deleteBtn.addEventListener("click", () => {
                let child = document.getElementById(`child${item.id}`);
                child!.parentNode!.removeChild(child!);
                data = data.filter((x) => x.id !== item.id);
            });

            editBtn.addEventListener("click", () => {
                const itemId = item?.id;
                const itemFilter = data.filter((x) => x.id === itemId)[0];
                nameHere.value = itemFilter.name;
                age.value = itemFilter.age;
                btn.innerHTML = "Update";
                let hiddenInputId = document.createElement("input");

                inputSetAttribute(hiddenInputId, {
                    type: "hidden",
                    id: "hiddenInputId",
                    name: "hiddenInputId",
                    value: `${itemFilter.id}`,
                    required: "",
                    autofocus: "false",
                    placeholder: "",
                    style: "",
                });
                btn.parentNode!.insertBefore(hiddenInputId, btn);
            });
        });
    }
}

// set attribute for input
function inputSetAttribute(
    name: HTMLElement,
    data: {
        required: string;
        autofocus: string;
        type: string;
        id: string;
        name: string;
        placeholder: string;
        style: string;
        value: string;
    }
) {
    name.setAttribute("required", `${data.required}`);
    name.setAttribute("autofocus", `${data.autofocus}`);

    name.setAttribute("type", `${data.type}`);
    name.setAttribute("id", `${data.id}`);
    name.setAttribute("name", `${data.name}`);
    name.setAttribute("placeholder", `${data.placeholder}`);
    name.setAttribute("style", `${data.style}`);
    if (data.type === "hidden") {
        name.setAttribute("value", `${data.value}`);
    }
}
