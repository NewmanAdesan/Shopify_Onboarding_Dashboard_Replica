

function app(){


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


  notifyBtn.addEventListener('click', function(e){
    console.log("notify button was clicked")
    toggleMenu(notifyBtn, notifyMenu, storeMenu);
  })


  storeBtn.addEventListener('click', function(e){
    console.log("store button was clicked")
    toggleMenu(storeBtn, storeMenu, notifyMenu);
  })




  /***************************************************
   * THE TRIAL EXTENSION BUTTON LOGIC
   ***************************************************/
  /**
   * when i click on the cancel button in the trial extension article
   * the trial extension article disappears
   */
  const dismissBtn = document.querySelector("#trial-extension-dismiss");
  const trialExtend = document.querySelector("#trial-extend-article");
  console.log(dismissBtn, trialExtend)
  dismissBtn.addEventListener('click', (e)=>{
    trialExtend.classList.add("hide");
  })
  




  /***************************************************
   * THE SHOW SETUP STEPS LOGIC
   ***************************************************/


}

app();

 


