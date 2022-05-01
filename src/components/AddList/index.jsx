import React, {useEffect, useState} from "react";
import axios from "axios";

import List from '../List';
import '../../components/AddList/AddListBotton.scss'
import Badge from '../Badge';
import closeSvg from '../../assets/img/close.svg'

const AddListButton =({colors, onAdd}) => {
  const [visiblePopup, setVisiblePopup]=useState(true);
  const [seletedColor, selectColor]=useState(3);
  const [isLoading, setIsLoading] =useState(false)
  const [inputValue, setInputValue]=useState('');


  useEffect( ()=>{
    if(Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  },[])

  const onClose =() => {
    setVisiblePopup(false);
    setInputValue('')
    selectColor(colors[0].id);
  }
  const addList = () => {
    if(!inputValue) {
      alert("Введите название списка")
      return;
    }
    setIsLoading(true);
    
    
    axios.post('http://localhost:3001/lists',{ name: inputValue, colorId :seletedColor })
    .then(({data}) => {
      const color =colors.filter(c => c.id ===seletedColor)[0].name;
     const listObj = {...data, color:{name:color}};
         onAdd(listObj );
         onClose();
    }).finally( () =>{
      setIsLoading(false)
    });
  };
    return(
      <div className="add-list">
        <List
        onClick={()=>setVisiblePopup(true)}
        items={[
        {
          className:"list__add-button",
          icon:<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1V15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 8H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ,
        name:'Добавить список' 
          }
      ]}
      />
      { visiblePopup && <
        div className="add-list__popup">
        <img onClick={onClose} 
        src={closeSvg} alt="close btn" className="add-list__popup-close-btn"/>
        <input value={inputValue} 
         onChange={e => setInputValue(e.target.value) }
        className="field" type="text" 
        placeholder="Называние списка" />
        <div className="add-list__popup-colors">

              {
                colors.map(color =>( 
                <Badge onClick={()=> selectColor(color.id)} 
                key={color.id}
                 color={color.name}
                 className={seletedColor=== color.id && 'active'}/>
                ))}

        </div>
         <button onClick={addList} className="button">
           {isLoading? 'Добавление...' :'Добавить' }</button>
      </div>
      }
      </div>
    );
  };


export default AddListButton;