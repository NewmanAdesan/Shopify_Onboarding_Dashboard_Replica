

function app(){
  // const menuTrigger = document.querySelector("#profile-menu");
  // const menu = document.querySelector("#profile-menu-content")
  // const allMenuItems = menu.querySelectorAll("[role='menuitem']")
  

  // function handleKeyPressOnMenu(event){
  //   // if the keypress is the Escape key
  //   if (event.key == 'Escape') toggleMenu();
  // }

  // function handleKeyPressOnMenuItem(event, menuItemIndex){
    
  //   // the event handler recieves two argument: the menuitem, the menuitem index
  //   // in the event handler, get the next menu item
  //   const nextMenuItem = allMenuItems.item(menuItemIndex+1);

  //   // in the event handler, get the prev menu item
  //   const prevMenuItem = allMenuItems.item(menuItemIndex-1)

  //   // in the event handler, get if menu item is the last item
  //   const isLastItem = menuItemIndex === allMenuItems.length - 1;

  //   // in the event handler, get if menu item is the first item
  //   const isFirstItem = menuItemIndex === 0;

  //   // in the event handler, if key is the down OR right key, if menu item is the last item: set focus at the first menu item, else set focus at the next menu item
  //   if (event.key==="ArrowDown" || event.key==="ArrowRight"){
  //     event.preventDefault();
  //     if (isLastItem) allMenuItems.item(0).focus();
  //     else nextMenuItem.focus();
  //   }
  //   // in the event handler, if key is the up OR left key, if menu item is the first item: set focus at the last menu item, else set focus at the prev menu item
  //   if (event.key==="ArrowUp" || event.key==="ArrowLeft"){
  //     event.preventDefault();
  //     if (isFirstItem) allMenuItems.item(allMenuItems.length - 1).focus();
  //     else prevMenuItem.focus();
  //   }
  // }

  // function openMenu(){
  //   menuTrigger.ariaExpanded = "true";
  //   allMenuItems.item(0).focus(); 
  //   menu.addEventListener('keydown', handleKeyPressOnMenu)=
    
  //   allMenuItems.forEach(function(menuItem, menuItemIndex){  
  //     menuItem.addEventListener('keydown', function(e){
  //       handleKeyPressOnMenuItem(e, menuItemIndex);
  //     })   
  //   })

  //   allMenuItems.item(allMenuItems.length-1).addEventListener('keydown', function(e){
  //     if (e.key==="Tab"){
  //       e.preventDefault();
  //       allMenuItems.item(0).focus();
  //     }
  //   })
  // }

  // function closeMenu(){
  //   menuTrigger.ariaExpanded = "false";
  //   menuTrigger.focus();
  // }

  // function toggleMenu(){
  //     menu.classList.toggle('menu-active')

  //     isExpanded = menuTrigger.attributes['aria-expanded'].value === "true";
  //     if (!isExpanded) openMenu();
  //     else closeMenu();
  // }
 
  // menuTrigger.addEventListener('click', toggleMenu);


  /***************************************************
   * THE NOTIFICATION BUTTON LOGIC
   ***************************************************/
  /**
   * when i click on the notification button,
   * the notification menu should toggle
   */
  const notifyBtn = document.querySelector("#notification-menu-button");
  const storeBtn = document.querySelector("#store-menu-button");
  const notifyMenu = document.querySelector("#notification-menu-content");
  const storeMenu = document.querySelector("#store-menu-content");


  function handleKeyPressOnMenu(event, menuController, currentMenu, otherMenu, allMenuItem){
    if (event.key === "Escape") {
      toggleMenu(menuController, currentMenu, otherMenu);
    }
    else if (event.key === "Home") {
      allMenuItem.item(0).focus();
    }
    else if (event.key === "End") {
      allMenuItem.item(allMenuItem.length - 1).focus()
    }
  }


  function handleKeyDownOnMenuItem(event, menuItemIndex, allMenuItem, menuController){
    const isLastItem = menuItemIndex === allMenuItem.length - 1;
    const isFirstItem = menuItemIndex === 0;
    const nextItem = allMenuItem.item(menuItemIndex+1)
    const prevItem = allMenuItem.item(menuItemIndex-1)
    if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "Tab") {
      event.preventDefault();
      if (isLastItem) menuController.focus();
      else nextItem.focus();
    }
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      if (isFirstItem) menuController.focus();
      else prevItem.focus();
    }
  }


  function handleKeyPressOnMenuController(event, menuController, allMenuItem){
    console.log(menuController.ariaExpanded === "true")
    if (menuController.ariaExpanded === "true"){
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "Tab") {
        event.preventDefault();
        allMenuItem.item(0).focus();
      }
      else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        allMenuItem.item(allMenuItem.length - 1).focus();
      }
    }
  }


  function openMenu(menuController, currentMenu, allMenuItem, otherMenu) {
    menuController.ariaExpanded = "true";
    menuController.ariaLabel = menuController.ariaLabel.replace("Listen to Your", "Close");
    allMenuItem.item(0).focus();
    currentMenu.addEventListener("keydown", function(event){
      handleKeyPressOnMenu(event, menuController, currentMenu, otherMenu, allMenuItem);
    })
    allMenuItem.forEach((menuItem, menuItemIndex)=>{
      menuItem.addEventListener('keydown', (event)=>{
        handleKeyDownOnMenuItem(event, menuItemIndex, allMenuItem, menuController);
      })
    })
    menuController.addEventListener('keydown', (event)=>{
      handleKeyPressOnMenuController(event, menuController, allMenuItem);
    } )

  }

  function closeMenu(menuController) {
    menuController.ariaExpanded = "false";
    menuController.ariaLabel = menuController.ariaLabel.replace("Close", "Listen to Your");
    menuController.focus();
  }


  function toggleMenu (menuController, currentMenu, otherMenu) {
    if (otherMenu) otherMenu.classList.remove("drop");
    currentMenu.classList.toggle("drop");

    const isExpanded = menuController.attributes['aria-expanded'].value === "true";
    
    const allMenuItem = currentMenu.querySelectorAll("[role='menuitem']")

    if (isExpanded) closeMenu(menuController);
    else openMenu(menuController, currentMenu, allMenuItem, otherMenu);
  }


  notifyBtn.addEventListener('click', function(e){
    console.log("notify button was clicked")
    toggleMenu(notifyBtn, notifyMenu, storeMenu);
  })


  storeBtn.addEventListener('click', function(e){
    console.log("store button was clicked")
    toggleMenu(storeBtn, storeMenu, notifyMenu);
  })


}

app();

 


