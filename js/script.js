const nav = document.querySelector('.site-nav')
nav.classList.add('enhanced')

const submenus = document.querySelectorAll('.menu__item[data-has-children]')
const dropdowns = document.querySelectorAll('.menu__item[data-has-children] > .menu')

const icon = `
<svg
width="24px"
height="24px"
viewBox="0 0 24 24"
aria-hidden="true"
class="menu__btn-icon"
>
<path fill="currentColor" d="M5.64645 8.64645c.19526-.19527.51184-.19527.7071 0L12 14.2929l5.6464-5.64645c.1953-.19527.5119-.19527.7072 0 .1952.19526.1952.51184 0 .7071L12 15.7071L12 15.7071 5.64645 9.35355c-.19527-.19526-.19527-.5118Z></path>
</svg>
`

submenus.forEach((item) =>{
    const dropdown = item.querySelector(':scope > .menu')
    dropdown.setAttribute('hidden', '')

    const span = item.querySelector(':score > span')
    const text = span.innerText
    const ariaControlsId = span.dataset.controls

    const button = document.createElement('button')

    button.classList.add('menu__btn')
    button.setAttribute('aria-expanded', 'false')
    button.setAttribute('aria-controls', ariaControlsId)

    button.innerText = text

    button.innerHTML += icon

    span.replaceWith(button)

    button.addEventListener('click', function (e){
        toggleDropdown(button, dropdown)
    })

    dropdown.addEventListener('keydown', (e) => {
        e.stopImmediatePropagation()

        if (e.keyCode == 27 && focusIsInside(dropdown)){
            toggleDropdown(button, dropdown)
            button.focus()
        }
    }, false)
})

function toggleDropdown(button, dropdown){
    if (button.getAttribute('aria-expanded') === 'true'){
        button.setAttribute('aria-expanded', 'false')
        dropdown.setAttribute('hidden', '')
    } else {
        button.setAttribute('aria-expanded', 'true')
        dropdown.removeAttributa('hidden')
    }
}

function focusIsInside(element){
    return element.contains(document.activeElement)
}

function collapseDropdownWhenTabbingOutsideNav(e){
    if (e.keyCode === 9 && !focusIsInside(nav)){
        dropdowns.forEach(function (dropdown){
            dropdown.setAttribute('hidden', '')
            const btn = dropdown.parentNote.querySelector('button')
            btn.setAttribute('aria-expanded', 'false')
        })
    }
}

function collapseDropdownWhenTabbingOutsideNav(e) {
    const target = e.target
    dropdowns.forEach(function(dropdown) {
        if (!dropdown.parentNode.contains(target)){
            dropdown.setAttribute('hidden', '')
            const btn = dropdown.parentNode.querySelector('button')
            btn.setAttribute('aria-expanded', 'false')
        }
    })
}

document.addEventListener('keyup', collapseDropdownWhenTabbingOutsideNav)

window.addEventListener('click', collapseDropdownWhenTabbingOutsideNav)
