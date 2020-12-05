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

function func2(){
    return 'func2';
}