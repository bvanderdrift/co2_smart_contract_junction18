window.onload = () => {
    initializeEventListeners(); 
}

let initializeEventListeners = () => {
    addWindowTogglers();
    addWindowCloser();
    addImageChanger();
    addFormHandler();
}

let addWindowTogglers = () => {
    Array.from(document.getElementsByClassName("choice-button")).map(elem => {
        elem.addEventListener("click", (e) => {
            toggleWindow(e);
        });
    });
}

let toggleWindow = (e) => {
    let targetWindow = e.target.id.replace("button", "window");
            
    let targetWindowElem = document.getElementById(targetWindow);
    let elemClassList = targetWindowElem.classList;
        
    if(elemClassList.contains("show")) {
        elemClassList.remove("show");
    } else {
        elemClassList.add("show");
    }
}

let addWindowCloser = () => {
    Array.from(document.getElementsByClassName("close-button")).map(elem => {
        elem.addEventListener("click", () => {
            let windows = ["returning-farmer-window", "new-farmer-window"];
            windows.map(win => {
                let elem = document.getElementById(win);
                let elemClassList = elem.classList;
                if (elemClassList.contains("show")) {
                    elemClassList.remove("show");
                }
                elem.classList = elemClassList;
            });
        });
    });
}

let addImageChanger = () => {
    document.getElementById("map-image").addEventListener("click", (e) => {
        e.target.src = "img/zoomedmapimage.jpg";
        document.getElementById("coordinates").value = "60.192059&24.945831";
    });
}

let addFormHandler = () => {
    document.getElementById("new-farmer-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let jsonBody = {};
        Array.from(document.getElementById("new-farmer-form").querySelectorAll("input")).map(inputElem => {
            if (inputElem.type != "submit") {
                jsonBody[inputElem.name] = inputElem.value;
            }
        });
        fetch("http://localhost:8080/submitOffer",
        {
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            mode: "no-cors",
            method: "POST",
            body: JSON.stringify(jsonBody)
        })
        .then(() => {
            alert("Data submitted to the blockchain");
            window.location = window.location;
        });
    });
}