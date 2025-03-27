import React, { useEffect } from 'react'
//@ts-ignore
import { useDevice } from 'vtex.device-detector'
// @ts-ignore
import menuIcon from './menu-mobile-icon.svg'
import { Button } from 'vtex.styleguide'
import "./AsideMenu.css";

const Menu = () => {
  const axios = require('axios')
  useEffect(() => {
    axios
      .get('/api/catalog_system/pub/category/tree/10')
      .then(function (response: any) {
        console.log(response)
        const menuRender = response.data.map((item: any) => ({
          name: item.name,
          url: item.url,
          hasChildren: item.hasChildren,
          children: item.children,
        }))
        setCategory(menuRender)
      })
  }, [])

  const [category, setCategory] = React.useState<
    {
      name: string
      url: string
      hasChildren: boolean
      children: {
        name: string
        url: string
        hasChildren: boolean
        children: { name: string; url: string; hasChildren: boolean }[]
      }[]
    }[]
  >([])

  const MenuButton = ({back}:any) => {
    return (
      <Button variation="inverted-tertiary" 
        onClick={()=>handleSubmenu(event, back)}>
        <svg
          fill="none"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className={`c-muted-3 ${back ? 'vtex-store-drawer-0-x-invert' : ''} `}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            pointerEvents: "none",
          }}
        >
          <use href="#nav-caret--right"></use>
        </svg>
      </Button>
    )
  }

  const handleMenuItems = (back:boolean) =>{
    const items:any = document.getElementsByClassName('vtex-store-drawer-0-x-menuItem')
    if(back){
      Array.prototype.forEach.call(items,(item:any)=>{
        return item.classList.remove('vtex-store-drawer-0-x-menuClose')
      })

    }else{
      Array.prototype.forEach.call(items,(item:any)=>{
        return item.classList.add('vtex-store-drawer-0-x-menuClose')
      })
    }

  }
  const closeMenuItems = () =>{
    const items:any = document.getElementsByClassName('vtex-store-drawer-0-x-subMenu')
      Array.prototype.forEach.call(items,(item:any)=>{
        return item.classList.add('dn')
      })

  }

  const showAllLinks = () =>{
    const items:any = document.getElementsByClassName('vtex-store-drawer-0-x-menuLink')
    Array.prototype.forEach.call(items,(item:any)=>{
      return item.classList.remove('dn')
    })
  }
  const showAllButtons = () =>{
    const items:any = document.querySelectorAll('.vtex-store-drawer-0-x-menuItem .vtex-button')
    Array.prototype.forEach.call(items,(item:any)=>{
      return item.classList.remove('vtex-store-drawer-0-x-menuClose')
    })
  }

  const handleSubmenu = (event: any, back:boolean) => {
    console.log(back, 'back')
    handleMenuItems(back);
    const button = event.target.parentElement
    const href = event.target.parentElement.previousElementSibling
    const sibiling = event.target.parentElement.nextSibling
    const parent = event.target.parentElement.parentElement
    if(back){
      closeMenuItems();
      showAllLinks();
      showAllButtons();
      console.log(event, 'evensssst')
    }else{
      href.classList.add('dn') 
      href.classList.remove('db')
      sibiling.classList.remove('dn')
      parent.classList.remove('vtex-store-drawer-0-x-menuClose')
      button.classList.add('vtex-store-drawer-0-x-menuClose')
    }


  }

  const mountSubMenu = (menuItem: any) => {
    if (!menuItem.children) return
    const subMenuList = menuItem.children.map((item: any, index:number) => {
      return (
        <li className="bb b--light-gray bt flex items-center justify-between"
            key={index}>
          <a
            className="db pv5 mh5 w-100 no-underline c-on-base t-body"
            href={item.url}
            title={item.name}
          >
            {item.name}
          </a>
          {item.children.length ?  <MenuButton  /> : '' }
          {mountSubMenu(item)}
        </li>
      )
    })

    return (
      <ul className="list pa0 dn vtex-store-drawer-0-x-subMenu">
        <li className="vtex-store-drawer-0-x-submenuItem bb b--light-gray bt flex items-center justify-between">
        <MenuButton back={true} />
          <a  className="db pv5 mh5 w-100 no-underline c-on-base t-body vtex-store-drawer-0-x-submenuLink " 
              href={menuItem.url} 
              title={menuItem.name}>
                {menuItem.name}
          </a>
        </li>
        {subMenuList}
      </ul>
    )
  }

  return (
    <>
      <nav className="menu-container">
        <ul className="list pa0 vtex-store-drawer-0-x-menuList">
          {category.map((item, index) => {
            return (
              <li
                key={index}
                className=" bb b--light-gray bt flex items-center justify-between 
                            vtex-store-drawer-0-x-menuItem"
              >
                <a
                  className={`${item.name} db pv5 mh5 w-100 no-underline c-on-base t-body
                  vtex-store-drawer-0-x-menuLink`}
                  href={item.url}
                >
                  {item.name}{' '}
                </a>
                <MenuButton />
                {item.children ? mountSubMenu(item) : ''}
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

export default Menu
