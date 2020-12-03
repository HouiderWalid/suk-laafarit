var a = 0
const function1 = async (callback) => {
    await setTimeout(
        () => a = 10,
        2000
    )

    callback(a)
}
function1((a) => console.log(a))
console.log("hello")

const function2 = () => {
    return 'function2'
} 

const gitFunction(){
    return 'git function';
}
