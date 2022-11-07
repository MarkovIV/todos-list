import { ITodo } from '../interfaces/todo.interface'

export const todos: ITodo[] = [
	{
		id: 0,
		title: 'Пройти курс по JS',
		completed: false,
		deleted: false
	},
	{
		id: 1,
		title: 'Пройти курс по React',
		completed: false,
		deleted: false
	},
	{	
		id: 2,
		title: 'Купить хлеб',
		completed: true,
		deleted: false
	},
	{
		id: 3,
		title: 'Купить молоко',
		completed: false,
		deleted: false
	},
	{
		id: 4,
		title: 'Купить яйца',
		completed: true,
		deleted: true
	}
]