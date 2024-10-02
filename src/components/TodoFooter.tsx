import Link from "next/link";
import clsx from "clsx";
import { Filter, ACTIVE, COMPLETED, ALL } from "src/models/filter";

type Props = {
    filter: Filter;
    setCurrentFilter: (filter: Filter) => void;
    numActiveTodos: number;
    numTodos: number;
    onClearCompleted: () => void;
};

export default function TodoFooter({
    filter,
    setCurrentFilter,
    numActiveTodos,
    numTodos,
    onClearCompleted,
}: Props) {
    if (numTodos == 0) {
        return null;
    }

    return (
        <footer className="footer">
            <span className="todo-count">
                {numActiveTodos} item{numActiveTodos !== 1 && "s"} left
            </span>
            <ul className="filters">
                <li>
                    <Link href="/#/">
                        <a  
                            onClick={() => setCurrentFilter(ALL)}
                            className={clsx({
                                selected: filter == ALL,
                            })}
                        >
                            All
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#/active">
                        <a
                            onClick={() => setCurrentFilter(ACTIVE)}
                            className={clsx({ selected: filter === ACTIVE })}>
                            Active
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#/completed">
                        <a
                            onClick={() => setCurrentFilter(COMPLETED)}
                            className={clsx({
                                selected: filter === COMPLETED,
                            })}
                        >
                            Completed
                        </a>
                    </Link>
                </li>
            </ul>
            {numActiveTodos < numTodos && (
                <button className="clear-completed" onClick={onClearCompleted}>
                    Clear completed
                </button>
            )}
        </footer>
    );
}
