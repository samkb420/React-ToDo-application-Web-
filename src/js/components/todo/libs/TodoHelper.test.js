import {addTodo} from "./TodoHelper";

test("addTodo", () => {
	const startTodo = [
		{id:1, name:"name1", isComplete: false},
		{id:2, name:"name2", isComplete: false}
	]

	const newTodo = {id:3, name:"name3", isComplete: false}

	const expected = [
		{id:1, name:"name1", isComplete: false},
		{id:2, name:"name2", isComplete: false},
		{id:3, name:"name3", isComplete: false}
	]

	const result = addTodo(startTodo, newTodo);

	expect(result).not.toBe(startTodo)
	expect(result).toEqual(expected)
})