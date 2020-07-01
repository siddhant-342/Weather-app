

const weatherForm = document.querySelector('form')

const search = document.querySelector('input')

const message = document.querySelector('#message')
weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()
    const city = search.value

    message.textContent = "Loading..."
    fetch("http://localhost:3000/weather/?city=" + city).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            message.textContent = data.error
        } else {
            message.innerHTML = data.forecast
        }
    })
})
})