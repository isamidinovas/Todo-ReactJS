import React from "react";
import './list.scss'



const List = ({ items, isRemovable }) => {
    console.log(items, isRemovable);
    return (
        <ul className="list">
            {
                items.map(item => <li className={item.active ? 'active' : ""}>
                    <i>
                        {item.icon ? item.icon : <i className={`badge badge--${item.color}`}/>}
                    </i>
                    
                    <span>{item.name}</span>
                    
                    
                </li>)
            }
            
        </ul>
    );
};

export default List;