

function app(){
  const menuTrigger = document.querySelector("#profile-menu");
  const menu = document.querySelector("#profile-menu-content")
  const allMenuItems = menu.querySelectorAll("[role='menuitem']")
  

  function handleKeyPressOnMenu(event){
    // if the keypress is the Escape key
    if (event.key == 'Escape') toggleMenu();
  }

  function handleKeyPressOnMenuItem(event, menuItemIndex){
    
    // the event handler recieves two argument: the menuitem, the menuitem index
    // in the event handler, get the next menu item
    const nextMenuItem = allMenuItems.item(menuItemIndex+1);

    // in the event handler, get the prev menu item
    const prevMenuItem = allMenuItems.item(menuItemIndex-1)

    // in the event handler, get if menu item is the last item
    const isLastItem = menuItemIndex === allMenuItems.length - 1;

    // in the event handler, get if menu item is the first item
    const isFirstItem = menuItemIndex === 0;

    // in the event handler, if key is the down OR right key, if menu item is the last item: set focus at the first menu item, else set focus at the next menu item
    if (event.key==="ArrowDown" || event.key==="ArrowRight"){
      event.preventDefault();
      if (isLastItem) allMenuItems.item(0).focus();
      else nextMenuItem.focus();
    }
    // in the event handler, if key is the up OR left key, if menu item is the first item: set focus at the last menu item, else set focus at the prev menu item
    if (event.key==="ArrowUp" || event.key==="ArrowLeft"){
      event.preventDefault();
      if (isFirstItem) allMenuItems.item(allMenuItems.length - 1).focus();
      else prevMenuItem.focus();
    }
  }

  function openMenu(){
    menuTrigger.ariaExpanded = "true";
    allMenuItems.item(0).focus(); 
    menu.addEventListener('keydown', handleKeyPressOnMenu)=
    
    allMenuItems.forEach(function(menuItem, menuItemIndex){  
      menuItem.addEventListener('keydown', function(e){
        handleKeyPressOnMenuItem(e, menuItemIndex);
      })   
    })

    allMenuItems.item(allMenuItems.length-1).addEventListener('keydown', function(e){
      if (e.key==="Tab"){
        e.preventDefault();
        allMenuItems.item(0).focus();
      }
    })
  }

  function closeMenu(){
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  function toggleMenu(){
      menu.classList.toggle('menu-active')

      isExpanded = menuTrigger.attributes['aria-expanded'].value === "true";
      if (!isExpanded) openMenu();
      else closeMenu();
  }
 
  menuTrigger.addEventListener('click', toggleMenu);
}

app();

 
/**
 * STEP 1
 * when i click the menu trigger,
 * the menu appears
 */


/** 
 * STEP 2
 * when i click the menu trigger again,
 * the menu disappears
 */


/**
 * when i open the menu,
 * focus goes to the first item in the menu
 */

/**
 * when i close the menu,
 * focus goes back to the menu trigger
 */

/**
 * when the menu is opened,
 * the Escape button click closes the menu
 */

/**
 * when the menu is opened,
 * the down and right arrow key press on the menu item causes an action
 * it causes focus to move to the next menu item.
 * EDGE CASE: down & right arro key press on the last menu item moves focus to the first menu items
 * 
 */

/**
 * when the menu is opened,
 * the up and left arrow key press on the menu item causes an action
 * it causes focus to move to the prev menu item.
 * EDGE CASE: up and left arrow key press on the first menu item moves focus to the last menu items
 * 
 */

