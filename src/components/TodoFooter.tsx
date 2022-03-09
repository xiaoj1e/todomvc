import Link from "next/link";
import clsx from "clsx";
import { Filter } from "src/models/filter";

type Props = {
    filter: Filter;
    numActiveTodos: number;
    numTodos: number;
    onClearCompleted: () => void;
};

export default function TodoFooter({
    filter,
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
                            className={clsx({
                                selected: filter == "all",
                            })}
                        >
                            All
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#/active">
                        <a className={clsx({ selected: filter === "active" })}>
                            Active
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/#/completed">
                        <a
                            className={clsx({
                                selected: filter === "completed",
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
