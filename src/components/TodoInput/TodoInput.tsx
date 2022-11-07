import { TodoInputProps } from './TodoInput.props'
import { Input } from '../Input/Input'
import { useContext, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { ReactComponent as Enter } from './icons/enter.svg'
import styles from './TodoInput.module.css'
import cn from 'classnames'

export const TodoInput = ({ className, ...props }: TodoInputProps): JSX.Element => {
	const [value, setValue] = useState<string>('')
	const {todosList, todosListUpdate} = useContext(TodosContext)

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault()

		if (value.trim().length === 0) {
			return
		}

		createTodo(value)	
		
		setValue('')
 	 }

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const createTodo = (todoText: string) => {
		const newTodo = {
			id: todosList.length,
			title: todoText,
			completed: false,
			deleted: false
		}

		todosList.unshift(newTodo)

		todosListUpdate()
	}

	return (		
		<form onSubmit={submitHandler} className={cn(className, styles.todoInput)} {...props}>
			<Input
			className={styles.input}
			type="text"
			placeholder="Enter todo..."
			value={value}
			onChange={changeHandler}
			/>
			<button type="submit" className={styles.button}><Enter/></button>
		</form>
	)		
}