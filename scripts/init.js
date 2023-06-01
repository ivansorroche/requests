


function init() {
  const dogsListArea = document.getElementById('dogs-list')
  const dogSingle = document.getElementById('dog-single')
  const dogtype = document.getElementById('dog-type')



  dogsListArea.innerHTML = '<li>Nenhum item na lista</li>'
  dogSingle.innerHTML = 'nenhum cachorro selecionado'

  function getAttributePromise(id){
     if (id) {
       fetch('https://dogapi.dog/api/v2/breeds')
       .then((response) => {
         return response.json()
      })
      .then((data) => {
      if(data) {
         const dogList = data.data
         const dogFiltered = dogList.filter(d => d.id === id) 
         console.log(dogFiltered, 'filter')
         dogtype.innerHTML = dogFiltered[0].attributes.name
         dogSingle.innerHTML = dogFiltered.map(item => `<li> ${item.attributes.description}</li>
         `)
        }
      })
    }
  }

  async function getAttributeAsync(id){
    try {
      const fetchResponse = await fetch('https://dogapi.dog/api/v2/breeds')
      const response = await fetchResponse.json()
      const dogFiltered = response.data.filter(d => d.id === id)
      
      dogtype.innerHTML = dogFiltered[0].attributes.name
      dogSingle.innerHTML = dogFiltered.map(item => `<li> ${item.attributes.description}</li>
      `)
    } catch(e) {
      console.log(e)
    } 
  }


 fetch('https://dogapi.dog/api/v2/breeds')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    if(data) {
      const dogList = data.data
      dogsListArea.innerHTML = dogList.map(d => `
      <li>
        <button class="dogButton" data-dog="${d.id}"}>
          ${d.attributes.name}
        </button> <br>
      </li>
      `).join('')
      addListenerToButtons() 
    }
  })

  function addListenerToButtons() {
    const allDogButtons = document.querySelectorAll('.dogButton')
  
    allDogButtons.forEach(box => {
      box.addEventListener('click', function handleClick(event) {
        getAttributeAsync(event.target.getAttribute('data-dog'))
      })
    })
  }


}

init()