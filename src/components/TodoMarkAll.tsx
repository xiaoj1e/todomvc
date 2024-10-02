type ToggleProps = {
    numCompletedTodos: number;
    numTodos: number;
    onMarkAllActive: () => void;
    onMarkAllCompleted: () => void;
};

export default function TodoMarkAll({
    numCompletedTodos,
    numTodos,
    onMarkAllActive,
    onMarkAllCompleted,
}: ToggleProps) {
    const allCompleted = numCompletedTodos === numTodos;

    const labelText = `Mark all as ${allCompleted ? "active" : "complete"}`;

    const onClick = () => {
        if (allCompleted) {
            onMarkAllActive();
        } else {
            onMarkAllCompleted();
        }
    };

    if (numTodos == 0) {
        return null;
    }

    return (
        <>
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                checked={allCompleted}
                onChange={onClick}
            />
            <label htmlFor="toggle-all" title={labelText}>
                {labelText}
            </label>
        </>
    );
}
