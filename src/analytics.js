const analyticsClicker = () => {
    let clicksCount = 0,
        isDeleted = false
    const clicker = () => clicksCount++


    document.addEventListener('click', clicker)
    return {
        delete(){
            document.removeEventListener('click', clicker)
            isDeleted = true
        },
        getClicks(){
           return isDeleted ? 'Don`t listen you anymore': clicksCount
        }
    }
}

window.analytics = analyticsClicker()