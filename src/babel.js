const start = async () => {
    return await Promise.resolve('Is working')
}

start().then(console.log)

class Me {
    static id = Date.now()
}

import('lodash').then( here => {
    console.log('lodash is here')
})

console.log(Me.id)