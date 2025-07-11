import { useState, useEffect } from "react";

export function useTodo() {
    const [toggleStatus, setToggleStatus] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {
        const allCompleted = list.every(item => item.completed);
        setToggleStatus(allCompleted);
    }, [list]);

    const handleAllClick = () => {
        const newStatus = !toggleStatus;
        setToggleStatus(newStatus);
        setList(prevList => 
            prevList.map(item => ({ ...item, completed: newStatus }))
        );
    };

    const handleToggle = (id) => {
        setList(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const handleAddTodo = () => {
        if (inputValue.trim()) {

            setList(prev => [
                ...prev,
                {
                    id: Date.now(),
                    title: inputValue,
                    completed: false
                }
            ]);
            setInputValue("");
        }
    };

    const handleDel = (id) => {
        setList(prevList => prevList.filter(item => item.id !== id));
    };

    return {
        toggleStatus,
        inputValue,
        list,
        setInputValue,
        handleAllClick,
        handleToggle,
        handleAddTodo,
        handleDel
    };
}