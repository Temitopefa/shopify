function app() {
    // get the menuTrigger
    // get the menu

    const menuTrigger = document.querySelector("#desktop_logo");
    const mobileLogo = document.querySelector("#mobile_logo");
    const menu = document.querySelector("#popup");
    const allMenuItems = menu.querySelectorAll('[role="menuitem"]');

    const trialContent = document.getElementById("trialContent");
    const trialButton = document.querySelector(".trial_btn");
    const trialSvg = document.getElementById("removeTrialSvg");

    const icon1 = document.getElementById("icon1");
    const icon2 = document.getElementById("icon2");

    const dropdownHeader = document.getElementById("dropdownHeader");
    const dropdownArrow = dropdownHeader.querySelector(".dropdown-arrow");
    const dropdownContent = dropdownHeader.querySelector(".dropdown-content");

    // close the menu if you click outside of the popup

    const closeMenu = () => {
        menuTrigger.setAttribute("aria-expanded", "false");
        menuTrigger.focus();
    };

    const handleMenuEscapeKeypress = (event) => {
        // if user press escape key
        if (event.key === "Escape") {
            toggleMenu();
        }
    };

    const handleMenuArrowKeypress = (event, menuitemIndex) => {
        // create a variables : isLastMenuItem, isFirstMenuItem
        const isLastMenuItem = menuitemIndex === allMenuItems.length - 1;
        const isFirstMenuItem = menuitemIndex === 0;

        const nextMenuItem = allMenuItems.item(menuitemIndex + 1);
        const previousMenuItem = allMenuItems.item(menuitemIndex - 1);

        // if the user press arrow right or arrow down
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            // if the user is on last iten focus on first menu item
            if (isLastMenuItem) {
                allMenuItems.item(0).focus();

                return;
            }
            // then focus on next menu item
            nextMenuItem.focus();
        }

        // if the user press arrow up or arrow left
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            //  if the user is on first menu item focus on last menu item
            if (isFirstMenuItem) {
                allMenuItems.item(allMenuItems.length - 1).focus();

                return;
            }
            // then focus on the previous menu item
            previousMenuItem.focus();
        }
    };

    const openMenu = () => {
        menuTrigger.ariaExpanded = "true";
        allMenuItems.item(0).focus();

        menu.addEventListener("keyup", handleMenuEscapeKeypress);

        // for each menu item, register an event listener for the key up event
        allMenuItems.forEach((menuitem, menuitemIndex) => {
            menuitem.addEventListener("keyup", (event) => {
                handleMenuArrowKeypress(event, menuitemIndex);
            });
        });
    };

    const toggleMenu = () => {
        const isExpanded = menuTrigger.attributes["aria-expanded"].value === "true";
        menu.classList.toggle("menu-active");

        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    };

    // add a click event listener to the menu trigger
    menuTrigger.addEventListener("click", toggleMenu);
    mobileLogo.addEventListener("click", toggleMenu);

    // popup notification handler

    const desktopInfoPopup = document.getElementById("desktop_info_popup");
    const mobileInfoPopup = document.getElementById("mobile_info_popup");
    const popupBtns = document.querySelectorAll(".popup_btn");

    const togglePopUpInfo = () => {
        if (desktopInfoPopup.style.display === "none" || desktopInfoPopup.style.display === "") {
            desktopInfoPopup.style.display = "block";
            mobileInfoPopup.style.display = "block";
        } else {
            desktopInfoPopup.style.display = "none";
            mobileInfoPopup.style.display = "none";
        }
    };

    popupBtns.forEach((btn) => {
        btn.addEventListener("click", togglePopUpInfo);
    });

    desktopInfoPopup.addEventListener("click", togglePopUpInfo);
    mobileInfoPopup.addEventListener("click", togglePopUpInfo);


    // Add an event listener to the SVG to close the trial content
    trialSvg.addEventListener("click", () => {
        trialContent.style.opacity = "0";
        trialButton.style.opacity = "0";

        // Optionally, you can set a timeout to delay setting visibility to "hidden"
        setTimeout(() => {
            trialContent.style.visibility = "hidden";
            trialButton.style.visibility = "hidden";
        }, 300); // Adjust the timeout value as needed
    });



    // Toggle dropdown content visibility
    dropdownArrow.addEventListener("click", () => {
        dropdownContent.classList.toggle("active");

        // Toggle between icon1 and icon2
        if (icon1.style.display === "none" || icon1.style.display === "") {
            icon1.style.display = "inline-block";
            icon2.style.display = "none";
        } else {
            icon1.style.display = "none";
            icon2.style.display = "inline-block";
        }
    });


    // Close dropdown content when clicking outside of it
    document.addEventListener("click", (event) => {
        if (!dropdownHeader.contains(event.target)) {
            dropdownContent.classList.remove("active");
        }
    });

    // Prevent closing dropdown when clicking on a content item
    dropdownContent.addEventListener("click", (event) => {
        event.stopPropagation(); // Stop event propagation to the document click handler
    });

    const contentItems = document.querySelectorAll(".wrapper");

    contentItems.forEach((contentItem, index) => {
        contentItem.addEventListener("click", () => {
            contentItems.forEach((item, i) => {
                if (index !== i) {
                    // Hide overflow for other items
                    item.style.overflowY = "hidden";
                    item.style.maxHeight = "34px";
                    item.style.backgroundColor = "#FFF";
                }
            });

            contentItem.classList.toggle("active");

            // Check for overflow and update background color
            const computedStyle = window.getComputedStyle(contentItem);
            if (
                computedStyle.maxHeight === "0px" ||
                contentItem.classList.contains("active")
            ) {
                contentItem.style.backgroundColor = "#F3F3F3";
                contentItem.style.maxHeight = contentItem.scrollHeight + "300px"; // Set max-height to the scroll height
            } else {
                contentItem.style.backgroundColor = "#FFF"; // Use the initial color
                contentItem.style.overflowY = "hidden"; // Set max-height back to 0
            }
        });
    });

    const HIDDEN_CLASS = "hidden";
    const MARK_AS_DONE_CLASS = "checkbox_done";

    // Assuming you have a progress bar element with id "progress_bar"
    const progressBar = document.getElementById("progress_bar");
    const progressCount = document.getElementById("progress_count");
    let progressState = 0;
    const totalSteps = 5;

    document.querySelectorAll(".check_box").forEach((checkboxButton) => {
        const checkboxButtonStatus = checkboxButton.nextElementSibling;

        const notCompletedIcon = checkboxButton.querySelector(
            ".not_completed_icon"
        );
        const CompletedIcon = checkboxButton.querySelector(".completed_icon");
        const loadingSpinner = checkboxButton.querySelector(
            ".loading_spinner_icon"
        );

        const updateProgress = () => {
            const progressFraction = progressState / totalSteps;
            progressBar.style.width = `${progressFraction * 100}%`;
            progressCount.textContent = `${progressState}/${totalSteps}`;
        };

        const handleMarkAsDone = () => {
            notCompletedIcon.classList.add(HIDDEN_CLASS);
            loadingSpinner.classList.remove(HIDDEN_CLASS);
            checkboxButtonStatus.ariaLabel = "Loading. Please wait...";

            setTimeout(() => {
                loadingSpinner.classList.add(HIDDEN_CLASS);
                CompletedIcon.classList.remove(HIDDEN_CLASS);

                checkboxButton.setAttribute(
                    "aria-label",
                    checkboxButton
                        .getAttribute("aria-label")
                        .replace("as done", "as not done")
                );

                checkboxButton.classList.add(MARK_AS_DONE_CLASS);

                checkboxButtonStatus.ariaLabel = "Successfully marked as done";

                progressState += 1;
                updateProgress();
            }, 3000);
        };

        const handleMarkAsNotDone = () => {
            CompletedIcon.classList.add(HIDDEN_CLASS);
            loadingSpinner.classList.remove(HIDDEN_CLASS);
            checkboxButtonStatus.ariaLabel = "Loading. Please wait...";

            setTimeout(() => {
                loadingSpinner.classList.add(HIDDEN_CLASS);
                notCompletedIcon.classList.remove(HIDDEN_CLASS);

                checkboxButton.setAttribute(
                    "aria-label",
                    checkboxButton
                        .getAttribute("aria-label")
                        .replace("as not done", "as done")
                );

                checkboxButtonStatus.ariaLabel = "Successfully marked as not done";

                if (progressState > 0) {
                    progressState -= 1;
                }

                updateProgress();
            }, 3000);
        };

        const handleMarkDoneOrNotDone = () => {
            const markAsDone = checkboxButton.classList.contains(MARK_AS_DONE_CLASS);

            if (markAsDone) {
                handleMarkAsNotDone();
                checkboxButton.classList.remove(MARK_AS_DONE_CLASS);
            } else {
                handleMarkAsDone();
                checkboxButton.classList.add(MARK_AS_DONE_CLASS);
            }
        };

        checkboxButton.addEventListener("click", handleMarkDoneOrNotDone);
        updateProgress();
    });


}

app();