document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggle-toc");
    var closeButton = document.getElementById("close-toc");
    var sidebarToc = document.getElementById("sidebar-toc");

    if (toggleButton && closeButton && sidebarToc) {
        toggleButton.addEventListener("click", function () {
            sidebarToc.classList.toggle("active");
        });

        closeButton.addEventListener("click", function () {
            sidebarToc.classList.remove("active");
        });
    }
});
