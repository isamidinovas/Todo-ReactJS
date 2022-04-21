import React from "react";
import './list.scss'
import removeSvg from '../../assets/img/remove.svg'
import Badge from "../Badge";

const List = ({ items, isRemovable, onClick,onRemove }) => {

    const removeList =(item) =>{
        if(window.confirm('Вы действителбно хотите удалить список?')){
            onRemove(item);
        }    }
    return (
        <ul onClick={onClick} className="list">
            {
                items.map(item=> <li className={item.active ? 'active' : ""}>
                    <i>{
                    <Badge color={item.color}/>}
                    </i>
                    
                    <span>{item.name}</span>
                    
                 {isRemovable && 
                 <img className="list__remove-icon"
                  src={removeSvg} alt="remove icon"
                  onClick= {() =>removeList(item)}
                  />}
                </li>)
            }
            
        </ul>
    );
};

export default List;