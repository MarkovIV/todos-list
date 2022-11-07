import { useContext, useEffect, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { TodosProps } from './Todos.props'
import { Statline } from '../Statline/Statline'
import { ITodo } from '../../interfaces/todo.interface'
import { Todo } from '../Todo/Todo'
import styles from './Todos.module.css'
import cn from 'classnames'

export const Todos = ({ className, ...props }: TodosProps): JSX.Element => {
	const {todosList, todosListFilter, todosListUpdateValue} = useContext(TodosContext)
	const [todosListView, setTodosListView] = useState<JSX.Element>(<></>)

	useEffect(() => {
		constructTodosListView(todosList)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todosListUpdateValue, todosListFilter, todosList])

	const constructTodosListView = (currentTodosList: ITodo[]) => {
		const updatedTodosListView = (): JSX.Element => {

			return (
				<>
					{filteredTodoList(currentTodosList).map(todo => <Todo className={styles.todo} todo={todo} key={todo.id} data-testid="todo"/>)}
				</>
			)			
		}

		setTodosListView(updatedTodosListView())
	}

	const filteredTodoList = (totalTodosList: ITodo[]): ITodo[] => {
		let filteredTodosList: ITodo[] = [];
		
		switch (todosListFilter) {
			case 'all':
				filteredTodosList = totalTodosList.filter(todo => !todo.deleted)
				break;	
			case 'active':
				filteredTodosList = totalTodosList.filter(todo => !todo.completed && !todo.deleted)
				break;	
			case 'completed':
				filteredTodosList = totalTodosList.filter(todo => todo.completed && !todo.deleted)
				break;	
			default:
				filteredTodosList = totalTodosList.filter(todo => !todo.deleted)
				break;
		}

		return filteredTodosList
	}

	return (
		<>
			<div {...props} id="todos" className={cn(className, styles.todos)} data-testid="todos list">
				<div className={styles.todosList}>{todosListView}</div>	
				<Statline className={styles.statline}/>
			</div>	
		</>
	)
}