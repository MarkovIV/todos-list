import { CheckboxProps } from './Checkbox.props'
import { useState, useEffect, useContext, KeyboardEvent } from 'react'
import { TodosContext } from '../../context/TodosContext'
import styles from './Checkbox.module.css'
import cn from 'classnames'
import { ReactComponent as CheckboxIsDone } from './checkboxIsDone.svg'
import { ReactComponent as CheckboxIsNotDone } from './checkboxIsNotDone.svg'
import { ITodo } from '../../interfaces/todo.interface'

export const Checkbox = ({ todo, className, ...props }: CheckboxProps): JSX.Element => {
	const [checkBox, setCheckBox] = useState<JSX.Element>(<></>)
	const {todosListUpdate} = useContext(TodosContext)

	useEffect(() => {
		constructCheckBox(todo.completed)

		todosListUpdate()

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todo.completed])
	
	const constructCheckBox = (currentCompleted: boolean) => {
		const updatedCheckBox = (): JSX.Element => {
			
			if (currentCompleted) {
				return (				
					<div
						className={cn(className, styles.checkbox)}
						onClick={() => onClick(todo)}
						tabIndex={0}
						onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleSpace(todo, e)}
						>
						<CheckboxIsDone data-testid="checkbox is done"/>						
					</div>				
				)
			}
			else {
				return (
					<div
						className={cn(className, styles.checkbox)}
						onClick={() => onClick(todo)}
						tabIndex={0}
						onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => handleSpace(todo, e)}
						>
						<CheckboxIsNotDone data-testid="checkbox is not done"/>
					</div>						
				)
			}			
		}

		setCheckBox(updatedCheckBox())
	}

	const onClick = (currentTodo: ITodo) => {
		currentTodo.completed = !currentTodo.completed

		constructCheckBox(currentTodo.completed)
	}

	const handleSpace = (currentTodo: ITodo, e: KeyboardEvent<HTMLDivElement>) => {
		if (e.code !== 'Space') {
			return
		}

		currentTodo.completed = !currentTodo.completed

		constructCheckBox(currentTodo.completed)
	}

	return (
		<div {...props} className={className}>
			{checkBox}		
		</div>	
	)		
}