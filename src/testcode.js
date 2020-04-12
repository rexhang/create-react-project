// demo code

// eg1
class Demo {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	start() {
		return `name: ${this.name} age ${this.age}`;
	}
}

let demo = new Demo('rex', '18');

const str = demo.start();
console.log(str);

// eg2
// const getData = () => {
// 	return new Promise((resolve, reject)=>{
// 		const condition = true;
// 		if (condition){
// 			window.setTimeout(()=>{
// 				resolve('get success')
// 			}, 1000);
// 		} else{
// 			window.setTimeout(()=>{
// 				reject('get success')
// 			}, 1000);
// 			reject('get error');
// 		}
// 	});
// };

// (async () => {
// 	try {
// 		const result = await getData();
// 		console.log(result);
// 	} catch (err) {
// 		console.log(err);
// 	} finally {
// 		// finally
// 	}
// })();