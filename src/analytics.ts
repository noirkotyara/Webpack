import * as $ from 'jquery'

const analyticsClicker = () => {
    let clicksCount: number = 0,
        isDeleted: boolean = false
    const clicker = (): number => clicksCount++


    $(document).on('click', clicker)
    return {
        delete() {
            $(document).off('click', clicker)
            isDeleted = true
        },
        getClicks() {
            return isDeleted ? 'Don`t listen you anymore' : clicksCount
        }
    }
}

window['analytics'] = analyticsClicker()