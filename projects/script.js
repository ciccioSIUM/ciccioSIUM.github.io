const puntatoreMouse = document.querySelector(".cursori")
const cursore = document.querySelector(".cursore")
let cursoreSrc = cursore.src
const elementi = document.querySelectorAll(".elemento")
const intestazione = document.querySelector('.intestazione')

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
        cambiaCursore("../cursors/cursor-svgrepo-com.svg")
        return
    }
    if(interattivo.dataset.cursore === "mano"){
        cambiaCursore("../cursors/hand-pointer.svg")
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
    })
},
{
    threshold: 0.1,
})

elementi.forEach(elemento => {
    osservatore.observe(elemento)
})

const griglia = document.getElementById('griglia')
const dettaglio = document.getElementById('dettaglio')
const btnIndietro = document.getElementById('btn-indietro')
const btnSito = document.querySelector('#btn-sito')
 
function mostraDettaglio(scheda) {
    const titolo = scheda.dataset.titolo || 'Progetto'
    const descrizione = scheda.dataset.descrizione || ''
    const github = scheda.dataset.github || '#'
    const tecnologie = (scheda.dataset.tecnologie || '').split(',').filter(Boolean)
    const sito = scheda.dataset.sito || ''
 
    document.querySelector('#dettaglio-titolo').textContent = titolo
    document.querySelector('#dettaglio-descrizione').textContent = descrizione
    document.querySelector('#btn-github').href = github


    const contenitoreEtichette = document.querySelector('#dettaglio-etichette')
    contenitoreEtichette.innerHTML = ''
    tecnologie.forEach(t => {
        const span = document.createElement('span')
        span.className = 'etichetta-dettaglio'
        span.textContent = t.trim()
        contenitoreEtichette.appendChild(span)
    })
 
    griglia.style.display = 'none'
    intestazione.style.display = 'none'
    dettaglio.style.display = 'block'
    if (sito) {
        btnSito.href = sito
        btnSito.style.display = 'inline-block'
    } else {
        btnSito.style.display = 'none'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
 
document.querySelectorAll('.apri-dettaglio').forEach(btn => {
    btn.addEventListener('click', (e) => {
        mostraDettaglio(btn.closest('.scheda'))
    })
})
 
btnIndietro.addEventListener('click', () => {
    dettaglio.style.display = 'none'
    intestazione.style.display = 'block'
    griglia.style.display = 'grid'
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
