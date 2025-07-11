
import { useState, useEffect } from "react";

export function TodoFilter({ list, onToggle, onDelete }) {
    const [currentHash, setCurrentHash] = useState(window.location.hash || "#/All");

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash || "#/All");
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const filteredList = list.filter(item => {
        if (currentHash === "#/Active") return !item.completed;
        if (currentHash === "#/Completed") return item.completed;
        return true;
    });

    const handleLinkClick = (hash) => {
        window.location.hash = hash;
    };

    return (
        <>
            <ul className="todoList">
                {filteredList.map((item) => (
                    <TodoItem 
                        key={item.id}
                        item={item}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
            <TodoFooter 
                filteredList={filteredList}
                currentHash={currentHash}
                onLinkClick={handleLinkClick}
            />
        </>
    );
}

function TodoItem({ item, onToggle, onDelete }) {
    return (
        <li className="list">
            <input
                type="checkbox"
                className="toggle"
                checked={item.completed}
                onChange={() => onToggle(item.id)}
            />
            <label style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                {item.title}
            </label>
            <button className="destroy" onClick={() => onDelete(item.id)}></button>
        </li>
    );
}

function TodoFooter({ filteredList, currentHash, onLinkClick }) {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{filteredList.filter(item => !item.completed).length}</strong>
                <span> items left</span>
            </span>
            <ul className="filters">
                {["All", "Active", "Completed"].map(filter => (
                    <li key={filter}>
                        <a
                            href={`#/${filter}`}
                            className={currentHash === `#/${filter}` ? "selected" : ""}
                            onClick={() => onLinkClick(`#/${filter}`)}
                        >
                            {filter}
                        </a>
                    </li>
                ))}
            </ul>
        </footer>
    );
}