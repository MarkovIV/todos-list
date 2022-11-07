import { useContext, useEffect, useState } from 'react'
import { TodosContext } from '../../context/TodosContext'
import { NavbarProps } from './Navbar.props'
import { ReactComponent as Delete } from './icons/delete.svg'
import { ReactComponent as Finish } from './icons/finish.svg'
import { ReactComponent as Github } from './icons/github.svg'
import { ReactComponent as Start } from './icons/start.svg'
import styles from './Navbar.module.css'
import cn from 'classnames'

export const Navbar = ({ className, ...props }: NavbarProps): JSX.Element => {
	const {todosList, todosListFilter, todosListFilterSet, todosListEdit} = useContext(TodosContext)
	const [navbarView, setNavbarView] = useState<JSX.Element>(<></>)

	useEffect(() => {
		constructNavbarView(todosListFilter)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [todosListFilter])

	const constructNavbarView = (currentTodosListFilter: string) => {
		const todosElement = document.querySelector('#todos') as HTMLElement
		
		const updatedNavbarView = (): JSX.Element => {
			let classFilter = ''

			switch (currentTodosListFilter) {
			case 'all':
				classFilter = styles.onAll
				break;	
			case 'active':
				classFilter = styles.onActive
				break;	
			case 'completed':
				classFilter = styles.onCompleted
				break;	
			default:
				classFilter = styles.onAll
			}

			return (
				<>
					<div {...props} className={cn(className, styles.navbar, classFilter)} data-testid="navbar">
						<div className={styles.start}><button onClick={gotoStart}><Start /></button></div>
						<div className={styles.finish}><button><a href='#statline'><Finish /></a></button></div>
						<div className={styles.clear}><button onClick={clearCompleted} data-testid="delete button"><Delete /></button></div>	
						<div></div>
						<div className={styles.all}><button onClick={filterSetAll} data-testid="filter set all button">All</button></div>
						<div className={styles.active}><button onClick={filterSetActive} data-testid="filter set active button">Active</button></div>
						<div className={styles.completed}><button onClick={filterSetCompleted} data-testid="filter set completed button">Completed</button></div>
						<div></div>	
						<div></div>			
						<div></div>
						<div className={styles.github}><button><a href="https://github.com/MarkovIV" target="_blank" rel='noreferrer'><Github /></a></button></div>			
					</div>	
				</>
			)			
		}

		const gotoStart = () => {	
			if (todosElement) {
				const coords = todosElement.getBoundingClientRect();

				todosElement.style.cssText = `position: fixed; top: 0; left: ${coords.left + "px"};`

				setInterval(() => {todosElement.style.cssText = ""}, 1);		
			}
		}

		setNavbarView(updatedNavbarView())
	}

	const filterSetAll = () => {
		todosListFilterSet('all')
	}

	const filterSetActive = () => {
		todosListFilterSet('active')
	}

	const filterSetCompleted = () => {
		todosListFilterSet('completed')
	}

	const clearCompleted = () => {
		todosListEdit(todosList.map(function (todo) {
										if (todo.completed) {
											todo.deleted = true
										}
										
										return todo
										}
									))
	}

	return (
		<>
			{navbarView}
		</>
	)
}