const puntatoreMouse = document.querySelector(".cursori")
const cursore = document.querySelector(".cursore")
let cursoreSrc = cursore.src
const elementi = document.querySelectorAll(".elemento")

const animazione = e => {
    const x = e.clientX - puntatoreMouse.offsetWidth / 2
    const y = e.clientY - puntatoreMouse.offsetHeight / 2
    puntatoreMouse.style.transform = `translate(${x}px, ${y}px)`
}

const cambiaCursore = cursoreNuovo => {
    if(cursoreSrc === cursoreNuovo) return
    cursoreSrc = cursoreNuovo
    cursore.classList.add("cambia")
    setTimeout(() => {
        cursore.src = cursoreSrc
        cursore.classList.remove("cambia")
    }, 200)
}

const doveSiTrova = e => {
    const interattivo = e.target.closest("[data-cursore]")
    if (!interattivo){
        cambiaCursore("/cursors/cursor-svgrepo-com.svg")
        return
    } 
    switch(interattivo.dataset.cursore){
        case "mano":
            cambiaCursore("/cursors/hand-pointer.svg")
            break
        case "scendi":
            cambiaCursore("/cursors/puntator.svg")
            break
        default:
            console.log("È stato rilevato un errore!")
    }
}

window.addEventListener("pointermove", e => {
    animazione(e)
    doveSiTrova(e)
})

const osservatore = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        entry.target.classList.toggle("visibile", entry.isIntersecting)
        if(entry.isIntersecting) osservatore.unobserve(entry.target)
    },
)
},
{
    threshold: 0.5,
})

elementi.forEach(elemento => {
    osservatore.observe(elemento)
})