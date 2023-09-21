const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI Objesini Başlatma

const ui = new UI();

// Storage Objesi Üret
const storage = new Storage();


// Eventleri Yükleme

eventLİsteners();

function eventLİsteners(e){

    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        //Hata
        ui.displayMessages("danger","Tüm Alanları Doldurunuz!")
    }
    else{
        // Yeni Film
        const newFilm = new Film(title,director,url);
        // Arayüze Ekleme
        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);
        ui.displayMessages("success","Film Başarıyla Eklendi")
    }
    ui.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}
function deleteFilm(e){
    if (e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target)
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("info","Film Başarıyla Kaldırıldı...")
    }
}

function clearAllFilms(){
    if (confirm("Tümünü Silmek İstediğinizden Emin Misiniz ?")){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
    }
}