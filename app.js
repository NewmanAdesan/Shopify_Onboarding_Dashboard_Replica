

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
  dismissBtn.addEventListener('click', (e)=>{
    trialExtend.classList.add("hide");
  })
  




  /***************************************************
   * THE SHOW SETUP STEPS LOGIC
   ***************************************************/
  const showSetupStepsBtn = document.querySelector("#show-setup-steps");
  const setupGuide = document.querySelector("#setup-guide-elem")
  const setupSteps = document.querySelector("#setupSteps")
  showSetupStepsBtn.addEventListener('click', (e)=>{
      const isExpanded = setupGuide.attributes['aria-expanded'].value === "true";
      if (!isExpanded){
        setupGuide.ariaExpanded = "true";
        showSetupStepsBtn.ariaExpanded = "true";
        setupSteps.ariaExpanded = "true";
        setupGuide.classList.remove("hide-height");
        setupGuide.classList.add("drop-height");
      }
      else {
        setupGuide.ariaExpanded = "false";
        showSetupStepsBtn.ariaExpanded = "false";
        setupSteps.ariaExpanded = "false";
        setupGuide.classList.remove("drop-height");
        setupGuide.classList.add("hide-height");
        
      }
  })
  




  /***************************************************
   * THE PAGE CHILDREN KEYBOARD NAVIGATION LOGIC
   ***************************************************/
  const shopifyLogo = document.querySelector("#shopifyLogo");
  showSetupStepsBtn.addEventListener('keydown', (e)=>{
    const isExpanded = setupGuide.attributes['aria-expanded'].value === "true";
    if (!isExpanded && e.key === "Tab"){
      shopifyLogo.focus();
    }
  })
  




  /***************************************************
   * THE STEP SELECTION LOGIC
   ***************************************************/
  const allSetupSteps = document.querySelectorAll(".sg-step");
  allSetupSteps.forEach((setupStep)=>{
    setupStep.addEventListener('click', (e)=>{
      allSetupSteps.forEach((_setupStep)=>{
        _setupStep.ariaSelected = "false";
      })
      setupStep.ariaSelected = "true";

    })
  })
  




  /***************************************************
   * THE STEP CHECK LOGIC
   ***************************************************/
  const allSgCheckBtn = document.querySelectorAll(".sg-step-check");
  const allInitialIcon = document.querySelectorAll(".initial-check");
  const allSpinnerIcon = document.querySelectorAll(".spinner-check");
  const allMarkIcon = document.querySelectorAll(".mark-check");

  const progressLabel = document.querySelector("#progress-label");
  const progressSpan = document.querySelector("#progress-span");
  const progressInner = document.querySelector("#progress-inner");

  allSgCheckBtn.forEach((sgCheckBtn, sgCheckBtnIndex)=>{
    sgCheckBtn.addEventListener('click', (e)=>{
      const initialIcon = allInitialIcon.item(sgCheckBtnIndex);
      const spinnerIcon = allSpinnerIcon.item(sgCheckBtnIndex);
      const markIcon = allMarkIcon.item(sgCheckBtnIndex);
      const hiddenInitialIcon = initialIcon.classList.contains("hidden");
      if (!hiddenInitialIcon) {
        // hide initial icon
        initialIcon.classList.add("hidden");

        // show spinner icon
        spinnerIcon.classList.remove("hidden")

        // setTimeout 2 seconds hide spinner icon & show mark icon
        setTimeout(()=>{
          spinnerIcon.classList.add("hidden");
          markIcon.classList.remove("hidden");
          progressLabel.ariaLabel = `Setup Guide Progress: ${Number(progressLabel.attributes['data-current'].value)+1} completed out of 5`;
          progressSpan.textContent = `${Number(progressLabel.attributes['data-current'].value)+1}/5 completed`;
          progressInner.attributes['width'].value = Number(progressInner.attributes['width'].value) + 14.4;
          progressLabel.attributes['data-current'].value = Number(progressLabel.attributes['data-current'].value)+1
        }, 1000)
      }

      else {
        markIcon.classList.add("hidden");
        initialIcon.classList.remove("hidden");
        progressLabel.ariaLabel = `Setup Guide Progress: ${Number(progressLabel.attributes['data-current'].value)-1} completed out of 5`;
        progressSpan.textContent = `${Number(progressLabel.attributes['data-current'].value)-1}/5 completed`;
        progressInner.attributes['width'].value = Number(progressInner.attributes['width'].value) - 14.4;
        progressLabel.attributes['data-current'].value = Number(progressLabel.attributes['data-current'].value)-1
      }
    });
  })

  // place a click event on all the check button
  // when the check button is click, check if its initial icon is displayed (no hidden)
  // if initial icon is displayed, make it hidden & make the spinner display & after 1 seconds make the mark display setting the spinner to hidden, update the progress element
  // if the initial icon is not display, make the mark icon disappear & make the initial icon appear

}

app();

 


