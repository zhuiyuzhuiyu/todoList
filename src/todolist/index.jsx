import { useTodo } from "./useTodo";
import { TodoFilter } from "./list";

export function Main() {
    const {
        toggleStatus,
        inputValue,
        list,
        setInputValue,
        handleAllClick,
        handleToggle,
        handleAddTodo,
        handleDel
    } = useTodo();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddTodo();
        }
    };

    return (
        <div>
            <h1>todos</h1>
            <div className="inputLabel">
                <div 
                    className="toggle-all" 
                    style={{ color: toggleStatus ? '#737373' : '#e6e6e6' }} 
                    onClick={handleAllClick}
                >
                    {'❯'}
                </div>
                <input 
                    type="text" 
                    className="new-todo" 
                    placeholder="What needs to be done?" 
                    onKeyDown={handleKeyDown} 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} 
                />
            </div>
            <TodoFilter 
                list={list} 
                onToggle={handleToggle} 
                onDelete={handleDel} 
            />
        </div>
    );
}