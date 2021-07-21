import {useEffect, useState} from 'react';
import {API} from '../utils/Api.js'
import './Navbar.css'

export const Navbar = () => {
const [category, setCategory] = useState([])
const [isOpen, setIsOpen] = useState(false)

const mouseIn = () => {
  setIsOpen(true)
}

const mouseOut = () => {
  setIsOpen(false)
}

useEffect(() => {
  const fetchData = async () => {
    const data = await API.fetchMainCategory()
    setCategory(data)
  }
  fetchData()
}, [])

  return (
    <div className="navbar" onMouseLeave={mouseOut}>
      <div className="nav-wrap">
        <div className="smallbar">
          <div className="smallmenu">
            <span>홈</span>
            <span>탐색</span>
            <span>커리어 성장</span>
          </div>
          <div className="user">
            <i className="fas fa-search"></i>
            <i className="far fa-bell"></i>
          </div>
        </div>
        <div className="bignav">
          <div>WANTED</div>
          <div className="menu">
            {category.map((item) => {
              if (item.id === 1) {
                return <div key={item.id} className="category" onMouseOver={mouseIn}>{item.categoryName}</div>
              }
              return <div key={item.id} className="category" onMouseOver={mouseOut}>{item.categoryName}</div>
            })}
          </div>
          <div className="user">
            <i className="fas fa-search"></i>
            <i className="far fa-bell"></i>
            <i className="fas fa-user-tie"></i>
            <div className="service">기업 서비스</div>
          </div>
          </div>
      </div>
      <div className={"container subCategory" + (isOpen ? "show" : "")}>
            {category.length ? category[0].subCategory.map(sub => {
                if(sub.id < 6) {
                  return <div key={sub.id} className="subMenu grid">
                      <h4>
                        {sub.name}
                        <i className="fas fa-chevron-right"></i>
                      </h4>
                    {sub.subCategory.map((ssub,idx) => {
                      return <div key={idx} className="subitem">{ssub}</div>
                      })}
                    <div className="more">
                      더보기
                      <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                }
            }) : ''}
            <div className="subMenu grid">
              {category.length ? category[0].subCategory.map((sub) => {
                if(sub.id >= 6) {
                  return <h4 key={sub.id}>
                      {sub.name}
                      <i className="fas fa-chevron-right"></i>
                    </h4>
                }
              }) : ''}
          </div>
        </div>
    </div>
  );
};

export default Navbar