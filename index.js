const breakObj = {
    plusBtn: document.getElementById('break-length-plus'),
    minusBtn: document.getElementById('break-length-minus'),
    contentCount: document.getElementById('break-content'),
    contentTimer: document.getElementById('display-break'),
    value: 1,
    second: 0,
    timer: undefined,
    isRunning: false,
}

const sessionObj = {
    plusBtn: document.getElementById('session-length-plus'),
    minusBtn: document.getElementById('session-length-minus'),
    contentCount: document.getElementById('session-content'),
    contentTimer: document.getElementById('display-session'),
    value: 1,
    second: 0,
    timer: undefined,
    isRunning: false,
}

slider = {
    display: document.querySelector('.display'),
    area: document.querySelector('.slider'),
    firstValueSession: 0,
    firstValueBreak: 0,
    value: 0,
    sliderWidth: 0
}

let isTimerRunning = false

breakObj.plusBtn.onclick = () => {
    if (!isTimerRunning) {
        breakObj.value++
        breakObj.contentCount.textContent = breakObj.value
    }
}

breakObj.minusBtn.onclick = () => {
    if (!isTimerRunning) {
        breakObj.value--
        if (breakObj.value < 0) breakObj.value = 0
        breakObj.contentCount.textContent = breakObj.value
    }
}

sessionObj.plusBtn.onclick = () => {
    if (!isTimerRunning) {
        sessionObj.value++
        sessionObj.contentCount.textContent = sessionObj.value
    }
}

sessionObj.minusBtn.onclick = () => {
    if (!isTimerRunning) {
        sessionObj.value--
        if (sessionObj.value <= 0) sessionObj.value = 0
        sessionObj.contentCount.textContent = sessionObj.value
    }
}

const pauseTimer = (t) => {
    clearInterval(t);
    isTimerRunning = false
}

const resetValue = () => {
    isTimerRunning = false
    sessionObj.isRunning = false
    sessionObj.value = sessionObj.contentCount.textContent

    breakObj.isRunning = false
    breakObj.value = breakObj.contentCount.textContent

    if (sessionObj.value == 1 && !sessionObj.isRunning) slider.firstValueSession = (sessionObj.value * 60)
    else slider.firstValueSession = (sessionObj.value * 60) + sessionObj.second

    if (breakObj.value == 1 && !breakObj.isRunning) slider.firstValueBreak = (breakObj.value * 60)
    else slider.firstValueBreak = (breakObj.value * 60) + breakObj.second
}

const sessionTimer = () => {
    sessionObj.isRunning = true;
    if (sessionObj.value == 1) sessionObj.second = 0

    slider.width = 0

    sessionObj.timer = setInterval(() => {
        isTimerRunning = true

        sessionObj.second--;
        if (sessionObj.second <= 0) {
            sessionObj.second = 60
            sessionObj.value--
        }

        sessionObj.contentTimer.textContent = `${sessionObj.value} : ${sessionObj.second}`
        slider.value = (sessionObj.value * 60) + sessionObj.second
        slider.width = 100-parseInt((100 * (slider.value)) / slider.firstValueSession)

        if (sessionObj.value < 0) {
            sessionObj.contentTimer.textContent = 'SESSION'
            sessionObj.second = 0
            sessionObj.value = 0
            slider.width = 0
            pauseTimer(sessionObj.timer)
            sessionObj.isRunning = true
            isTimerRunning = false
            startTimer('BREAK')
        }
        // console.log('sliderWidth:', slider.width, slider.firstValueSession);

        slider.area.style.width = `${slider.width}%`

    }, 200);
}

const breakTimer = () => {
    breakObj.isRunning = true;
    if (breakObj.value == 1) breakObj.second = 0

    slider.width = 0

    breakObj.timer = setInterval(() => {
        isTimerRunning = true

        breakObj.second--;
        if (breakObj.second <= 0) {
            breakObj.second = 60
            breakObj.value--
        }

        breakObj.contentTimer.textContent = `${breakObj.value} : ${breakObj.second}`
        slider.value = (breakObj.value * 60) + breakObj.second
        slider.width =100- parseInt((100 * (slider.value)) / slider.firstValueBreak)

        if (breakObj.value < 0) {
            breakObj.contentTimer.textContent = 'BREAK'
            breakObj.second = 0
            breakObj.value = 0
            pauseTimer(breakObj.timer)
            resetValue()
        }

        // console.log('sliderWidth:', slider.width, slider.firstValueBreak);

        slider.area.style.width = `${slider.width}%`

    }, 200);
}

const startTimer = (timerSession) => {
    if (timerSession === 'SESSION') sessionTimer()
    if (timerSession === 'BREAK') breakTimer()
    // console.log(timerSession);
}

slider.display.onclick = () => {
    if ((!sessionObj.isRunning && !breakObj.isRunning && !isTimerRunning) ||
        (sessionObj.isRunning && !breakObj.isRunning && !isTimerRunning))
        startTimer('SESSION')


    if ((sessionObj.isRunning && breakObj.isRunning && !isTimerRunning))
        startTimer('BREAK')

    if (isTimerRunning && sessionObj.isRunning && !breakObj.isRunning) pauseTimer(sessionObj.timer)
    if (isTimerRunning && sessionObj.isRunning && breakObj.isRunning) pauseTimer(breakObj.timer)


    console.log('timer runnign:' + isTimerRunning, sessionObj, breakObj);

}

resetValue()