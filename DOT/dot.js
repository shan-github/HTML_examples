let width, height, interval, attempts = 0,
    startTime = 0,
    message=document.createElement('p') ,
    messInterval = null,
    temp = ['Hi! I am a dot', 'You can\'t catch me', 'Try to catch me as fast as possible']


    $(window).ready(e => {
        width = $(document).width()
        height = $(document).height()
        $(window).on('resize', e => {
            width = $(window).width()
            height = $(window).height()
        })
        $('#dot').append(message)
        animateMessage()
    })
const animateMessage = () => {
    $(message)
            .animate({opacity:1},100,'linear',()=>{})
            .text(temp[parseInt(Math.random() *10) % temp.length])
            .delay(2000)
            .animate({opacity:0},100,'linear',()=>{})
    }
messInterval = setInterval(animateMessage, 3000)

$('#dot').on('mousedown', e => {
    if (interval != undefined | null) {
        createModal('Wow! You successfully caught the dot')
        $('.attempttext').text(`Attempts: ${attempts}`)
        $('.time').text(`Time: ${(new Date().getTime()-startTime)/1000.0} seconds`)
    }
    stop()
    attempts = 0
})
$('#attempt').click(e => {
    if (interval != undefined | null)
        attempts += 1
})
const randomLoc = () => {
    dot.style.top = Math.random() * height - 30
    dot.style.left = Math.random() * width - 30
}

const createModal = text => {
    let modal = document.createElement('div'),
        mask = document.createElement('div'),
        h = document.createElement('h3'),
        att = document.createElement('p'),
        t = document.createElement('p'),
        btn = document.createElement('span')

    $(modal).addClass('modal')
    $(h).text(text)
    $(att).addClass('attempttext')
    $(t).addClass('time')
    $(btn).text('x').click(() => {
        document.body.removeChild(mask)
        dismiss(modal)
    })
    $(modal).append(h).append(att).append(t).append(btn)
    $('body').append(modal).append(mask)

    $(mask).addClass('mask')
        .css('background-color', 'rgba(0,0,0,0.3)')
        .animate({
            opacity: 1
        }, 200, () => {})
    $(modal).animate({
        opacity: 1
    }, 300, () => {})
}

const start = () => {
    $(message).remove()
    clearInterval(messInterval)
    startTime = new Date().getTime()
    randomLoc()
    interval = setInterval(randomLoc, 500)
}
const stop = () => {
    clearInterval(interval)
    interval = null
}

const dismiss = elm => {
    $('.modal').animate({
        opacity: 0
    }, 200, () => {
        document.body.removeChild(elm)
    })
}
